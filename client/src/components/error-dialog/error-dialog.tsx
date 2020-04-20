import React, { FC, useEffect, useState } from 'react';
import './error-dialog.css';
import { connect } from 'react-redux';
import { AppState } from '../../model/redux/store';
import { useDialogService } from '../dialog/dialog'
import ContentPadding from '../content-padding';
import Button from '../button/button';

interface ErrorDialogProps {
    appHasError: boolean,
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
        if (props.appHasError && !dialogIsOpen) {
            openErrorDialog();
            setDialogIsOpen(true);
        }
    }, [props.appHasError])

    return <></>;
}

function getAppErrorText(state: AppState): string {
    if (state.estimationState.loadingError !== "") {
        return state.estimationState.loadingError;
    }
    if (state.checkInState.userCheckedInError !== "") {
        return state.checkInState.userCheckedInError;
    }
    
    return "";
}

export default connect(
    (state: AppState): ErrorDialogProps => ({
        appHasError: getAppErrorText(state) !== "",
        errorText: getAppErrorText(state)
    })
)(ErrorDialog);