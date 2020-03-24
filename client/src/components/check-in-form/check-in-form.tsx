import React, { FC, useState, useEffect } from "react";
import Input from "../form/input/input";
import { ChapterHall } from "../../model/chapter-hall-model";
import Select from "../form/select/select";
import Button from "../button/button";

import './check-in-form.css';
import { requestUserCheckIn } from "../../model/redux/checkInState";
import { connect } from "react-redux";
import { Dispatch } from "../../model/redux/store";
import { checkInActivities, CheckInActivityIDs } from "../../data/check-in-activities";

interface CheckInFormDispatch {
    onSubmit: (name: string, type: CheckInActivityIDs) => void
}

interface CheckInFormProps {
    currentChapter: ChapterHall | null, 
    closeDialog: Function
}

const CheckInForm: FC<CheckInFormProps & CheckInFormDispatch> = (props) => {

    const [nameError, setNameError] = useState<string | null>(null);
    const [checkInOK, setCheckInOK] = useState<boolean>(false);
    const [nameValue, setNameValue] = useState<string>('');
    const [typeValue, setTypeValue] = useState<CheckInActivityIDs>('food');

    useEffect(() => {
        if (nameError === null && nameValue !== '') {
            setCheckInOK(true);
        }
        else {
            setCheckInOK(false);
        }
    }, [nameError])

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

    return <div>
        <h2>
            Check in to {props.currentChapter?.name}
        </h2>
        <br/>
        <Input
            errorText={nameError}
            placeholder='Full name'
            onInput={inputValue => {
                setNameValue(inputValue);
                checkForNameErrors(inputValue);
            }}/>
        <br/>
        <Select
            errorText={null}
            placeholder='Activity'
            options={checkInActivities.map(checkInReason => {
                return {
                    icon: checkInReason.logo, 
                    text: checkInReason.title,
                    value: checkInReason.id
                }
            })}
            onSelect={value => {
                setTypeValue(value)
            }}/>
        <div className="check-in-form-actions">
            <Button disabled={!checkInOK} onClick={() => tryCheckIn()}>
                Check in
            </Button>
            <Button onClick={() => props.closeDialog()}>
                Cancel
            </Button>
        </div>
    </div>
}

export default connect(
    null,
    (dispatch: Dispatch): CheckInFormDispatch => ({
        onSubmit: (name, type) => dispatch(requestUserCheckIn(name, type))
    })
)(CheckInForm);
