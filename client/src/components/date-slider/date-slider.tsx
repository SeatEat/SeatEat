import React, { FC, useEffect, useState, useRef } from "react";
import './date-slider.css';
import { SlideState } from "../../model/redux/crowdDataSliderState";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import DateSliderPresentational from "./date-slider-presentational";

export type DateSliderProps = {
    values: number[], 
    stepTextBuilder: (value: number) => string,
    onValueChange: (activeView: string, value: number) => void
    activeView: string,
    crowdDataSlideState: SlideState,
}

const DateSlider: FC<DateSliderProps> = (props) => {
    
    const windowDimensions = useWindowDimensions();
    const activeView = props.activeView;
    const defaultValue = props.crowdDataSlideState[props.activeView];
    const [activeValue, setActiveValue] = useState(defaultValue);
    const [disableChange, setDisableChange] = useState(false);
    const [onMobile, setOnMobile] = useState(false);

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

    useEffect(() => {
        setOnMobile(windowDimensions.width < 850);
    }, [windowDimensions.width]);

    const handleChange = (value: number) => {
        if(props.values.includes(value)) {
            setActiveValue(value);
        }
    };

    return <DateSliderPresentational
        activeValue={activeValue}
        activeView={activeView}
        handleChange={handleChange}
        onMobile={onMobile}
        stepTextBuilder={props.stepTextBuilder}
        values={props.values}
    />
}

export default DateSlider;