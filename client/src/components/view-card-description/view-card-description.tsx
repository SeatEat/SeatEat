import React, { FC } from "react";
import './view-card-description.css';
import ContentPadding from "../content-padding/content-padding";

interface ViewCardDescriptionProps {
    icon: React.ReactNode,
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
            <div className="view-card-description-icon">
                {props.icon}
            </div>
        </ContentPadding>
    </div>
}

export default ViewCardDescription;