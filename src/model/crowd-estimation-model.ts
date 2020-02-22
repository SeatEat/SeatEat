/** A period should only be 1, 2, 3 or 4 */
type period = 1 | 2 | 3 | 4;
const corsEndpoint = "https://cors-anywhere.herokuapp.com/";

class Lecture {
    constructor(
        /** When the lecture starts */
        public start: Date,

        /** When the lectures ends */
        public end: Date,

        /** If the lectures is a lab */
        public isLab: boolean
    ){}
}

class CourseSchedule {
    constructor(
        /** E.g DM1234 */
        public code: string,

        /** E.g Envariabelsanalys */
        public name: string,

        /** An array of the lectures */
        public lectures: Array<Lecture>
    ){}
}

class ProgramCohort {
    constructor(
        /** E.g CMETE */
        public code: string,

        /** E.g vt17 */
        public yearCode: string,

        /** All the courses for a given period */
        public courses: Array<CourseSchedule>
    ){}
}

class CrowdEstimationData {
    constructor(
        private programCohorts: Array<ProgramCohort>,
        private periodOfEstimation: period,
    ){}

    /**
     * Get how crowded it is right now
     */
    public getCurrentCrowdedness() {

    }

    /** 
     * Get how crowded it is for every hour starting
     * from dateStart
     * */
    public getCrowdednessHourly(dateStart: Date) {

    }

    /** 
     * Get how crowded it is every day at a specific
     * time starting from dateStart.
     * @param hourToCheck Must be between 0 and 24
     */
    public getCrowdednessDaily(dateStart: Date, hourToCheck: number) {

    }
}


export default class CrowdEstimationModel {
    
    /** TODO, make API calls and stuff. After all fetching is done, return a nice CrowdEstimationData object :D */
    public async estimateChapterCrowdedness(): Promise<CrowdEstimationData> {

        const yearCode = "HT19"
        const b = (await Promise.all(
                            await fetch(corsEndpoint+'https://api.kth.se/api/kopps/v2/programme/academic-year-plan/CMETE/'+yearCode)
                            .then(r =>r.json())
                            .then(r=>r.Specs[0].Electivity[0].Courses.map(async (course: any)=>
                                new CourseSchedule(course.Code, course.Name,
                                await fetch(corsEndpoint+'https://www.kth.se/api/schema/v2/course/'+course.Code
                                +'?startTime='+course.ConnectedRound.periodInfos[0].startsAt
                                +'&endTime='+course.ConnectedRound.periodInfos[0].endsAt)
                                .then(r =>r.json())
                                .then(r=>r.entries.map((lecture: any) =>
                                    new Lecture(lecture.start, lecture.end, (lecture.type === 'OVR') ? true : false)))
                                ))
                        )));
        console.log(b)
        return new CrowdEstimationData([], 1);
    }
}