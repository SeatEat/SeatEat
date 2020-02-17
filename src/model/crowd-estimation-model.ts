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

class Period {
    constructor(
        /** E.g CMETE */
        public code: string,

        /** E.g 2017  */
        public beginYear: number,

        /** E.g what period this is */
        public period: 1 | 2 | 3 | 4,

        /** All the courses for a given period */
        public courses: Array<CourseSchedule>
    ){}
}

export default class CrowdEstimation {
    
}

