import React, { FC } from "react";
import './circular-progress-indicator.css';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { ChapterHall } from '../../model/chapter-hall-model';

type CircularProgressIndicatorProps = {
    // Denna component behöver loadingIsDone samt progress
    progress: number,
    loadingIsDone: boolean,
    status: string,

    // Om man skriver med frågetecken så betyder det att den är "optional"
    // Det kanske räcker med att bara ge namn, alltså ´string´? Eller behöver vi all data från ChapterHall?
    activeChapterHallName?: string
}

const CircularProgressIndicator: FC<CircularProgressIndicatorProps> = (props) => {
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
            <br/>
            {/* Här skriver vi bara ut information om vi har någon data från props.activeChapterHall */}
            {
                props.activeChapterHallName
                ? <div>{props.status}</div>
                : <></> // Detta betyder ett tomt html object, kommer inte synas på sidan
            }
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