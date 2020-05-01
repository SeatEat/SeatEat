import React, { FC, useState } from 'react';
import Button from '../button/button';
import './banner.css';

const Banner: FC = () => {
    const [hideBanner, setHideBanner] = useState<boolean>(false);
    if(!hideBanner) {
        return (
            <div className='banner-container'>
                <div className='banner-content'>
                    <span> Due to COVID-19 students can't access KTH's facilities right now. This is not taken into consideration when estimating the business of the chapter halls and the estimations may therefore not be accurate. Stay safe!</span>
                    <div className='banner-button'>
                        <Button noPadding={true} onClick={() => setHideBanner(true)}><div className='button-content'>X</div></Button>
                    </div>
                </div>
            </div>
        );}
    else {
        return <div className='banner-mobile-padding'></div>
    }
}

export default Banner;