import React, { FC } from "react";
import { AppState, Dispatch } from "../../model/redux/store";
import { connect } from "react-redux";
import CheckInCard from "../check-in-card/check-in-card";

import './check-in-status.css';

import { useDialogService } from "../dialog/dialog";
import { ChapterHall } from "../../model/chapter-hall-model";
import Button from "../button/button";
import CheckInForm from "../check-in-form/check-in-form";
import ConfirmCheckOut from "../confirm-check-out/confirm-check-out";
import { requestUserCheckOut } from "../../model/redux/checkInState";
import { PersonCheckIn } from "../../model/check-in-model";
import { checkInActivities } from "../../data/check-in-activities";

import PeopleIcon from '../../assets/icons/person.svg';


interface CheckInStatusProps {
    personsCheckedIn: PersonCheckIn[],
    currentChapter: ChapterHall | null,
    userIsCheckedIn: boolean,
    userCheckInLoading: boolean,
    userCheckInChapterName: string | null,
}

const CheckInStatus: FC<CheckInStatusProps> = (props) => {

    const confirm = useDialogService()
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

    const getCheckInActivityByID = (activityID: string) => {
        return checkInActivities.find(
            (value) => value.id === activityID
        );
    }

    const renderCheckInStatusButton = () => {
        let buttonTextCheckIn: React.ReactNode = <span>Check in to <i>{props.currentChapter?.name}</i></span>;
        let buttonTextCheckOut: React.ReactNode = <span>Check out from <i>{props.currentChapter?.name}</i></span>;
        let disableCheckIn = false;
        let disableCheckOut = false;
        let action: Function = () => {};

        if (props.userCheckInLoading) {
            buttonTextCheckIn = "Loading";
            buttonTextCheckOut = "Loading";
        }
        else if (props.userIsCheckedIn) {
            buttonTextCheckOut = <span>Check out from <i>{props.userCheckInChapterName ? props.userCheckInChapterName : props.currentChapter?.name}</i></span>;
            disableCheckIn = true;
            action = openCheckOutDialog;
            
        }
        else {
            action = openCheckInDialog;
            disableCheckOut = true;
        }

        return  <div className="check-in-status-button-container">
                    <div className="check-in-button">
                        <Button isCompact={true}  onClick={action} disabled={disableCheckIn}>
                            {buttonTextCheckIn}
                        </Button>
                    </div>
                    <Button isCompact={true}  onClick={action} disabled={disableCheckOut}>
                        {buttonTextCheckOut}
                    </Button>
                </div>
    }

    return <div className="check-in-status-container">
        <h1>People currently checked in</h1>
        <br />
        {renderCheckInStatusButton()}
        <br />
        <div className="check-in-status-cards">
            {
                props.personsCheckedIn.length === 0
                ?
                    <div className="check-in-no-people"> 
                        <img src={PeopleIcon} alt=""/>
                        <h2>No people have currently checked in to {props.currentChapter?.name}</h2>
                    </div>
                :
                    props.personsCheckedIn.map((person) => {
                        const checkInActivity = getCheckInActivityByID(person.type);
                        console.log(checkInActivity);
                        if (checkInActivity) {
                            return <CheckInCard 
                                key={person.name}
                                name={person.name}
                                checkInDate={person.date}
                                checkInActivityLogo={checkInActivity.logo}
                                checkInActivityText={checkInActivity.title}/>
                        }
                    })
            }
        </div>
    </div>
}

export default connect(
    (state: AppState): CheckInStatusProps => ({
        personsCheckedIn: state.checkInState.peopleCheckIn,
        currentChapter: state.estimationState.chapterHall,
        userCheckInLoading: state.checkInState.checkInUser.loading,
        userIsCheckedIn: state.checkInState.checkInUser.userCheckedIn,
        userCheckInChapterName: state.checkInState.checkInUser.chapterName
    })
)(CheckInStatus);