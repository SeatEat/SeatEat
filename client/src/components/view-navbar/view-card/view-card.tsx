import React, { FC } from "react";
import './view-card.css';
import { ViewInterface } from '../../../model/views'

type ViewCardProps = {
    view: ViewInterface,
    viewState: string,
    onClick: Function
}

const ViewCard: FC<ViewCardProps> = (props) => {
    return(
        <div className={`view-card ${props.viewState === props.view.name ? ' active' : ''}`} key={props.view.name} onClick={() => props.onClick(props.view.name)}>
            <img src={props.view.img} alt={props.view.name}/>
        </div>
    )
}

export default ViewCard;