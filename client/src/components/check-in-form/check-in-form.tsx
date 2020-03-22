import React, { FC, useState, useEffect } from "react";
import Input from "../form/input/input";
import { ChapterHall } from "../../model/chapter-hall-model";
import Select from "../form/select/select";
import Button from "../button/button";
import { checkInReasons } from "../check-in-status/check-in-status";

import './check-in-form.css';

const CheckInForm: FC<{currentChapter: ChapterHall | null, closeDialog: Function}> = (props) => {

    const [nameError, setNameError] = useState<string | null>(null);
    const [checkInOK, setCheckInOK] = useState<boolean>(false);

    const [nameValue, setNameValue] = useState<string>('');

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
            options={Object.values(checkInReasons).map(checkInReason => {
                return {
                    icon: checkInReason.logo, 
                    text: checkInReason.title,
                    value: checkInReason.id
                }
            })}
            onSelect={option => {
                console.log(option);
            }}/>
        <div className="check-in-form-actions">
            <Button disabled={!checkInOK} onClick={() => {
                if (checkInOK) {
                    props.closeDialog()
                }
            }}>
                Check in
            </Button>
            <Button onClick={() => props.closeDialog()}>
                Cancel
            </Button>
        </div>
    </div>
}

export default CheckInForm;