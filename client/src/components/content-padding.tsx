import React, { FC } from "react";

const ContentPadding: FC = (props) => {
    return <div style={{padding: '15px', boxSizing: 'border-box'}}>
        {props.children}
    </div>
}

export default ContentPadding;