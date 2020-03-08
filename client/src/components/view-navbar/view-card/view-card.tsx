import React, { FC } from "react";
import './view-card.css';
import { ViewData } from "../../../model/views";

export type ViewCardStateProps = {
    view: ViewData,
    viewState: string,
}

export type ViewCardActionProps = {
    onClick: (activeView: string) => void
}

const ViewCard: FC<ViewCardStateProps & ViewCardActionProps> = (props) => {
    return(
        <div className={
                `view-card ${props.viewState === props.view.name ? ' active' : ''}`
            } 
            key={props.view.name} 
            onClick={() => props.onClick(props.view.name)}>
            <img src={props.view.img} alt={props.view.name}/>
        </div>
    )
}

export default ViewCard;