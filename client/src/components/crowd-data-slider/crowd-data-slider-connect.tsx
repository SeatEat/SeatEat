import { connect } from 'react-redux'
import { AppState } from '../../model/redux/store';
import { Dispatch } from '../../model/redux/store';
import CrowdDataSlider, { CrowdDataSliderPropsState, CrowdDataSliderPropsActions } from './crowd-data-slider';
import { updateSlideValue } from '../../model/redux/crowdDataSliderState';


const mapStateToProps = (state: AppState): CrowdDataSliderPropsState => ({
    estimationData: state.estimationState.estimationData,
    activeView: state.viewState.activeView
});
const mapDispatchToProps = (dispatch: Dispatch): CrowdDataSliderPropsActions => ({
    onSliderChange: (value) => {dispatch(updateSlideValue(value))}
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CrowdDataSlider);