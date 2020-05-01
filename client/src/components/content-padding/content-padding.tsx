import React, { FC } from "react";
import './content-padding.css'

const ContentPadding: FC = (props) => {
    return <div className='content-padding'>
        {props.children}
    </div>
}

export default ContentPadding;