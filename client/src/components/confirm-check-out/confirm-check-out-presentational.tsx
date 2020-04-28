import React, { FC } from "react";
import Button from "../button/button";

import './confirm-check-out.css';

interface ConfirmCheckOutProps {
    currentChapterHall: string | null,
    onCancel: () => void,
    onSubmit: () => void,
}

const ConfirmCheckOutPresentational: FC<ConfirmCheckOutProps> = (props) => {

    return <div className="confirm-check-out-container">
        <h2>
            Are you sure you want to <br/> check out from {props.currentChapterHall}?
        </h2>
        <br/>
        <div className="check-out-button-container">
            <Button onClick={props.onSubmit}>
                    Yes
            </Button>
            <Button onClick={props.onCancel}>
                No
            </Button>
        </div>
    </div>
}

export default ConfirmCheckOutPresentational;
