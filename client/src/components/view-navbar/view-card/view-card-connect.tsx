import { connect } from 'react-redux'
import ViewCard from './view-card'
import { Dispatch } from '../../../model/redux/store'
import { setView } from '../../../model/redux/actionFunctions/viewActionFunctions'

const mapStateToProps = (state: any) => ({
  viewState: state.viewState.view
});

const mapDispatchToProps = (dispatch: Dispatch, ownProps: any) => ({
  onClick: (view: string) => setView(dispatch, view)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewCard);