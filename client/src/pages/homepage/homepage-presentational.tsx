import React, { FC } from 'react';
import './homepage.css';
import ContentPadding from '../../components/content-padding/content-padding';
import PageContainer from '../../components/page-container';
import ViewCardDescription from '../../components/view-card-description/view-card-description';
import CurrentIcon from '../../assets/icons/dynamic/current-icon';
import Clock24Icon from '../../assets/icons/dynamic/clock-24-icon';
import CalendarIcon from '../../assets/icons/dynamic/calendar-icon';
import Banner from '../../components/banner/banner';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import Button from '../../components/button/button';

export interface HomepageProps {
    openMobileMenu: () => void;
}

const Homepage: FC<HomepageProps> = (props) => {

    const windowDimensions = useWindowDimensions();

    return (
        <PageContainer>
            <Banner/>
            <ContentPadding>
                <div className='homepage-container'>
                    <div className='homepage'>
                        <div className='homepage-intro'>
                            <h1>Welcome to SeatEat!</h1>
                            <div>
                                SeatEat is an app that provides estimation of how busy KTH’s chapter halls are. <b>With SeatEat you'll never have to step unprepared into a crowded hall again.</b>
                            </div>
                            <div>
                            <br />
                                After choosing a chapter, you can navigate between three different views:
                            </div>
                        </div>
                        <br />
                        <div className='view-description'>
                            <ViewCardDescription
                                title="Right Now"
                                description="Get the current estimation of how busy the chapter hall is."
                                icon={<CurrentIcon/>}
                                />
                            <ViewCardDescription
                                title="Daily View"
                                description="Choose a day of the upcoming week. Get an estimation of how busy the chapter hall is at 
                                different times throughout that day."
                                icon={<Clock24Icon/>}
                                />
                            <ViewCardDescription
                                title="Weekly View"
                                description="Choose a time between 5:00 and 19:00. Get an estimation of how busy the chapter hall is at that 
                                specific time during each day of the upcoming week."
                                icon={<CalendarIcon/>}
                                />
                        </div>
                        <div>
                            {
                                windowDimensions.width <= 850
                                ? 
                                    <div>
                                        <br/>
                                        <Button onClick={() => props.openMobileMenu()}>Ready to go? Choose your chapter hall</Button>
                                        <br/>
                                    </div>
                                :
                                    <p>
                                        <b>Ready to go?</b> Choose your chapter hall from the menu to the left.
                                    </p>                           
                            }
                        </div>
                        <div>
                            <h3>
                                <span className="homepage-subtitle">SeatEat's estimation</span>
                            </h3>
                                <p>
                                SeatEat looks at the courses and programmes of the students who are assigned to the different chapter halls through the KTH API. 
                                The estimation is based on how many students have a scheduled activity, as well as popular hours (like lunch).
                                </p>
                        </div>
                        <div>
                            <h3>
                                <span className="homepage-subtitle">Check-in function</span>
                            </h3>
                            <p>
                                Check in when arriving at your chapter hall using the check in button to show 
                                your friends that you are there and help the system to provide a better crowdness  
                                estimation. Check out when you're leaving, or let the system check you out  
                                automatically after a while, depends on your chosen activity.
                            </p>
                        </div>
                        <div className='contact'>
                            For any questions or found issues regarding SeatEat, you can create issues on our 
                            public <a href="https://gits-15.sys.kth.se/SeatEat/SeatEat">GitHub repo</a>.
                        </div>
                    </div>
                </div>
            </ContentPadding>
        </PageContainer>
    );
}

export default Homepage;