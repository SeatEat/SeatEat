import React, { FC, createContext } from "react";
import ContentPadding from "../content-padding";
import './dialog.css';

interface DialogOptions {
    content: (closeDialog: Function) => React.ReactNode
}

const DialogServiceContext = createContext<
    (options: DialogOptions) => void
>(() => {});


const DialogServiceProvider: FC = (props) => {

    const [
        dialogContent,
        setDialogContent
    ] = React.useState<React.ReactNode | null>(null);

    const [
        dialogOpen,
        setDialogOpen
    ] = React.useState<boolean>(false);

    const closeDialog = () => {
        setDialogOpen(false);
    }

    const openDialog = (options: DialogOptions): void => {
        setDialogContent(options.content(closeDialog));
        setDialogOpen(true);
    };

    return <>
        <DialogServiceContext.Provider
            value={openDialog}
            children={props.children} />

        <div className={`dialog-overlay ${dialogOpen ? 'active' : ''}`}>
            <div className="dialog-window">
                <ContentPadding>
                    {dialogContent}
                </ContentPadding>
            </div>
        </div>
    </>
}

export const useDialogService = () => React.useContext(DialogServiceContext);
export default DialogServiceProvider;

