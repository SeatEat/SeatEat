import React, { FC, useEffect, useState } from 'react';
import './error-dialog.css';
import ContentPadding from '../content-padding';
import Button from '../button/button';

interface ErrorDialogProps {
    errorText: string,
    onCloseDialog: () => void,
    onReloadSite: () => void
}

const ErrorDialogPresentational: FC<ErrorDialogProps> = (props) => {
    return (
        <ContentPadding>
            <div className="error-bar">
                <div className="error-bar-text">
                    <h3>Error: {props.errorText}</h3>
                </div>
                <div className="error-bar-button">
                    <Button onClick={() => props.onCloseDialog()}>
                        Close
                    </Button>
                    <Button onClick={() => props.onReloadSite()}>
                        Reload website
                    </Button>
                </div>
            </div>
        </ContentPadding>
    );
}

export default ErrorDialogPresentational;