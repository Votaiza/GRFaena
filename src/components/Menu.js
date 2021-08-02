import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { setMenu } from '../redux/actions/ui'

export default function Menu() {

    const dispatch = useDispatch()

    const { menu } = useSelector(state => state.ui)

    const handleVisible = ( e ) => {
        dispatch( setMenu( e.target.value ) )
    }

    return (
            <div hidden={!menu}>
                <div className="uk-child-width-1-4@s uk-grid-match" uk-grid="true">
                    <div>
                        <Link to="/listadocliente" onClick={handleVisible} value={false}>
                            <div className="uk-card uk-card-default uk-card-hover uk-card-body uk-text-center">
                            <span uk-icon="icon: users; ratio: 2.5"></span>
                            <h3 className="uk-card-title">Clientes</h3>
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="uk-child-width-1-4@s uk-grid-match" uk-grid="true">
                    <div>
                        <Link to="/listadofrigorifico" onClick={handleVisible} value={false}>
                            <div className="uk-card uk-card-default uk-card-hover uk-card-body uk-text-center">
                            <span uk-icon="icon: image; ratio: 2.5"></span>
                            <h3 className="uk-card-title">Frigorífico</h3>
                            </div>
                        </Link>
                    </div>

                    <div>
                        <Link to="/listadostock" onClick={handleVisible} value={false}>
                            <div className="uk-card uk-card-default uk-card-hover uk-card-body uk-text-center">
                            <span uk-icon="icon: album; ratio: 2.5"></span>
                            <h3 className="uk-card-title">Stock</h3>
                            </div>
                        </Link>
                    </div>
                </div>
          </div>
    )
}
