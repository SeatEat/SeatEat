import ChapterHallData from '../data/chapter-hall-data.json';

export interface ChapterHall {
    name: string,
    address: string,
    contact: string,
    logos: string[],
    chapters: Chapter[]
}

export interface Chapter {
    name: string,
    averageStudentAmount: number,
    code: string
}

export function getChapterHallFromName(name: string): ChapterHall | null {
    for (let chapterHall of ChapterHallData) {
        if (chapterHall.name === name) {
            return chapterHall;
        }
    }
    return null;
}