import React, { FC } from 'react';
import './homepage.css';
import ContentPadding from '../../components/content-padding';
import PageContainer from '../../components/page-container';
import ViewCardDescription from '../../components/view-card-description/view-card-description';
import CurrentIcon from '../../assets/icons/dynamic/current-icon';
import Clock24Icon from '../../assets/icons/dynamic/clock-24-icon';
import CalendarIcon from '../../assets/icons/dynamic/calendar-icon';

const Homepage: FC = (props) => {
    return (
        <PageContainer>
            <ContentPadding>
                <div className='homepage-container'>
                    <div className='homepage'>
                        <div className='homepage-intro'>
                            <h1>Welcome to SeatEat!</h1>
                            <div>
                                SeatEat is an app that provides estimation of crowdedness at KTH’s different 
                                chapter halls. With SeatEat you'll never have to step unprepared into a 
                                crowded hall again. After choosing a chapter, you can navigate between three different views:
                            </div>
                        </div>
                        <br />
                        <div className='view-description'>
                            <ViewCardDescription
                                title="Right Now"
                                description="See the current estimation of crowdedness at the chapter hall."
                                icon={<CurrentIcon/>}
                                />
                            <ViewCardDescription
                                title="Daily View"
                                description="See the estimation of crowdedness at the chapter hall for each 
                                hour and day during the upcoming week."
                                icon={<Clock24Icon/>}
                                />
                            <ViewCardDescription
                                title="Weekly View"
                                description="See the estimation of crowdedness at the chapter hall for a 
                                specific hour during each day of the upcoming week."
                                icon={<CalendarIcon/>}
                                />
                        </div>
                        <br />
                        <div className='coming-soon'>
                            <h3>
                                <span className="homepage-check-in-title">Check-in function</span>
                            </h3>
                            <p>
                                Check in when arriving at your chapter hall using the check in button to show 
                                your friends that you are there and help the system estimate the crowdedness 
                                better. The system will check you out automatically depends on your chosen 
                                activity.
                            </p>
                        </div>
                        <div className='contact'>
                            For any questions or found issue regarding SeatEat, you can create issues on our 
                            public <a href="https://gits-15.sys.kth.se/SeatEat/SeatEat">GitHub repo.</a>
                        </div>
                    </div>
                </div>
            </ContentPadding>
        </PageContainer>
    );
}

export default Homepage;
