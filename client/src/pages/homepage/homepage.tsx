import React, { FC } from 'react';
import './homepage.css';
import ContentPadding from '../../components/content-padding';
import PageContainer from '../../components/page-container';
import ViewCardDescription from '../../components/view-card-description/view-card-description';

const Homepage: FC = (props) => {
    return (
        <PageContainer>
            <ContentPadding>
                <div className='homepage-container'>
                    <div className='homepage'>
                        <div className='intro'>
                            <h1>Welcome to SeatEat!</h1>
                            <div>
                                SeatEat is an app that provides estimation of crowdedness at KTH’s different 
                                chapter halls. With SeatEat you'll never have to step unprepared into a 
                                crowded hall again. After choosing a chapter, you can navigate between three different views:
                            </div>
                        </div>
                        <div className='view-description'>
                            <ViewCardDescription
                                title="Right Now"
                                description="See the current estimation of crowdedness at the chapter hall."
                                icon="https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2012/png/iconmonstr-connection-6.png"
                                />
                            <ViewCardDescription
                                title="Daily View"
                                description="See the estimation of crowdedness at the chapter hall for each 
                                hour and day during the upcoming week."
                                icon="https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2012/png/iconmonstr-time-7.png"
                                />
                            <ViewCardDescription
                                title="Weekly View"
                                description="See the estimation of crowdedness at the chapter hall for a 
                                specific hour during each day of the upcoming week."
                                icon="https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2012/png/iconmonstr-calendar-7.png"
                                />
                        </div>
                        <div className='coming-soon'>
                            <h4>Check-in function</h4>
                            <p>
                                Check in when arriving at your chapter hall using the check in button to show 
                                your friends that you are there and help the system estimate the crowdedness 
                                better. The system will check you out automatically depends on your chosen 
                                activity.
                            </p>
                        </div>
                        <div className='contact'>
                            For any questions regarding SeatEat, don't hesitate to contact us.
                        </div>
                    </div>
                </div>
            </ContentPadding>
        </PageContainer>
    );
}

export default Homepage;

