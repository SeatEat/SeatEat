import { ChapterHall, Chapter } from "../data/chapter-data-interfaces";

/** A period should only be 1, 2, 3 or 4 */
type period = 1 | 2 | 3 | 4;

interface EstimationTimeFactor {
    /** When the estimation starts */
    hourStart: number,

    /** When the estimation ends */
    hourEnd: number,

    /** 0 = Not likely, 1 = Very likely */
    estimationFactor: number,
}

class EstimationFactors {
    static estimationFactorArray: EstimationTimeFactor[] = [{
            hourStart: 0,
            hourEnd: 6,
            estimationFactor: 0
        },
        {
            hourStart: 6,
            hourEnd: 8,
            estimationFactor: 0.1
        },
        {
            hourStart: 8,
            hourEnd: 12,
            estimationFactor: 0.4
        },
        {
            hourStart: 12,
            hourEnd: 13,
            estimationFactor: 0.6
        },
        {
            hourStart: 13,
            hourEnd: 16,
            estimationFactor: 0.3
        },
        {
            hourStart: 16,
            hourEnd: 18,
            estimationFactor: 0.1
        },
        {
            hourStart: 18,
            hourEnd: 24,
            estimationFactor: 0
        },
    ]

    /** This factor is used when there is no lecture left on a day */
    static NO_NEXT_LECTURE_FACTOR = 0.2;

    /** This factor is used when no lecture have yet happened on a day */
    static NO_LAST_LECTURE_FACTOR = 0.2;

    /** This factor is used when there exist non lecture on a day */
    static NO_LECTURE_FACTOR = 0;

    /** This factor is used when there is an ongoing lecture */
    static ONGOING_LECTURE_FACTOR = 0;


    /** Get estimation factor from popular hours */
    public static getEstimationByHour(hour: number): number {
        for (const key in this.estimationFactorArray) {
            const element = this.estimationFactorArray[key];
            if (hour >= element.hourStart && hour < element.hourEnd) {
                return element.estimationFactor;
            }
        }
        return 0;
    }

    /** Get estimation factor depending on hours between next and last lectures */
    static getEstimationByTimeInterval(
        hoursUntilNextLecture: number,
        hoursFromLastLecture: number,
    ): number {
        let hoursBetweenLectures = hoursUntilNextLecture + hoursFromLastLecture;

        switch (hoursBetweenLectures) {
            case 1:
                return 1;
            case 2:
                return 0.8;
            case 3:
                return 0.7;
            default:
                return 0.5;
        }
    }
}


export class Lecture {
    constructor(
        /** When the lecture starts */
        public start: Date,

        /** When the lectures ends */
        public end: Date,

        /** If the lectures is a lab */
        public isLab: boolean
    ) {}

    /** Return true if the lecture is ongoing on given hour */
    public lectureOngoing(hour: number): boolean {
        return this.start.getHours() <= hour && this.end.getHours() > hour;
    }
}

export class CourseSchedule {
    constructor(
        /** E.g DM1234 */
        public code: string,

        /** E.g Envariabelsanalys */
        public name: string,

        /** If it is an elective */

        public isElective: boolean,

        /** An array of the lectures */
        public lectures: Array < Lecture >
    ) {}
}

export class ProgramCohort {
    constructor(
        /** E.g CMETE */
        public code: string,

        /** E.g vt17 */
        public yearCode: string,

        public amountOfPeople: number = 100,

        /** All the courses for a given period */
        public courses: Array < CourseSchedule >
    ) {}

    private getLectureList(dateStart: Date): Lecture[] {
        let lectures: Lecture[] = [];
        this.courses.forEach(course => {
            course.lectures.map(lecture => {
                if (dateStart.getTime() < lecture.end.getTime()) {
                    lectures.push(lecture);
                }
            });
        });
        return lectures.sort((lecA, lecB) => lecA.start.getTime() - lecB.start.getTime());;
    }

    private getDateAfterNumDays(dateStart: Date, days: number) {
        return new Date(dateStart.getTime() + days * 1000 * 60 * 60 * 24);
    }

