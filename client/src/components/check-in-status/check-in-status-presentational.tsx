import React, { FC } from 'react';
import './check-in-status.css';
import { PersonCheckIn } from '../../model/check-in-model';
import { ChapterHall } from '../../model/chapter-hall-model';
import PeopleIcon from '../../assets/icons/person.svg';
import CheckInCard from '../check-in-card/check-in-card';
import { checkInActivities, getCheckInActivityByID } from '../../data/check-in-activities';
import Button from '../button/button';
import './check-in-status.css';

interface CheckInStatusPresentationalProps {
    checkedInUsers: PersonCheckIn[],
    currentChapterHall: ChapterHall | null,
    userDocID: string | null,
    userCheckedInChapterName: string | null,
    userCheckingInLoading: boolean
    onCheckOutPressed: () => void,
    onCheckInPressed: () => void,
}

const CheckInStatusPresentational: FC<CheckInStatusPresentationalProps> = (props) => {
    return (
        <div className="check-in-status-container">
            <h1>People currently checked in</h1>
            <br />
            <div className="check-in-status-button-container">
                <div className="check-in-button">
                    <Button 
                        isCompact={true}  
                        onClick={() => props.onCheckInPressed()} 
                        disabled={props.userDocID !== null}>
                        {
                            props.userCheckingInLoading && props.userDocID === null
                            ?
                                <span>Loading</span>
                            :
                                <span>
                                    Check in to <i>
                                        {props.currentChapterHall?.name}
                                    </i>
                                </span>
                        }
                    </Button>
                </div>
                <Button 
                    isCompact={true}  
                    onClick={() => props.onCheckOutPressed()} 
                    disabled={props.userDocID === null}>
                    {
                        <span>
                            Check out from <i>
                                {props.userCheckedInChapterName ?? props.currentChapterHall?.name}
                            </i>
                        </span>
                    }
                </Button>
            </div>
            <br />
            <div className="check-in-status-cards">
                {
                    props.checkedInUsers.length === 0
                    ?
                        <div className="check-in-no-people"> 
                            <img src={PeopleIcon} alt=""/>
                            <h2>No people have currently checked in to {props.currentChapterHall?.name}</h2>
                        </div>
                    :
                        props.checkedInUsers.map((person) => {
                            const checkInActivity = getCheckInActivityByID(person.type);
                            return <CheckInCard
                                key={person.docID}
                                name={person.name}
                                checkInDate={person.date}
                                checkInActivityLogo={checkInActivity.logo}
                                checkInActivityText={checkInActivity.title}
                                isOwnedByUser={props.userDocID === person.docID}/>
                        })
                }
            </div>
        </div>
    );
}

export default CheckInStatusPresentational;
