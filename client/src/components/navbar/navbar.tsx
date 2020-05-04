import './navbar.css';
import { AppState, Dispatch } from '../../model/redux/store';
import { toggleMobileMenu } from '../../model/redux/mobilMenuState';
import { connect } from 'react-redux';
import Navbar, { NavbarState, NavbarAction } from './navbar-presentational';


const mapStateToProps = (state: AppState): NavbarState => ({
    isOpen: state.mobileMenuState.isOpen
});
const mapDispatchToProps = (dispatch: Dispatch): NavbarAction => ({
    onToogleNavbar: (isOpen) => dispatch(toggleMobileMenu(isOpen))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Navbar);