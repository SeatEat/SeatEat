import React, { FC } from "react";
import { CrowdEstimationData } from "../../model/crowd-estimation-model";
import ChapterMap from "../chapter-map/chapter-map";

import blueprintDummey from '../../assets/blueprint/meta.png';

export type CrowdMapProps = {
    estimationData: CrowdEstimationData | null,
}

const CrowdMap: FC<CrowdMapProps> = (props) => {
    return <ChapterMap
        imgpath={blueprintDummey}
        rate={1}/>
}

export default CrowdMap;