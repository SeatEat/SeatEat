import React, { FC, ReactNode} from 'react';
import { NavLink } from 'react-router-dom';
import './link-card.css';

const LinkCard: FC<{onClick: Function, path: string, key?: string, right?: ReactNode, light?: boolean}> = (props) => {
    return (
        <NavLink 
            exact
            className={`link-card-container ${props.light ? 'light' : ''}`}
            activeClassName={`link-card-container ${props.light ? 'light' : ''} active`}
            onClick={() => props.onClick()}
            to={props.path} 
            key={props.key}>
            <div className='link-card-text'>
                {props.children}
            </div>
            {props.right}
        </NavLink>
    );
}

export default LinkCard;