import { connect } from 'react-redux'
import { AppState } from '../../model/redux/store';
import { Dispatch } from '../../model/redux/store';
import MainContent, { MainContentStateProps, MainContentActionProps } from './main-content';
import { getChapterHallFromName } from '../../model/chapter-hall-model';
import { requestEstimation } from '../../model/redux/estimationState';
import { requestCheckInListener } from '../../model/redux/checkInState';

const mapStateToProps = (state: AppState): MainContentStateProps => ({
    view: state.viewState.activeView,
    isLoading: state.estimationState.isLoading,
    loadingProgress: Math.round(state.estimationState.loadingProgress * 100),
    loadingStatus: state.estimationState.status,
    estimationOfChapter: state.estimationState.chapterHall?.name ?? null
});
const mapDispatchToProps = (dispatch: Dispatch): MainContentActionProps => ({
    onRequestEstimation: (nameOfChapter) => {
        let chapterHall = getChapterHallFromName(nameOfChapter);
        if (chapterHall) {
            dispatch(requestEstimation(chapterHall));
            dispatch(requestCheckInListener());
        }
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainContent);