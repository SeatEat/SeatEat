import { connect } from 'react-redux'
import { AppState } from '../../model/redux/store';
import { Dispatch } from '../../model/redux/store';
import CrowdDataSlider, { CrowdDataSliderPropsState, CrowdDataSliderPropsActions } from './crowd-data-slider';
import { updateSlideValue } from '../../model/redux/crowdDataSliderState';

const mapStateToProps = (state: AppState): CrowdDataSliderPropsState => ({
    estimationData: state.estimationState.estimationData,
    activeView: state.viewState.activeView,
    crowdDataSlideState: state.crowdDataSlideState
});
const mapDispatchToProps = (dispatch: Dispatch): CrowdDataSliderPropsActions => ({
    onSliderChange: (activeView, value) => {dispatch(updateSlideValue(activeView, value))}
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CrowdDataSlider);