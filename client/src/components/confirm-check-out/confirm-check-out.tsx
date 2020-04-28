import React, { FC } from "react";

import './confirm-check-out.css';
import { requestUserCheckOut } from "../../model/redux/checkInState";
import { connect } from "react-redux";
import { Dispatch } from "../../model/redux/store";
import ConfirmCheckOutPresentational from "./confirm-check-out-presentational";

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

    return <ConfirmCheckOutPresentational
                currentChapterHall={props.currentChapterHall}
                onSubmit={() => checkOut()}
                onCancel={() => props.closeDialog()}
                />
}

export default connect(
    null,
    (dispatch: Dispatch): ConfirmCheckOutDispatch => ({
        onSubmit: () => dispatch(requestUserCheckOut())
    })
)(ConfirmCheckOut);
