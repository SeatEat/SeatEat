/** A period should only be 1, 2, 3 or 4 */
type period = 1 | 2 | 3 | 4;

class Lecture {
    constructor(
        /** When the lecture starts */
        public start: Date,

        /** When the lectures ends */
        public end: Date,

        /** If the lectures is an lab */
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
}


export default class CrowdEstimationModel {

    /** TODO, make API calls and stuff. After all fetching is done, return a nice CrowdEstimationData object :D */
    public async estimateChapterCrowdedness(): Promise<CrowdEstimationData> {

        // This is just a tmp code to prevent error
        const r = await fetch('');
        return new CrowdEstimationData([], 1);
    }
}