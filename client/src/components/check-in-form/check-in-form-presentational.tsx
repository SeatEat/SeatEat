import React, { FC, useState, useEffect } from "react";
import './check-in-form.css';

import Input from "../form/input/input";
import { ChapterHall } from "../../model/chapter-hall-model";
import Select from "../form/select/select";
import Button from "../button/button";
import { checkInActivities, CheckInActivityIDs } from "../../data/check-in-activities";

interface CheckInFormProps {
    currentChapter: ChapterHall | null,
    nameError: string | null,
    checkInOK: boolean,
    onNameInputChange: (value: string) => void
    onActivityInputChange: (value: CheckInActivityIDs) => void,
    onCancel: () => void,
    onSubmit: () => void,
}

const CheckInFormPresentational: FC<CheckInFormProps> = (props) => {

    return (
        <div>
            <h2>
                Check in to {props.currentChapter?.name}
            </h2>
            <br/>
            <Input
                errorText={props.nameError}
                placeholder='Full name'
                onInput={inputValue => props.onNameInputChange(inputValue)}/>
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
                onSelect={value => props.onActivityInputChange(value)}/>
            <div className="check-in-form-actions">
                <Button disabled={!props.checkInOK} onClick={() => props.onSubmit()}>
                    Check in
                </Button>
                <Button onClick={() => props.onCancel()}>
                    Cancel
                </Button>
            </div>
        </div>
    );
}

export default CheckInFormPresentational;