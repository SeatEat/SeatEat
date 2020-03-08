import React, { FC, useEffect, useState } from "react";
import Slider from 'rc-slider';
import './date-slider.css';

export type DateSliderProps = {
    values: number[], 
    stepTextBuilder: (arg0: number) => string,
    onValueChange: (value: number) => void
}

const DateSlider: FC<DateSliderProps> = (props) => {

    const defaultValue = props.values[0];
    const [activeValue, setActiveCalue] = useState(defaultValue)

    useEffect(() => {
        setActiveCalue(defaultValue);
    }, [defaultValue]);

    const handleChange = (value: number) => {
        props.onValueChange(value);
        setActiveCalue(value);
    };

    const generateStepElement = (value: number, text: string) => {
        return (
            <div className={'date-slider-text ' + (value === activeValue ? 'date-slider-text-active' : '')}>
                {text}
            </div>
        );
    }

    return <div className="date-slider">
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
                (a: any, b: number) => (a[b] = generateStepElement(b, props.stepTextBuilder(b)), a),
            {})}
            value={activeValue}
            onChange={handleChange} />
    </div>
}

export default DateSlider;