    private getLecturesDaily(dateStart: Date): Array < Lecture[] > {
        let lectureList = this.getLectureList(dateStart);

        let lectureListDay: Array < Array < Lecture >> = [];
        let dayNumber = 0;

        let dayDate = this.getDateAfterNumDays(dateStart, dayNumber);
        lectureList.forEach(lecture => {
            while (lecture.start.getTime() > dayDate.getTime()) {
                dayNumber++;
                lectureListDay[dayNumber] = [];
                dayDate = this.getDateAfterNumDays(dateStart, dayNumber);
            }
            if (lectureListDay[dayNumber] !== undefined) {
                lectureListDay[dayNumber].push(lecture);
            }
        });
        lectureListDay.shift();
        return lectureListDay;
    }

    private getEstimationFactor(lectures: Lecture[], hour: number): number {
        let hourSinceLastLectures;
        let hourToNextLectures;

        const timeFactor = EstimationFactors.getEstimationByHour(hour);

        // No lectures today
        if (lectures.length === 0) {
            return EstimationFactors.NO_LECTURE_FACTOR * timeFactor;
        }

        for (let index = 0; index < lectures.length; index++) {
            const lecture = lectures[index];

            // Lecture currently ongoing
            if (lecture.lectureOngoing(hour)) {
                return EstimationFactors.ONGOING_LECTURE_FACTOR * timeFactor;
            }

            let lectureHoursFromEnded = hour - lecture.end.getHours();
            let lectureHoursUntilStart = lecture.start.getHours() - hour;

            if (lectureHoursFromEnded >= 0) {
                if (hourSinceLastLectures === undefined || lectureHoursFromEnded < hourSinceLastLectures) {
                    hourSinceLastLectures = lectureHoursFromEnded;
                }
            }

            if (lectureHoursUntilStart > 0) {
                if (hourToNextLectures === undefined || lectureHoursUntilStart < hourToNextLectures) {
                    hourToNextLectures = lectureHoursUntilStart;
                }
            }
        }

        // If we do not have any more lectures today
        if (hourToNextLectures === undefined) {
            return EstimationFactors.NO_NEXT_LECTURE_FACTOR * timeFactor;
        }

        // If we have not had any lecture yet
        if (hourSinceLastLectures === undefined) {
            return EstimationFactors.NO_LAST_LECTURE_FACTOR * timeFactor;
        }

        return EstimationFactors.getEstimationByTimeInterval(
            hourToNextLectures, hourSinceLastLectures
        ) * timeFactor;
    }

    public getCrowdednessHourly(dateStart: Date) {
        let estimationData: Array < Array < number >> = [];
        let lectureListDay = this.getLecturesDaily(dateStart);

        for (let day in lectureListDay) {
            let lectures = lectureListDay[day];

            if (estimationData[day] === undefined) {
                estimationData[day] = [];
            }

            for (let hour = 0; hour < 24; hour++) {
                estimationData[day][hour] = Math.round(this.getEstimationFactor(lectures, hour) * this.amountOfPeople);
            }
        }
        return estimationData;
    }
}

export class CrowdEstimationData {

    private estimation: number[][];
    public daysOfEstimation: number;

    constructor(
        private programCohorts: Array < ProgramCohort > ,
        private startDateOfEstimation: Date,
    ) {
        this.estimation = this.mergeCrowdEstimationData();
        this.daysOfEstimation = this.estimation.length;
    }

    private mergeCrowdEstimationData(): number[][] {
        let mergedEstimationData: number[][] = [];
        for (var i = 0; i < this.programCohorts.length; i++) {
            let estimationData = this.programCohorts[i].getCrowdednessHourly(this.startDateOfEstimation);
            for (var day = 0; day < estimationData.length; day++) {
                if (mergedEstimationData[day] === undefined) mergedEstimationData[day] = [];
                for (var hour = 0; hour < estimationData[day].length; hour++) {
                    if (mergedEstimationData[day][hour] === undefined) mergedEstimationData[day][hour] = 0;
                    mergedEstimationData[day][hour] += estimationData[day][hour];
                }
            }
        }
        return mergedEstimationData;
    }

    /**
     * Get how crowded it is right now
     */
    public getCurrentCrowdedness() {

    }

    public getEstimationData(): number[][] {
        return this.estimation;
    }

    /**
     * Get how crowded it is for every hour starting
     * from dateStart
     * */
    public getCrowdedness(daysFromStartDate: number, hourOfDay: number) {
        return this.estimation[daysFromStartDate][hourOfDay];
    }
}

interface ChapterData {
    averageAmount: number;
    code: string;
}

export default class CrowdEstimationModel {

