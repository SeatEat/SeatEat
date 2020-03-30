import React, { FC } from "react";
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
                {
                    props.errorText === null
                    ? props.placeholder
                    : <div className="input-shell-error-text">{props.errorText}</div>
                }
            </div>
            {props.children}
        </div>
        <div className="input-shell-border">
            <div className={`input-shell-border-focus ${props.isFocused ? 'active' : ''}`}></div>
            <div className={`input-shell-border-error ${props.errorText !== null ? 'active' : ''}`}></div>
        </div>
    </div>
}

export default InputShell;