import React, { FC } from 'react';
import './center-content.css';

const CenterContent: FC = (props) => {

    return (
        <div className="center-content">
            {props.children}
        </div>
    );
}

export default CenterContent;
