import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import './main-content.css'

import ViewNavbar from '../../components/view-navbar/view-navbar'

type MainProps = {
    //todo
}

const MainContent: FC<MainProps> = (props) => {
    const { nameOfChapter } = useParams();
    return (
        <div className="main-content-container">
            <div className="main-content">
                {nameOfChapter ? nameOfChapter : "this is the main content"} 
            </div>
            <ViewNavbar/>
        </div>
    )
}

export default MainContent;