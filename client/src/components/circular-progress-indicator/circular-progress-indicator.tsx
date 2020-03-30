import React, { FC } from "react";
import './circular-progress-indicator.css';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CircularProgressIndicator: FC<{progress: number, loadingIsDone: boolean}> = (props) => {

    return <div className="circular-progress-indicator">
        <div className={"circular-progress-indicator-loading " + (props.loadingIsDone ? "loading-done" : "")}>
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
        </div>
        {
            props.loadingIsDone
            ?
                <div className="circular-progress-indicator-done-loading">
                    {props.children}
                </div>
            : <></>
        }
    </div>
}

export default CircularProgressIndicator;