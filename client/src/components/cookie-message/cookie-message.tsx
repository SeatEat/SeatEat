import React, { FC } from 'react';
import CookieConsent from 'react-cookie-consent';
import './cookie-message.css';

import Button from "../button/button";

const CookieMessage: FC = () => {
    return (        
        <CookieConsent
            buttonText="ACCEPT"
            cookieName="cookie-message"
            style={{ background: "#fbdc4c", color:"#1b2e63"}}
            enableDeclineButton
            declineButtonText="DECLINE (optional)"
            buttonStyle={{background: "#1b2e63", color: "#fef3ca"}}
            declineButtonStyle={{background: "#db001e", color: "#fef3ca"}}
            buttonClasses="button cookie-message-accept"
            declineButtonClasses="button cookie-message-decline">
            SeatEat uses cookies to enhance the user experience. Unfortunately not as your dessert. {" "}

        </CookieConsent>
    );
}

export default CookieMessage;