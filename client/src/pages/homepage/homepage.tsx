import './homepage.css';
import { Dispatch } from '../../model/redux/store';
import { toggleMobileMenu } from '../../model/redux/mobilMenuState';
import { connect } from 'react-redux';
import Homepage, { HomepageProps } from './homepage-presentational';

const mapDispatchToProps = (dispatch: Dispatch): HomepageProps => ({
    openMobileMenu: () => dispatch(toggleMobileMenu(true))
});

export default connect(
    null,
    mapDispatchToProps
)(Homepage);