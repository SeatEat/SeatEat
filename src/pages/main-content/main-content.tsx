import React, { FC } from 'react';
import './main-content.css'

import ViewNavbar from '../../components/view-navbar/view-navbar'

type MainProps = {
    info: string, //temp, will probably be replaced with components
}

const MainContent: FC<MainProps> = (props) => {
    return (
        <div className="main-content-container">
            <div className="main-content">
                {props.info}
            </div>
            <ViewNavbar/>
        </div>
    )
}

export default MainContent;