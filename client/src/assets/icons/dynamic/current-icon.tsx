import React from "react";
import { views } from "../../../model/views-model";

const CurrentIcon = (props: {className?: string}) => {
    return <svg
            className={props.className ?? ''}
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24">
                <path d={views.current.svgPath}/>
        </svg>
}

export default CurrentIcon;