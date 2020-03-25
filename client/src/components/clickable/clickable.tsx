import React, { FC } from "react";
import './clickable.css';

const Clickable: FC<{disabled: boolean}> = (props) => {
    return <div className={!props.disabled ? 'clickable' : ''}>
        {props.children}
    </div>
}

export default Clickable;