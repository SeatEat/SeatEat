import React, { FC } from "react";
import './view-card-description.css';
import ContentPadding from "../content-padding";

interface ViewCardDescriptionProps {
    icon: string,
    title: string,
    description: string,
}
const ViewCardDescription: FC<ViewCardDescriptionProps> = (props) => {
    return <div className="view-card-description">
        <ContentPadding>
            <div className="view-card-description-title">
                {props.title}
            </div>
            <div className="view-card-description-description">
                {props.description}
            </div>
            <img 
                className="view-card-description-icon" 
                src={props.icon} 
                alt={props.title}/>
        </ContentPadding>
    </div>
}

export default ViewCardDescription;