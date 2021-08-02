import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newAdjunto } from '../redux/actions/adjuntoAction';

export default function Adjuntos() {

    const dispatch = useDispatch()

    const [adjunto, setAdjunto] = useState()

    const { id } = useSelector(state => state.faena.active)

    const handleSubmit = ( e ) => {
        e.preventDefault()
        const atributo = e.target.value
        dispatch( newAdjunto( id, adjunto, atributo ) )
    }

    const handleChange = ( e ) => {
        setAdjunto( e.target.files[0] )
    }

    return (
        <div>


            <div uk-grid="true">
                <div className="uk-width-1-3">
                    <form action="" className="uk-form-stacked">
                        <label className="uk-form-label" >Cargar Guia Traslado</label>
                        <div uk-form-custom="target: true">
                            <input type="file" onChange={handleChange}/>
                                                        
                            <input className="uk-input uk-form-width-medium" 
                                type="text" 
                                placeholder="Select file"
                                disabled />
                        </div>
                        <button className="uk-button uk-button-default"
                            value="guia"
                            onClick={handleSubmit}>Submit</button>
                    </form>
                    
                </div>

                <div className="uk-width-1-3">
                    <form action="" className="uk-form-stacked">
                        <label className="uk-form-label" htmlFor="Vep">Cargar Comprobante VEP</label>
                        <div uk-form-custom="target: true">
                            <input type="file" onChange={handleChange}/>
                                                       
                            <input className="uk-input uk-form-width-medium" 
                                type="text" 
                                placeholder="Select file"
                                disabled />
                        </div>
                        <button className="uk-button uk-button-default"
                            value="vep"
                            onClick={handleSubmit} >Submit</button>
                    </form>
                    
                </div>

                

                <div className="uk-width-1-3">
                    <form action="" className="uk-form-stacked">
                        <label className="uk-form-label" htmlFor="romaneoOficial">Cargar Romaneo Oficial</label>
                        <div uk-form-custom="target: true">
                            <input type="file" onChange={handleChange}/>
                            <input className="uk-input uk-form-width-medium" type="text" placeholder="Select file" disabled />
                        </div>
                        <button className="uk-button uk-button-default"
                            value="oficial"
                            onClick={handleSubmit} >Submit</button>
                    </form>                        
                </div>

                <div className="uk-width-1-3">
                    <form action="" className="uk-form-stacked">
                        <label className="uk-form-label" htmlFor="romaneoInterno">Cargar Romaneo Interno</label>
                        <div uk-form-custom="target: true">
                            <input type="file" onChange={handleChange}/>
                            <input className="uk-input uk-form-width-medium" type="text" placeholder="Select file" disabled />
                        </div>
                        <button className="uk-button uk-button-default"
                            value="interno"
                            onClick={handleSubmit} >Submit</button>
                    </form>
                </div>
    
                <div className="uk-width-1-3">
                    <form action="" className="uk-form-stacked">
                        <label className="uk-form-label" htmlFor="liquidacion">Cargar Liquidación</label>
                        <div uk-form-custom="target: true">
                            <input type="file" onChange={handleChange}/>
                            <input className="uk-input uk-form-width-medium" type="text" placeholder="Select file" disabled />
                        </div>
                        <button className="uk-button uk-button-default"
                            value="liquidacion"
                            onClick={handleSubmit} >Submit</button>
                    </form>
                </div>
            </div>
            
        </div>
    )
}
