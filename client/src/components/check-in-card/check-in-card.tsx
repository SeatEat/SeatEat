import React, { FC, useEffect, useState } from "react";
import './check-in-card.css';

import ContentPadding from "../content-padding";
import ClockIcon from '../../assets/icons/clock.svg';

interface CheckInCardProps {
    name: string,
    checkInDate: Date,
    checkInActivityLogo: string,
    checkInActivityText: string,
}

const CheckInCard: FC<CheckInCardProps> = (props) => {

    const [minutesFromCheckIn, setMinutesFromCheckIn] = useState(0);
    const [showCard, setShowCard] = useState(false);

    useEffect(() => {
        const showCardTimeout = setTimeout(() => {
            setShowCard(true);
        }, 50);
        return () => {
            clearTimeout(showCardTimeout);
        }
    }, []);

    useEffect(() => {
        const timeoutID = setInterval(() => {
            setMinutesFromCheckIn(getMinutesFromCheckIn(props.checkInDate));
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
        const minutes = props.checkInDate.getMinutes();
        const hour = props.checkInDate.getHours();
        return `Checked in ${hour < 10 ? `0${hour}` : hour}:${minutes < 10 ? `0${minutes}` : minutes}`
    }

    const getMinutesFromCheckIn = (checkInTime: Date): number => {
        let currentDate = new Date();
        let timeDiffMS = currentDate.getTime() - checkInTime.getTime();
        return Math.floor(timeDiffMS / 1000 / 60);
    }

    return <div className={`check-in-card-container ${showCard ? 'active' : ''}`}>
        <ContentPadding>
            <div className="check-in-card-name">
                {props.name}
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
                        props.checkInActivityLogo,
                        'Activity',
                        props.checkInActivityText
                    )
                }
            </div>
        </ContentPadding>
    </div>
}

export default CheckInCard;