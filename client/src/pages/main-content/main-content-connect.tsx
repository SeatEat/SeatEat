import { connect } from 'react-redux'
import MainContent from './main-content'

const mapStateToProps = (state: any) => ({
    view: state.viewState.view
});

export default connect(
    mapStateToProps
)(MainContent);