import CrowdEstimationModel, { CrowdEstimationData } from "../crowd-estimation-model";
import { ChapterHall } from "../chapter-hall-model";
import { Dispatch } from "react";
import { AppState } from "./store";
import { updateSlideValue } from "./crowdDataSliderState";

export interface EstimationState {
    isLoading: boolean,
    loadingProgress: number,
    loadingError: string,
    chapterHall: ChapterHall | null,
    estimationData: CrowdEstimationData | null,
    status: string
}
const initialState: EstimationState = {
    isLoading: true,
    loadingProgress: 0,
    loadingError: "",
    chapterHall: null,
    estimationData: null,
    status: ""
}

export enum EstimationActionTypes {
    UPDATE_LOADING_PROGRESS = "UPDATE_LOADING_PROGRESS",
    REQUEST_ESTIMATION = "REQUEST_ESTIMATION",
    SET_ESTIMATION_ERROR = "SET_ESTIMATION_ERROR",
    SET_ESTIMATION_DATA = "SET_ESTIMATION_DATA",
}

let cancelLastEstimation: Function;

// Start estimation request
export interface RequestEstimationAction {
    type: EstimationActionTypes.REQUEST_ESTIMATION,
    payload: ChapterHall
}
function startRequest(chapterHall: ChapterHall): RequestEstimationAction {
    return {
        type: EstimationActionTypes.REQUEST_ESTIMATION,
        payload: chapterHall,
    }
}

// Update loading progress action
interface UpdateLoadingProgressAction {
    type: EstimationActionTypes.UPDATE_LOADING_PROGRESS,
    payload: {
        progress: number,
        statusText: string
    }

}
function updateProgress(progress: number, status: string): UpdateLoadingProgressAction {
    return {
        type: EstimationActionTypes.UPDATE_LOADING_PROGRESS,
        payload: {
            progress: progress, 
            statusText: status
        }
    }
}

// Set info about error
interface SetEstimationErrorAction {
    type: EstimationActionTypes.SET_ESTIMATION_ERROR,
    payload: string
}
function setEstimationError(errorText: string): SetEstimationErrorAction {
    return {
        type: EstimationActionTypes.SET_ESTIMATION_ERROR,
        payload: errorText
    }
}

// Set data
interface SetEstimationDataAction {
    type: EstimationActionTypes.SET_ESTIMATION_DATA,
    payload: CrowdEstimationData
}
function setEstimationData(data: CrowdEstimationData): SetEstimationDataAction {
    return {
        type: EstimationActionTypes.SET_ESTIMATION_DATA,
        payload: data
    }
}

export function requestEstimation(chapterHall: ChapterHall) {

    return (dispatch: Dispatch<any>, getState: () => AppState) => {

        // We do not want the last estimation to keep going if 
        // a new estimation request is requested
        if (cancelLastEstimation) {
            cancelLastEstimation();
        }

        dispatch(startRequest(chapterHall));

        CrowdEstimationModel.estimateChapterCrowdedness(
            new Date(),
            chapterHall.chapters,
            (prog, status) => {
                dispatch(updateProgress(prog, status))
            },
            (cancelCallback) => {
                cancelLastEstimation = cancelCallback;
            }
        ).then((data: CrowdEstimationData | null) => {
            if (data) {

                // Prevent the graph slider overflow the number of days the estimation has
                let slideDailyValue = getState().crowdDataSlideState['daily'];
                if (slideDailyValue >= data.daysOfEstimation) {
                    dispatch(updateSlideValue('daily', data.daysOfEstimation - 1));
                }

                dispatch(setEstimationData(data));
            }
        }).catch((response: Response) => {
            dispatch(setEstimationError('Estimation failed to load'));
        });
    }
}

export type EstimationActions =
    RequestEstimationAction |
    UpdateLoadingProgressAction |
    SetEstimationErrorAction |
    SetEstimationDataAction

export function estmiationReducer(
    state = initialState,
    action: EstimationActions
): EstimationState {
    switch (action.type) {
        case EstimationActionTypes.REQUEST_ESTIMATION:
            return {
                ...state,
                isLoading: true,
                loadingProgress: 0,
                chapterHall: action.payload
            }
        case EstimationActionTypes.UPDATE_LOADING_PROGRESS:
            return {
                ...state,
                loadingProgress: action.payload.progress,
                status: action.payload.statusText
            }
        case EstimationActionTypes.SET_ESTIMATION_DATA:
            return {
                ...state,
                estimationData: action.payload,
                isLoading: false,
                loadingProgress: 1
            }
        case EstimationActionTypes.SET_ESTIMATION_ERROR:
            return {
                ...state,
                loadingError: action.payload,
                isLoading: false,
                loadingProgress: 1
            }
        default:
            return state
    }
}