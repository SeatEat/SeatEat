import React, { FC, useState } from "react";
import './select.css';
import InputShell from "../input-shell/input-shell";

import ExpandDown from '../../../assets/icons/expand-down.svg';
import ExpandUp from '../../../assets/icons/expand-up.svg';

export interface SelectOption {
    value: string,
    text: string,
    icon: string
}

interface SelectProps {
    options: SelectOption[],
    placeholder: string,
    errorText: string | null,
    onSelect: (option: SelectOption) => void,
}

const Select: FC<SelectProps> = (props) => {

    const [currentValue, setCurrentValue] = useState(props.options[0]);
    const [isExpanded, setIsExpanded] = useState(false);

    const onValueChange = (option: SelectOption) => {
        setCurrentValue(option);
        props.onSelect(option);
    }

    const generateSelectOption = (option: SelectOption): React.ReactNode => {
        return <div
            key={option.value}
            className={`select-option ${option === currentValue ? 'selected' : ''}`}
            onClick={() => onValueChange(option)}>
            <div className="select-option-icon">
                <img src={option.icon} alt=""/>
            </div>
            <div className="select-option-text">
                {option.text}
            </div>
        </div>
    }

    return <InputShell 
        errorText={props.errorText} 
        placeholder={props.placeholder} 
        isFocused={false}
        hasValue={true}>
        <div onClick={() => setIsExpanded(!isExpanded)} className="select-container">
            <div className="select-selected-value">
                {generateSelectOption(currentValue)}
            </div>
            <div className="select-expand-button">
                {
                    isExpanded
                    ? <img src={ExpandUp} alt=""/>
                    : <img src={ExpandDown} alt=""/>
                }
            </div>
            <div className={`select-option-list ${isExpanded ? 'active' : ''}`}>
                {
                    props.options.map((option) => {
                        return generateSelectOption(option)
                    })
                }
            </div>
        </div>
    </InputShell>
}

export default Select;