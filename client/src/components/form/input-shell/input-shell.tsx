import React, { FC, useState } from "react";
import './input-shell.css';

interface InputShellProps {
    placeholder: string,
    errorText: string | null,
    hasValue: boolean,
    isFocused: boolean,
}

const InputShell: FC<InputShellProps> = (props) => {

    return <div className="input-shell-content-wrapper">
        <div className="input-shell-container">
            <div className={`input-shell-description ${props.hasValue ? 'active' : ''}`}>
                {props.placeholder}
            </div>
            {props.children}
        </div>
        <div className="input-shell-border">
            <div className={`input-shell-border-focus ${props.isFocused ? 'active' : ''}`}></div>
            <div className="input-shell-border-error"></div>
        </div>
    </div>
}

export default InputShell;