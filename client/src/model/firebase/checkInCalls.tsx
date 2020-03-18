import { Store } from "redux";
import { db } from "../firebase"
import { CheckIns, CheckInType, setCheckIns } from "../redux/checkInState"

const baseCollection = "CheckIn";

export function addCheckInListener(store: Store): void {
    db.collection(baseCollection).onSnapshot(function(collectionSnapshot) {
        var checkIns: CheckIns = {};
        collectionSnapshot.forEach(function(doc) {
            checkIns = {...checkIns, ...{ [doc.id]: doc.data() }};
        });
        setCheckIns(store, checkIns)
    });
}

export function addCheckIn(userUid: string, name: string, type: CheckInType): void {
    db.collection(baseCollection).doc(userUid).set({name: name, type: type, date: new Date().toISOString()});
}

export function removeCheckIn(userUid: string): void {
    db.collection(baseCollection).doc(userUid).delete();
}