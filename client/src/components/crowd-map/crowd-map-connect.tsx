import { connect } from 'react-redux'
import { AppState } from '../../model/redux/store';
import CrowdMap, { CrowdMapProps } from './crowd-map';

const mapStateToProps = (state: AppState): CrowdMapProps => ({
    estimationData: state.estimationState.estimationData,
});

export default connect(
  mapStateToProps,
)(CrowdMap);