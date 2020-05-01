import React, { FC } from 'react';
import './check-in-card.css';
import ContentPadding from '../content-padding';
import ClockIcon from '../../assets/icons/clock.svg';

interface CheckInCardPresentationalProps {
    isOwnedByUser: boolean,
    name: string,
    showCard: boolean,
    checkInActivityLogo: string,
    checkInActivityText: string,
    checkInTimeDescription: string,
    checkInTimeText: string,
}

const CheckInCardPresentational: FC<CheckInCardPresentationalProps> = (props) => {

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

    return <div className={`check-in-card-container ${props.isOwnedByUser ? 'owned-by-user' : ''} ${props.showCard ? 'active' : ''}`}>
        <ContentPadding>
            <div className="check-in-card-name">
                {props.name}
            </div>
            <div className="check-in-card-data-container">
                {
                    renderDataSection(
                        ClockIcon,
                        props.checkInTimeDescription,
                        props.checkInTimeText,
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

export default CheckInCardPresentational;
