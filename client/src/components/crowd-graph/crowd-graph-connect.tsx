import { connect } from 'react-redux'
import CrowdGraph, { CrowdGraphProps } from './crowd-graph';
import { AppState } from '../../model/redux/store';

const mapStateToProps = (state: AppState): CrowdGraphProps => ({
    activeView: state.viewState.activeView,
    chapterHall: state.estimationState.chapterHall,
    estimationData: state.estimationState.estimationData,
    slideValue: state.crowdDataSlideState
});

export default connect(
  mapStateToProps,
)(CrowdGraph);