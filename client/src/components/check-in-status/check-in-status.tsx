import React, { FC, useEffect, useState } from "react";
import { AppState } from "../../model/redux/store";
import { connect } from "react-redux";

import { useDialogService } from "../dialog/dialog";
import { ChapterHall } from "../../model/chapter-hall-model";
import CheckInForm from "../check-in-form/check-in-form";
import ConfirmCheckOut from "../confirm-check-out/confirm-check-out";
import { PersonCheckIn } from "../../model/check-in-model";
import CheckInStatusPresentational from "./check-in-status-presentational";


interface CheckInStatusProps {
    personsCheckedIn: PersonCheckIn[],
    currentChapter: ChapterHall | null,
    userCheckedInId: string | null,
    userIsCheckedIn: boolean,
    userCheckInLoading: boolean,
    userCheckInChapterName: string | null,
    userDocId: string | null
}

const CheckInStatus: FC<CheckInStatusProps> = (props) => {

    const confirm = useDialogService();
    const [checkedInUsersSorted, setCheckedInUserSorted] = useState<PersonCheckIn[]>([]);

    useEffect(() => {
        setCheckedInUserSorted(
            props.personsCheckedIn.sort(
                (a,b) => (
                    // Order the users card first
                    a.docID === props.userCheckedInId || b.docID === props.userCheckedInId
                        ? 
                            a.docID === props.userCheckedInId ? -1 : 1
                        :
                            // Then, order by check in date
                            (a.date < b.date ) ? 1 : -1
                )
            )
        );
    }, [props.personsCheckedIn])

    const openCheckInDialog = () => {
        confirm({
            content: (closeDialog => <CheckInForm
                closeDialog={closeDialog}
                currentChapter={props.currentChapter} />),
        });
    }
    const openCheckOutDialog = () => {
        confirm ({
            content: (closeDialog => <ConfirmCheckOut
                closeDialog={closeDialog}
                currentChapterHall={props.userCheckInChapterName}/>)
        });
    }

    return <CheckInStatusPresentational
        checkedInUsers={checkedInUsersSorted}
        currentChapterHall={props.currentChapter}
        onCheckInPressed={openCheckInDialog}
        onCheckOutPressed={openCheckOutDialog}
        userCheckedInChapterName={props.userCheckInChapterName}
        userCheckingInLoading={props.userCheckInLoading}
        userDocID={props.userDocId}
    />
}

export default connect(
    (state: AppState): CheckInStatusProps => ({
        personsCheckedIn: state.checkInState.peopleCheckIn,
        currentChapter: state.estimationState.chapterHall,
        userCheckedInId: state.checkInState.checkInUser.docID,
        userCheckInLoading: state.checkInState.checkInUser.loading,
        userIsCheckedIn: state.checkInState.checkInUser.userCheckedIn,
        userCheckInChapterName: state.checkInState.checkInUser.chapterName,
        userDocId: state.checkInState.checkInUser.docID
    })
)(CheckInStatus);