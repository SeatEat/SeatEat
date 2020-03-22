import React, { FC } from "react";
import { AppState } from "../../model/redux/store";
import { connect } from "react-redux";
import CheckInCard from "../check-in-card/check-in-card";

import './check-in-status.css';

import BookIcon from '../../assets/icons/book.svg';
import EatIcon from '../../assets/icons/eat.svg';
import QuestionIcon from '../../assets/icons/question.svg';
import { useDialogService } from "../dialog/dialog";
import { ChapterHall } from "../../model/chapter-hall-model";
import Button from "../button/button";
import Input from "../form/input/input";
import Select from "../form/select/select";
import CheckInForm from "../check-in-form/check-in-form";

interface CheckInReason {
    id: string,
    title: string,
    logo: string
}
export const checkInReasons: { [key: string]: CheckInReason } = {
    food: {
        id: 'food',
        title: 'Eating',
        logo: EatIcon
    },
    study: {
        id: 'study',
        title: 'Studying',
        logo: BookIcon
    },
    other: {
        id: 'other',
        title: 'Other',
        logo: QuestionIcon
    },
}

export class CheckInPerson {
    constructor(
        public name: string,
        public id: string,
        public checkInTime: Date,
        public reason: CheckInReason
    ) { };

    public getMinutesFromCheckIn(): number {
        let currentDate = new Date();
        let timeDiffMS = currentDate.getTime() - this.checkInTime.getTime();
        return Math.floor(timeDiffMS / 1000 / 60);
    }
}

interface CheckInStatusProps {
    personsCheckedIn: CheckInPerson[],
    currentChapter: ChapterHall | null,
}

const CheckInStatus: FC<CheckInStatusProps> = (props) => {

    const confirm = useDialogService()
    const openCheckInDialog = () => {
        confirm({
            content: (closeDialog => <CheckInForm 
                closeDialog={closeDialog}
                currentChapter={props.currentChapter}/>),
        });
    }

    return <div className="check-in-status-container">
        <h1>People currently checked in</h1>
        <br />
        <Button isCompact={true} onClick={openCheckInDialog}>
            Check in yourself
        </Button>
        <br/><br/>
        <div className="check-in-status-cards">
            {props.personsCheckedIn.map((person) => {
                return <CheckInCard key={person.name} checkInPerson={person} />
            })}
        </div>
    </div>
}

export default connect(
    (state: AppState): CheckInStatusProps => ({
        personsCheckedIn: [
            new CheckInPerson('Adam Jonsson', '0', new Date(), checkInReasons.study),
            new CheckInPerson('Ella-Klara ', '1', new Date(), checkInReasons.food),
            new CheckInPerson('Anna', '2', new Date(), checkInReasons.other),
            new CheckInPerson('Gil', '3', new Date(), checkInReasons.study),
            new CheckInPerson('Jonas', '4', new Date(), checkInReasons.study),
            new CheckInPerson('Ylva', '5', new Date(), checkInReasons.food),
            new CheckInPerson('Maja', '6', new Date(), checkInReasons.study),
            new CheckInPerson('Helena', '7', new Date(), checkInReasons.other),
            new CheckInPerson('Sara', '8', new Date(), checkInReasons.study),
            new CheckInPerson('Mr Andersson', '9', new Date(), checkInReasons.other),
        ],
        currentChapter: state.estimationState.chapterHall
    })
)(CheckInStatus);