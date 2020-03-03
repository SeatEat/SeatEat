import { connect } from 'react-redux'
import ViewCard, { ViewCardStateProps, ViewCardActionProps } from './view-card'
import { Dispatch, AppState } from '../../../model/redux/store'
import { ViewData } from '../../../model/views';
import { setView } from '../../../model/redux/viewState';

const mapStateToProps = (state: AppState, ownProps: {viewData: ViewData}): ViewCardStateProps => ({
  view: ownProps.viewData,
  viewState: state.viewState.activeView,
});

const mapDispatchToProps = (dispatch: Dispatch): ViewCardActionProps => ({
  onClick: (view: string) => dispatch(setView(view))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewCard);