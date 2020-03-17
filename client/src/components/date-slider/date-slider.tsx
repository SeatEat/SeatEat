import React, { FC, useEffect, useState, useRef } from "react";
import Slider from 'rc-slider';
import './date-slider.css';
import { SlideState } from "../../model/redux/crowdDataSliderState";

export type DateSliderProps = {
    values: number[], 
    stepTextBuilder: (arg0: number) => string,
    onValueChange: (activeView: string, value: number) => void
    activeView: string,
    crowdDataSlideState: SlideState,
}

const DateSlider: FC<DateSliderProps> = (props) => {

    const activeView = props.activeView;
    const defaultValue = props.crowdDataSlideState[props.activeView];
    const [activeValue, setActiveValue] = useState(defaultValue);
    const [disableChange, setDisableChange] = useState(false);

    function useDidUpdateEffect(fn: Function, inputs: any) {
        const didMountRef = useRef(false);
      
        useEffect(() => {
          if (didMountRef.current)
            fn();
          else
            didMountRef.current = true;
        }, inputs);
    }

    useDidUpdateEffect(() => {
        setDisableChange(true);
    }, [props.activeView]);

    useEffect(() => {
        setActiveValue(defaultValue);
    }, [defaultValue]);

    useEffect(() => {
        if(disableChange) {
            setDisableChange(false);
        } else{
            props.onValueChange(activeView, activeValue);
        }
    }, [activeValue]);

    const handleChange = (value: number) => {
        setActiveValue(value);
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