import React, { FC, useEffect, useState } from 'react';
import './error-dialog.css';
import { connect } from 'react-redux';
import { AppState } from '../../model/redux/store';
import { useDialogService } from '../dialog/dialog'
import ContentPadding from '../content-padding/content-padding';
import Button from '../button/button';
import ErrorTypes from '../../model/errorTypes';

interface ErrorDialogProps {
    errorText: string
}

const ErrorDialog: FC<ErrorDialogProps> = (props) => {

    const [dialogIsOpen, setDialogIsOpen] = useState(false);

    const confirm = useDialogService()
    const openErrorDialog = () => {
        confirm({
            content: (closeDialog) => (<ContentPadding>
                <div className="error-bar">
                    <div className="error-bar-text">
                        <h3>Error: {props.errorText}</h3>
                    </div>
                    
                    <div className="error-bar-button">
                        <Button onClick={() => {
                            closeDialog();
                            setDialogIsOpen(false);
                        }}>
                            Close
                        </Button>
                        <Button onClick={() => {
                           window.location.reload();
                        }}>
                            Reload website
                        </Button>
                    </div>
                </div>
            </ContentPadding>)
        });
    }

    useEffect(() => {
        if (props.errorText !== "" && !dialogIsOpen) {
            openErrorDialog();
            setDialogIsOpen(true);
        }
    }, [props.errorText])

    return <></>;
}

function getErrorTextFromLoadingError(loadingError: number) {
    switch (loadingError) {
        case ErrorTypes.NO_INTERNET:
            return 'no internet connection'
        case ErrorTypes.API_NOT_FOUND:
            return 'API not found (404)'
        case ErrorTypes.INTERNAL_SERVER_ERROR:
            return 'Internal server error (500)'
        default:
            return 'Unknown error'
    }
}

function getAppErrorText(state: AppState): string {
    if (state.estimationState.loadingError !== null) {
        const activeChapterHall = state.estimationState.chapterHall?.name;
        return `Failed to fetch estimation for ${activeChapterHall}, ${getErrorTextFromLoadingError(state.estimationState.loadingError)}`;
    }
    
    if (state.checkInState.userCheckedInError !== null) {
        return `Failed to check in, ${getErrorTextFromLoadingError(state.checkInState.userCheckedInError)}`;
    }
    
    return "";
}

export default connect(
    (state: AppState): ErrorDialogProps => ({
        errorText: getAppErrorText(state)
    })
)(ErrorDialog);