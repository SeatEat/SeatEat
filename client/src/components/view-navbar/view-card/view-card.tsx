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
    return (
        <div className={
            `view-card ${props.viewState === props.view.name ? ' active' : ''}`
        }
            key={props.view.name}
            onClick={() => props.onClick(props.view.name)}>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24">
                                <path d={props.view.svgPath}/>
                            </svg>
                        </td>
                        <td>
                            <div className="view-card-title">
                                {props.view.title}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ViewCard;