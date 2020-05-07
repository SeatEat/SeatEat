import React, { FC } from 'react';
import './date-slider.css';
import Slider from 'rc-slider';
import MobileSlider from "../mobile-slider/mobile-slider";

interface DateSliderPresentationalProps {
    activeValue: number,
    onMobile: boolean,
    values: number[],
    activeView: string,
    handleChange: (value: number) => void
    stepTextBuilder: (value: number) => string,
}

const DateSliderPresentational: FC<DateSliderPresentationalProps> = (props) => {

    const generateStepElement = (value: number, text: string) => {
        return (
            <div className={'date-slider-text ' + (value === props.activeValue ? 'date-slider-text-active' : '')}>
                {text}
            </div>
        );
    }

    const mobileSlider = (
        <MobileSlider 
            disableDecrease={props.activeValue === Math.min(...props.values)} 
            disableIncrease={props.activeValue === Math.max(...props.values)} 
            onDecrease={() => props.handleChange(props.activeValue-1)} 
            onIncrease={() => props.handleChange(props.activeValue+1)}> 
            {generateStepElement(props.activeValue, props.stepTextBuilder(props.activeValue))}
        </MobileSlider>
    )

    return ( 
        <div className="date-slider"> {props.onMobile ? mobileSlider :
            <Slider
                railStyle={{
                    backgroundColor: 'var(--theme-color-green)'
                }}
                trackStyle={{
                    backgroundColor: 'rgba(0, 0, 0, 0)'
                }}
                dotStyle={{
                    borderColor: 'var(--theme-color-blue-dark)',
                    backgroundColor: 'var(--theme-color-blue-dark)'
                }}
                handleStyle={{
                    animation: 'pulsing',
                    animationDuration: '1s',
                    animationIterationCount: 'infinite',
                    backgroundColor: 'var(--theme-color-yellow)',
                    borderColor: 'var(--theme-color-yellow)',
                    boxShadow: 'none'
                }}
                min={Math.min(...props.values)} 
                max={Math.max(...props.values)}
                marks={props.values.reduce(
                    // eslint-disable-next-line no-sequences
                    (a: any, b: number) => (a[b] = generateStepElement(b, props.stepTextBuilder(b)), a),
                {})}
                value={props.activeValue}
                onChange={props.handleChange} />}
            </div>);

}

export default DateSliderPresentational;
