import React, { FC } from 'react';

const ChapterHallText: FC <{rate : number | undefined, chapterHall: string | Array<never>}> = (props) => {
    const crowdText = [" 0-20% full.", " 20-40% full.", " 40-60% full.", " 60-80% full.", " 80-100% full."]
    function getchapterHalltext(): string{
        if (props.rate == 1) {
            return crowdText[0];
        }
        else if (props.rate == 2) {
            return crowdText[1];
        }
        else if (props.rate == 3) {
            return crowdText[2];
        }
        else if (props.rate == 4) {
            return crowdText[3];
        }
        else if (props.rate == 5) {
            return crowdText[4];
        }
        return "";

    
    }
    return (
        <div>
           {props.chapterHall + " is estimated to be" + getchapterHalltext()}
        </div>
    );

}


export default ChapterHallText;