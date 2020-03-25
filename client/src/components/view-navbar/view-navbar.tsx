import React, { FC } from "react";
import './view-navbar.css';

import ViewCardConnect from './view-card/view-card-connect'
import { views } from '../../model/views-model'

const ViewNavbar: FC = (props) => {
    return <div className="view-navbar">
        {Object.values(views).map(view =>
            <ViewCardConnect key={view.name} viewData={view} />
        )}
    </div>
}

export default ViewNavbar;