import React, { FC } from 'react';
import CookieConsent from 'react-cookie-consent';
import Button from '../button/button';
import './cookie-message.css';

const CookieMessage: FC = () => {
    return (        
        <CookieConsent
            disableStyles={true}
            buttonText='OK'
            cookieName="cookie-message"
            containerClasses='cookie-container'
            contentClasses='cookie-content'
            ButtonComponent={Button}
            >
            SeatEat uses cookies to enhance the user experience. Unfortunately not as your dessert.
        </CookieConsent>
    );
}

export default CookieMessage;