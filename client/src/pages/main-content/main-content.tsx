import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import './main-content.css'

import ViewNavbar from '../../components/view-navbar/view-navbar'
import { CrowdEstimationData } from '../../model/crowd-estimation-model';
import CircularProgressIndicator from '../../components/circular-progress-indicator/circular-progress-indicator';
import BarGraph from '../../components/bar-graph/bar-graph';
import CrowdDataSlider from '../../components/crowd-data-slider/crowd-data-slider-connect';
import ContentPadding from '../../components/content-padding';
import { useEffect } from 'react';

import 'rc-slider/assets/index.css';
import CrowdGraphConnect from '../../components/crowd-graph/crowd-graph-connect';
import { views } from '../../model/views';
import CrowdMapConnect from '../../components/crowd-map/crowd-map-connect';
import CheckInStatus from '../../components/check-in-status/check-in-status';

export interface MainContentStateProps {
    view: string,
    isLoading: boolean,
    loadingProgress: number,
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
                    <CircularProgressIndicator
                        loadingIsDone={!props.isLoading}
                        progress={props.loadingProgress}>
                        <ContentPadding>
                            {
                                props.view === views.current.name
                                ?
                                    <CheckInStatus/>
                                :
                                    <div className="main-content-content">
                                        <div className="main-content-graph">
                                            <CrowdGraphConnect/>
                                        </div>
                                        <div className="main-content-slider">
                                            <CrowdDataSlider/>
                                        </div>
                                    </div>
                            }
                        </ContentPadding>
                    </CircularProgressIndicator>
                </div>
                <ViewNavbar/>
        </div>
    )
}

export default MainContent;