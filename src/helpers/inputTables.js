import * as React from "react"
import { useStyles } from "./styles";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


export function SelectFieldProducto(props) {
    const { id, value, api, field } = props;
    const classes = useStyles();
    
    const [producto, setProducto] = useState(value)

    // const handleRef = (element) => {
    //   if (element) {
    //     element.querySelector(`input[value="${value}"]`).focus();
    //   }
    // };

    const handleChange = (event) => {

      setProducto(event.target.value)
      
      api.setEditCellValue({ id, field, value: event.target.value }, event);
      // Check if the event is not from the keyboard
      // https://github.com/facebook/react/issues/7407
      if (event.nativeEvent.clientX !== 0 && event.nativeEvent.clientY !== 0) {
        api.commitCellChange({ id, field });
        api.setCellMode(id, field, 'view');
      }

    }
  
    return (
      <FormControl className={classes.formControl}>
        <Select
          labelId="demo-simple-select-label"
          // ref={handleRef}
          value={producto}
          onChange={handleChange}
        >
            <MenuItem value={'Capón'}>Capón</MenuItem>
            <MenuItem value={'Capon Descarte'}>Capon Descarte</MenuItem>
            <MenuItem value={'Chancha'}>Chancha</MenuItem>
            <MenuItem value={'Padrillo'}>Padrillo</MenuItem>
        </Select>
      </FormControl>
    );
};

// ================================================================

export function SelectFieldCliente(props) {
  const { id, value, api, field } = props;
  const { clientes } = useSelector(state => state.clientes)

  const classes = useStyles();

  // const handleRef = (element) => {
  //   if (element) {
  //     element.querySelector(`input[value="${value}"]`).focus();
  //   }
  // };

  const handleChange = (event) => {
    console.log(event.target.value)
    api.setEditCellValue({ id, field, value: event.target.value }, event);
    if (event.nativeEvent.clientX !== 0 && event.nativeEvent.clientY !== 0) {
      api.commitCellChange({ id, field });
      api.setCellMode(id, field, 'view');
    }
  }

  return (
    <FormControl className={classes.formControl}>
      <Select
        labelId="demo-simple-select-label"
        id={value}
        value={value}
        onChange={handleChange}
      >
        {/* <MenuItem
          value={''}
        >
            {'Seleccionar'}
        </MenuItem> */}
        
          {
            clientes.map( cliente => (
              <MenuItem 
                key={cliente.idCliente}
                value={cliente.idCliente}
              >
                  {`${cliente.idCliente} | ${cliente.nombreCompleto}`}
              </MenuItem>
            ))
          }
      </Select>
    </FormControl>
  );
};

  