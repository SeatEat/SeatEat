import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './main-content.css'

import ViewNavbar from '../../components/view-navbar/view-navbar'
import CircularProgressIndicator from '../../components/circular-progress-indicator/circular-progress-indicator';
import CrowdEstimationModel from '../../model/crowd-estimation-model';

type MainProps = {
    //todo
}

const MainContent: FC<MainProps> = (props) => {

    // The logic code is just for testing
    const [estimationLoadingProgress, setEstimationLoadingProgress] = useState(0);
    const [loadingFinished, setLoadinFinished] = useState(false);

    useEffect(() => {
        CrowdEstimationModel.estimateChapterCrowdedness(
            new Date(),
            [
                {
                    averageAmount: 80,
                    code: "CMETE"
                },
                {
                    averageAmount: 180,
                    code: "CDATE"
                },
            ],
            (prog) => setEstimationLoadingProgress(Math.floor(prog * 100))
        ).then((result) => {
            console.log(result);
            setLoadinFinished(true)
        });
    }, []);

    const { nameOfChapter } = useParams();
    return (
        <div className="main-content-container">
            <div className="main-content">
                <CircularProgressIndicator loadingIsDone={loadingFinished} progress={estimationLoadingProgress}>
                    {nameOfChapter ? nameOfChapter : "this is the main content"} 
                </CircularProgressIndicator>
            </div>
            <ViewNavbar/>
        </div>
    )
}

export default MainContent;