    /** Get active year codes from current date */
    public static getActiveYearCodes(): string[] {
        let yearCodes = [];

        const schoolStartMonth = 7;
        const yearToCheck = 3;
        const currentDate = new Date();

        // A new year of student begins at schoolStartMonth
        // Need to take that into account by having a yearOffset
        let yearOffset = 1;
        if (currentDate.getMonth() >= schoolStartMonth) {
            yearOffset = 0;
        }

        for (let i = 0; i < yearToCheck; i++) {
            var year = (currentDate.getFullYear() - i - yearOffset).toString().substring(2, 4);
            yearCodes.push('HT' + year);
        }
        return yearCodes;
    }

    private static async getCourseSchedule(course: any, isElective: boolean, startDate: Date, endDate: Date): Promise < CourseSchedule > {

        // Add inital ednpoint
        var endpoint: string = '/kth/schema/course/' + course.Code

        // Limit API call to start term and course round code
        if(course.ConnectedRound) {
            var lastEndsAt: Date = new Date(course.ConnectedRound.periodInfos[0].endsAt);
            course.ConnectedRound.periodInfos.map((periodInfo: any) =>
                (new Date(periodInfo.endsAt) > lastEndsAt) ? lastEndsAt = new Date(periodInfo.endsAt) : false
            )
            if(lastEndsAt < startDate) {
                return new CourseSchedule(course.Code, course.Name, isElective, [])
            }
            const roundId: string = course.ConnectedRound.Id
            const roundYear: string = '20' + roundId.substr(roundId.length - 3, 2)
            const courseRoundCode: string = roundId.substr(roundId.length - 1)
            const roundTerm: string = roundId.substr(roundId.length - 4, 1) === 'V' ? 'VT' : 'HT'
            const startTerm: string = roundYear + roundTerm
            endpoint += '/' + startTerm + '/' + courseRoundCode
        }

        // Add start and endtime getting courses
        endpoint +=
            '?startTime=' + startDate.toISOString().split('T')[0] +
            '&endTime=' + endDate.toISOString().split('T')[0]


        // Get the course schedule
        const courseSchedule = await fetch(endpoint).then(r => r.json());

        // Map the response to Lecture objects
        const lectures: Lecture[] = courseSchedule.entries.map((lecture: any) => {
            return new Lecture(
                new Date(lecture.start),
                new Date(lecture.end),
                (lecture.type === 'OVR') ? true : false
            );
        });

        return new CourseSchedule(
            course.code,
            course.Name,
            isElective,
            lectures
        );
    }

    /** TODO, make API calls and stuff. After all fetching is done, return a nice CrowdEstimationData object :D */
    public static async estimateChapterCrowdedness(
        startDateOfEstimation: Date,
        chapterData: Chapter[],
        onProgress: (arg0: number) => void,
        ): Promise < CrowdEstimationData > {

        const yearCodes = CrowdEstimationModel.getActiveYearCodes();

        //Ugly code, want to do this better
        const startDate = new Date(startDateOfEstimation)
        var endDate = new Date(startDate)
        endDate.setDate(endDate.getDate() + 7);

        let programCohorts: ProgramCohort[] = [];
        for (const chapter of chapterData) {
            for (const yearCode of yearCodes) {

                onProgress(
                    chapterData.indexOf(chapter) / chapterData.length +
                    yearCodes.indexOf(yearCode) / (yearCodes.length) / chapterData.length
                );

                let courseSchedules: CourseSchedule[] = [];

                const programCohortResponse = await fetch(
                    '/kth/kopps/programme/academic-year-plan/' +
                    chapter.code + '/' + yearCode).then(r => r.json());

                await programCohortResponse.Specs.forEach(async (spec: any, i: number) => {
                    const courses: any[] = spec.Electivity[0].Courses;

                    if (!spec.SpecCode && i !== yearCodes.indexOf(yearCode) ) {
                        return;
                    }

                    for (const course of courses) {
                        courseSchedules.push(await this.getCourseSchedule(
                            course,
                            spec.SpecCode !== undefined ? true : false,
                            startDate,
                            endDate)
                        );
                    }
                });
                
                programCohorts.push(new ProgramCohort(
                    programCohortResponse.ProgramCode,
                    yearCode,
                    chapter.avarageStudentAmount,
                    courseSchedules
                ));
            }
        }
        onProgress(1);

        return new CrowdEstimationData(
            programCohorts,
            startDateOfEstimation
        );
    }
}