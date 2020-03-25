import React, { FC } from "react";
import './homepage.css';
import ContentPadding from "../../components/content-padding";

const Homepage: FC = (props) => {
    return (
        <ContentPadding>
            <div className="intro">
            <h1>Welcome to SeatEat!</h1>
            <div>SeatEat is an app that provides estimation of crowdedness at KTH’s different chapter halls. With SeatEat you'll never have to step unprepared into a crowded hall again.</div>
            <div>After choosing a chapter, you can navigate between three different views:</div>
            </div>
            <div className="view-description">
                <table>
                    <tr>
                        <td>
                            <img src="https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2012/png/iconmonstr-connection-6.png" />
                        </td>
                        <td>
                            <div className="description-title">Right Now</div> 
                            <div className="description">See the current estimation of crowdedness at the chapter hall.</div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <img src="https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2012/png/iconmonstr-time-7.png" />
                        </td>
                        <td>
                        <div className="description-title">Daily View</div> 
                        <div className="description">See the estimation of crowdedness at the chapter hall for each hour and day during the upcoming week.</div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                        <img src="https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2012/png/iconmonstr-calendar-7.png" />
                        </td>
                        <td>
                        <div className="description-title">Weekly View</div> 
                        <div className="description">See the estimation of crowdedness at the chapter hall for a specific hour during each day of the upcoming week.</div>
                        </td>
                    </tr>
                </table> 
            </div>
            <div className="coming-soon">
                <h4>Check-in function (COMING SOON!)</h4> 
                <p>Check in when arriving at your chapter hall using the check in button to show your friends that you are there and help the system estimate the crowdedness better. The system will check you out automatically depends on your chosen activity.</p>
            </div>
            <div className="contact">
            For any questions regarding SeatEat, don't hesitate to contact us.   
            </div>    
        </ContentPadding>
    )
}

export default Homepage;

