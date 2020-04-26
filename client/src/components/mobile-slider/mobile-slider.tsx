import React, { FC } from 'react';
import './mobile-slider.css'
import LeftIcon from '../../assets/icons/dynamic/chevron-left-outline';
import RightIcon from '../../assets/icons/dynamic/chevron-right-outline';
import Button from '../button/button';

type MobileSliderProps = {
    onDecrease: () => void,
    onIncrease: () => void,
    disableDecrease?: boolean,
    disableIncrease?: boolean
}

const MobileSlider: FC<MobileSliderProps> = (props) => {
    return (        
        <div className='mobile-slider'>
            <Button noPadding disabled={props.disableDecrease} onClick={props.onDecrease}>
                <LeftIcon color={props.disableDecrease ? '#aaa' : ''}/>
            </Button>
            {props.children}
            <Button noPadding disabled={props.disableIncrease} onClick={props.onIncrease}>
                <RightIcon color={props.disableIncrease ? '#aaa' : ''}/>
            </Button>
        </div>
    );
}

export default MobileSlider;
