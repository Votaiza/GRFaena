import React from 'react'
import { useDispatch } from 'react-redux'

import { startLogout } from '../redux/actions/authActions';

export const Sidebar = () => {

    const dispatch = useDispatch();

    const hanleLogout = () => {
        dispatch( startLogout() )
    }

    return (
        <aside className="">
            
            <div className="">
                <h3 className="">
                    <span> Dashboard</span>
                </h3>

                <button 
                    className="uk-button uk-button-secondary uk-button-small"
                    onClick={ hanleLogout }
                >
                    Logout
                </button>
            </div> 

        </aside>
    )
}