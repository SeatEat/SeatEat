import React, { FC } from "react";
import './view-navbar.css';

import ViewCardConnect from './view-card/view-card-connect'
import { views } from '../../model/views'

const ViewNavbar: FC = (props) => {
    return <div className="view-navbar">
        {views.map(view =>
            <ViewCardConnect key={view.name} view={view} />
        )}
    </div>
}

export default ViewNavbar;