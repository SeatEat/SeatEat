import React, { FC, useEffect, useState } from "react";
import './check-in-card.css';
import ContentPadding from "../content-padding/content-padding";
import ClockIcon from '../../assets/icons/clock.svg';
import CheckInCardPresentational from './check-in-card-presentational';

interface CheckInCardProps {
    name: string,
    checkInDate: Date,
    checkInActivityLogo: string,
    checkInActivityText: string,
    isOwnedByUser: boolean
}

const CheckInCard: FC<CheckInCardProps> = (props) => {

    const [minutesFromCheckIn, setMinutesFromCheckIn] = useState(0);
    const [showCard, setShowCard] = useState(false);

    useEffect(() => {
        const showCardTimeout = setTimeout(() => {
            setShowCard(true);
        }, 50);
        setMinutesFromCheckIn(getMinutesFromCheckIn(props.checkInDate))
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


    const renderCheckInTimeText = () => {
        if (minutesFromCheckIn === 0) {
            return 'Now';
        }
        else if (minutesFromCheckIn < 60){
            return `${minutesFromCheckIn}min ago`;
        }
        else {
            return `${Math.floor(minutesFromCheckIn / 60)}h ago`;
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

    return <CheckInCardPresentational
        checkInActivityLogo={props.checkInActivityLogo}
        checkInActivityText={props.checkInActivityText}
        checkInTimeDescription={renderCheckInTimeDescription()}
        checkInTimeText={renderCheckInTimeText()}
        isOwnedByUser={props.isOwnedByUser}
        name={props.name}
        showCard={showCard}
    />
}

export default CheckInCard;