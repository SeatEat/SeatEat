import React, { FC, useState } from "react";
import './input.css';
import InputShell from "../input-shell/input-shell";

interface InputProps {
    placeholder: string,
    errorText: string | null,
    onInput: (text: string) => void,
}

const Input: FC<InputProps> = (props) => {

    const [isFocused, setIsFocused] = useState(false);
    const [currentValue, setCurrentValue] = useState('');

    const onValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentValue(event.currentTarget.value);
    }

    return <InputShell 
        errorText={props.errorText} 
        placeholder={props.placeholder} 
        isFocused={isFocused}
        hasValue={currentValue !== ''}>
        <input
            value={currentValue}
            onChange={onValueChange}
            onBlur={() => setIsFocused(false)}
            onFocus={() => setIsFocused(true)}
            className="input" 
            type="text"
            placeholder={props.placeholder}/>
    </InputShell>
}

export default Input;