import React, { FC } from 'react';
import './mobile-slider.css'
import LeftIcon from '../../assets/icons/chevron-left-outline.svg';
import RightIcon from '../../assets/icons/chevron-right-outline.svg';

type MobileSliderProps = {
    onDecrease: () => void,
    onIncrease: () => void,
    disableDecrease?: boolean,
    disableIncrease?: boolean
}

const MobileSlider: FC<MobileSliderProps> = (props) => {
    return (        
        <div className='mobile-slider'>
            <img className={`${props.disableDecrease ? 'disabled' : ''}`} src={LeftIcon} onClick={props.onDecrease}/>
            {props.children}
            <img className={`${props.disableIncrease ? 'disabled' : ''}`} src={RightIcon} onClick={props.onIncrease}/>
        </div>
    );
}

export default MobileSlider;
