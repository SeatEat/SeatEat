import { connect } from 'react-redux'
import { AppState } from '../../model/redux/store';
import CrowdMap, { CrowdMapProps } from './crowd-map';

const mapStateToProps = (state: AppState): CrowdMapProps => ({
    estimationData: state.estimationState.estimationData,
    chapterHall: state.estimationState.chapterHall
});

export default connect(
  mapStateToProps,
)(CrowdMap);