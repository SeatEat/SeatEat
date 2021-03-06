import React, { FC } from "react";
import './button.css';
import Clickable from "../clickable/clickable";

interface ButtonProps {
    onClick: Function,
    isCompact?: boolean,
    disabled?: boolean,
    noPadding?: boolean
}

const Button: FC<ButtonProps> = (props) => {
    return <Clickable disabled={props.disabled ?? false}>
        <div 
            onClick={() => {
                if (!props.disabled) {
                    props.onClick();
                }
            }} 
            className={
                `button 
                ${props.isCompact ? 'button-compact' : ''}
                ${props.disabled ? 'button-disabled' : ''}
                ${props.noPadding ? 'button-no-padding' : ''}`}>
            {props.children}
        </div>
    </Clickable>
}

export default Button;