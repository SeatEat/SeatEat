import React, { FC } from "react";
import Button from "../button/button";

import './confirm-check-out.css';
import { requestUserCheckOut } from "../../model/redux/checkInState";
import { connect } from "react-redux";
import { Dispatch } from "../../model/redux/store";


interface ConfirmCheckOutDispatch {
    onSubmit: () => void
}

interface ConfirmCheckOutProps {
    currentChapterHall: string | null, 
    closeDialog: Function,
}

const ConfirmCheckOut: FC<ConfirmCheckOutProps & ConfirmCheckOutDispatch > = (props) => {

    const checkOut = () => {
        props.closeDialog();
        props.onSubmit()
    }

    return <div className="confirm-check-out-container">
        <h2>
            Are you sure you want to <br/> check out from {props.currentChapterHall}?
        </h2>
        <br/>
        <div className="check-out-button-container">
            <Button onClick={() => checkOut()}>
                    Yes
            </Button>
            <Button onClick={() => props.closeDialog()}>
                No
            </Button>
        </div>
    </div>
}

export default connect(
    null,
    (dispatch: Dispatch): ConfirmCheckOutDispatch => ({
        onSubmit: () => dispatch(requestUserCheckOut())
    })
)(ConfirmCheckOut);
