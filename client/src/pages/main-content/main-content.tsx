import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import './main-content.css'

import ViewNavbar from '../../components/view-navbar/view-navbar'
import CircularProgressIndicator from '../../components/circular-progress-indicator/circular-progress-indicator';
import CrowdDataSlider from '../../components/crowd-data-slider/crowd-data-slider-connect';
import ContentPadding from '../../components/content-padding';
import { useEffect } from 'react';

import 'rc-slider/assets/index.css';
import CrowdGraphConnect from '../../components/crowd-graph/crowd-graph-connect';
import { views } from '../../model/views-model';
import CrowdCurrent from '../../components/crowd-current/crowd-current';
import CheckInStatus from '../../components/check-in-status/check-in-status';

export interface MainContentStateProps {
    view: string,
    isLoading: boolean,
    loadingProgress: number,
    loadingStatus: string,
    estimationOfChapter: string | null,
}

export interface MainContentActionProps {
    onRequestEstimation: (nameOfChapter: string) => void
}

const MainContent: FC<MainContentActionProps & MainContentStateProps> = (props) => {
    const { nameOfChapter } = useParams();
    
    useEffect(() => {
        if (nameOfChapter) {
            props.onRequestEstimation(nameOfChapter);
        }
    }, [nameOfChapter]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [props.view])

    return (
        <div className="main-content-container">
                <div className="main-content">
                    <ContentPadding>
                        {
                            props.view === views.current.name
                            ?
                                <>  
                                    <div className="current-crowd-container">
                                        <CircularProgressIndicator
                                            dataKey={props.estimationOfChapter ?? ''}
                                            status={props.loadingStatus}
                                            renderContentWhileLoading={true}
                                            loadingIsDone={!props.isLoading}
                                            progress={props.loadingProgress}
                                            noPadding={true}>
                                            <CrowdCurrent/>
                                        </CircularProgressIndicator>
                                    </div>
                                    <br />
                                    <CheckInStatus/>
                                </>
                            :
                                <CircularProgressIndicator
                                    dataKey={props.estimationOfChapter ?? ''}
                                    status={props.loadingStatus}
                                    loadingIsDone={!props.isLoading}
                                    progress={props.loadingProgress}
                                    noPadding={false}>
                                    <div className="main-content-content">
                                        <div className="main-content-graph">
                                            <CrowdGraphConnect/>
                                        </div>
                                        <div className="main-content-slider">
                                            <CrowdDataSlider/>
                                        </div>
                                    </div>
                                </CircularProgressIndicator>
                        }
                    </ContentPadding>
                </div>
                <ViewNavbar/>
        </div>
    )
}

export default MainContent;