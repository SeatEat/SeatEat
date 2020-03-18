import React, { FC, useEffect, useState } from "react";
import { CheckInPerson } from "../check-in-status/check-in-status";

import './check-in-card.css';
import ContentPadding from "../content-padding";

import ClockIcon from '../../assets/icons/clock.svg';

interface CheckInCardProps {
    checkInPerson: CheckInPerson
}

const CheckInCard: FC<CheckInCardProps> = (props) => {

    const [minutesFromCheckIn, setMinutesFromCheckIn] = useState(0);

    useEffect(() => {
        const timeoutID = setInterval(() => {
            setMinutesFromCheckIn(props.checkInPerson.getMinutesFromCheckIn());
        }, 5000);
        return () => {
            clearInterval(timeoutID);
        }
    }, [minutesFromCheckIn]);

    const renderDataSection = (icon: string, description: string, data: string): React.ReactNode => {
        return <div className="check-in-card-data">
            <div className="check-in-card-data-icon">
                <img src={icon} alt=""/>
            </div>
            <div>
                <div className="check-in-card-data-description">{description}</div>
                <div className="check-in-card-data-data">{data}</div>
            </div>
        </div>
    }

    const renderCheckInTimeText = () => {
        if (minutesFromCheckIn === 0) {
            return 'Now';
        }
        else {
            return `${minutesFromCheckIn}min ago`;
        }
    }

    const renderCheckInTimeDescription = () => {
        const minutes = props.checkInPerson.checkInTime.getMinutes();
        const hour = props.checkInPerson.checkInTime.getHours();
        return `Checked in ${hour < 10 ? `0${hour}` : hour}:${minutes < 10 ? `0${minutes}` : minutes}`
    }

    return <div className="check-in-card-container">
        <ContentPadding>
            <div className="check-in-card-name">
                {props.checkInPerson.name}
            </div>
            <div className="check-in-card-data-container">
                {
                    renderDataSection(
                        ClockIcon,
                        renderCheckInTimeDescription(),
                        renderCheckInTimeText()
                    )
                }
                {
                    renderDataSection(
                        props.checkInPerson.reason.logo,
                        'Activity',
                        props.checkInPerson.reason.title
                    )
                }
            </div>
        </ContentPadding>
    </div>
}

export default CheckInCard;