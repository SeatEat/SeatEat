import React, { FC, useEffect, useState } from "react";
import './circular-progress-indicator.css';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { ChapterHall } from '../../model/chapter-hall-model';

type CircularProgressIndicatorProps = {
    progress: number,
    loadingIsDone: boolean,
    status: string,
    noPadding: boolean
    renderContentWhileLoading?: boolean,
    dataKey: string
}

const CircularProgressIndicator: FC<CircularProgressIndicatorProps> = (props) => {
    const [alreadyLoaded, setAlreadyLoaded] = useState(false);
    const [displayNone, setDisplayNone] = useState(false);
    useEffect(() => {
        setAlreadyLoaded(props.loadingIsDone);
        setDisplayNone(false);
    }, [props.dataKey]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDisplayNone(true)
          }, 1000);
          return () => clearTimeout(timer);
    }, [props.loadingIsDone])

    return <div className="circular-progress-indicator">
        <div className={`circular-progress-indicator-loading ${props.loadingIsDone ? "loading-done" : ""} ${props.noPadding ? "no-padding" : ""} ${displayNone ? 'display-none' : ''}`}>
            <div className="circular-progress-indicator-loading-item">
                <CircularProgressbar 
                    value={props.progress} 
                    text={props.progress + '%'}
                    styles={
                        buildStyles({
                            pathTransitionDuration: 0.5,
                            textColor: 'var(--theme-text-dark)',
                            pathColor: 'var(--theme-color-green)',
                            trailColor: 'var(--theme-color-yellow)',
                            backgroundColor: '#3e98c7',
                        })
                    }
                    />
            </div>
            <br/>
            {
                props.status
                ? <div>{props.status}</div>
                : <></>
            }
        </div>
        {
            props.loadingIsDone || props.renderContentWhileLoading
            ?
                <div className={
                    `
                        circular-progress-indicator-done-loading 
                        ${props.loadingIsDone ? 'circular-progress-indicator-done-loading-animation' : ''}
                        ${alreadyLoaded ? 'circular-progress-indicator-done-loading-animation-cancel' : ''}
                    `
                    }>
                    {props.children}
                </div>
            : <></>
        }
    </div>
}

export default CircularProgressIndicator;