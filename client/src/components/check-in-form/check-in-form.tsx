import React, { FC, useState, useEffect } from "react";
import './check-in-form.css';

import { ChapterHall } from "../../model/chapter-hall-model";
import { requestUserCheckIn } from "../../model/redux/checkInState";
import { connect } from "react-redux";
import { Dispatch } from "../../model/redux/store";
import { CheckInActivityIDs } from "../../data/check-in-activities";
import CheckInFormPresentational from "./check-in-form-presentational";

interface CheckInFormDispatch {
    onSubmit: (name: string, type: CheckInActivityIDs) => void
}

interface CheckInFormProps {
    currentChapter: ChapterHall | null, 
    closeDialog: Function,
}

const CheckInForm: FC<CheckInFormProps & CheckInFormDispatch> = (props) => {

    const [nameError, setNameError] = useState<string | null>(null);
    const [checkInOK, setCheckInOK] = useState<boolean>(false);
    const [nameValue, setNameValue] = useState<string>('');
    const [typeValue, setTypeValue] = useState<CheckInActivityIDs>('food');
    const [checkedInPressed, setCheckedInPressed] = useState(false);

    useEffect(() => {
        if (nameError === null && nameValue !== '') {
            setCheckInOK(true);
        }
        else {
            setCheckInOK(false);
        }
    }, [nameError, nameValue])

    const checkForNameErrors = (value: string) => {
        let nameError = null;

        // Check for numbers
        if (value.match(/\d+/g) !== null) {
            nameError = 'Full name can not include numbers';
        }

        if (value.split(' ').length < 2) {
            nameError = 'Full name must include first and last name';
        }
        
        if (value.length > 30) {
            nameError = 'Name is to long';
        }

        setNameError(nameError);
    }

    const tryCheckIn = () => {
        if (!checkInOK) {
            return;
        }
        props.closeDialog();
        props.onSubmit(nameValue, typeValue)
    }

    return <CheckInFormPresentational
        checkInOK={checkInOK}
        userCheckedIn={checkedInPressed}
        currentChapter={props.currentChapter}
        nameError={nameError}
        onNameInputChange={(inputValue) => {
            setNameValue(inputValue);
            checkForNameErrors(inputValue);
        }}
        onActivityInputChange={(value) => setTypeValue(value)}
        onSubmit={() => {
            tryCheckIn();
            setCheckedInPressed(true);
        }}
        onCancel={() => props.closeDialog()}
    />
}

export default connect(
    null,
    (dispatch: Dispatch): CheckInFormDispatch => ({
        onSubmit: (name, type) => dispatch(requestUserCheckIn(name, type))
    })
)(CheckInForm);
