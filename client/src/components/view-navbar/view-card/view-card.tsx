import React, { FC } from "react";
import './view-card.css';
import { ViewData } from "../../../model/views-model";

export type ViewCardStateProps = {
    view: ViewData,
    viewState: string,
}

export type ViewCardActionProps = {
    onClick: (activeView: string) => void
}

const ViewCard: FC<ViewCardStateProps & ViewCardActionProps> = (props) => {
    return (
        <div className={
            `view-card ${props.viewState === props.view.name ? ' active' : ''}`
        }
            key={props.view.name}
            onClick={() => props.onClick(props.view.name)}>
            <table>
                <tr>
                    <td>
                        <img src={props.view.img} alt={props.view.name} />
                    </td>
                    <td>
                        <div className="view-card-title">
                            {props.view.title}
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    )
}

export default ViewCard;