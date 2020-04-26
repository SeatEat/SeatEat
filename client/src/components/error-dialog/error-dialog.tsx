import React, { FC, useEffect, useState } from 'react';
import './error-dialog.css';
import { connect } from 'react-redux';
import { AppState } from '../../model/redux/store';
import { useDialogService } from '../dialog/dialog'
import ContentPadding from '../content-padding';
import Button from '../button/button';
import ErrorTypes from '../../model/errorTypes';
import ErrorDialogPresentational from './error-dialog-presentational';

interface ErrorDialogProps {
    errorText: string
}

const ErrorDialog: FC<ErrorDialogProps> = (props) => {

    // We have a dialog state to prevent multiple dialogs
    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    useEffect(() => {
        if (props.errorText !== "" && !dialogIsOpen) {
            openErrorDialog();
            setDialogIsOpen(true);
        }
    }, [props.errorText])

    const confirm = useDialogService()
    const openErrorDialog = () => {
        confirm({
            content: (closeDialog) => (
                <ErrorDialogPresentational
                    errorText={props.errorText}
                    onCloseDialog={() => {
                        closeDialog();
                        setDialogIsOpen(true);
                    }}
                    onReloadSite={() => {
                        window.location.reload();
                    }}
                />
            )
        });
    }

    // This component do not return anything as it only renders
    // content in the dialog component
    return (null)
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