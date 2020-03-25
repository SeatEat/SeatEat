import { Store } from "redux";
import { db } from "./firebase-model"
import {setCheckIns, CheckInState } from "./redux/checkInState"
import { CheckInActivityIDs } from "../data/check-in-activities";

const baseCollection = "CheckIn";

export class CheckInPerson {
    constructor(
        public name: string,
        public id: string,
        public checkInTime: Date,
        public reason: string
    ) { };

    public getMinutesFromCheckIn(): number {
        let currentDate = new Date();
        let timeDiffMS = currentDate.getTime() - this.checkInTime.getTime();
        return Math.floor(timeDiffMS / 1000 / 60);
    }
}

export interface PersonCheckIn {
    docID: string,
    name: string,
    type: CheckInActivityIDs,
    date: Date
}

export function addCheckInListener(chapterName: string, onChange: (checkIns: PersonCheckIn[]) => void): Function {
    return db.collection(baseCollection).where('chapterName', '==', chapterName).onSnapshot(function (collectionSnapshot) {
        let checkIns: PersonCheckIn[] = [];
        collectionSnapshot.forEach((doc) => {
            const docData = doc.data();
            checkIns.push({
                docID: doc.id,
                date: new Date(docData['date']),
                name: docData['name'],
                type: docData['type']
            });
        });
        onChange(checkIns);
    });
}

export async function addCheckIn(name: string, type: CheckInActivityIDs, chapterName: string) {
    let newDoc = db.collection(baseCollection).doc();
    await newDoc.set({
        name: name, 
        type: type,
        chapterName: chapterName,
        date: new Date().toISOString()
    });
    return newDoc;
}

export function removeCheckIn(docID: string): void {
    db.collection(baseCollection).doc(docID).delete();
}