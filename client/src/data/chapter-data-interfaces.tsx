export interface ChapterHall {
    name: string,
    adress: string,
    contact: string,
    chapters: Chapter[]
}

export interface Chapter {
    name: string,
    avarageStudentAmount: number,
    code: string
}
