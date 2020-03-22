import React, { FC } from "react";
import { CrowdEstimationData } from "../../model/crowd-estimation-model";
import ChapterLogos from "../chapter-hall-logo/chapter-hall-logo";

import { ChapterHall } from "../../model/chapter-hall-model";

export type CrowdMapProps = {
    estimationData: CrowdEstimationData | null,
    chapterHall: ChapterHall | null
}

const CrowdMap: FC<CrowdMapProps> = (props) => {
    return <ChapterLogos
        logos={props.chapterHall?.logos}
        name={props.chapterHall?.name}
        rate={props.estimationData?.getCurrentCrowdedness()}/>
}

export default CrowdMap;