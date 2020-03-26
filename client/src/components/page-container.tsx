import React, { FC } from "react";

const PageContainer: FC = (props) => {
    return <div style={{
            display: 'flex', 
            flexDirection: 'column',
            height: '100%',
            width: '100%'
        }}>
            <div style={{
                position: 'relative',
                flex: 8,
            }}>
                {props.children}
            </div>
    </div>
}

export default PageContainer;