import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, Grid } from '@material-ui/core';
import Box from '@mui/material/Box';

import { setMenu } from '../redux/actions/ui'
import { startLoadingStock } from '../redux/actions/stockAction'
import StockAll from './StockAll'
import { startLoadingProveedores } from '../redux/actions/proveedoresAction';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2),
        flexGrow: 1,
    },
    grilla: {
        marginTop: theme.spacing(2),
    },
    acordion: {
        backgroundColor: '#E87961',
    }
}));

export default function Stock() {

    const { frigorificos } = useSelector(state => state.frigorifico)
    const classes = useStyles();
    const dispatch = useDispatch()    

    useEffect(() => {
        dispatch( startLoadingStock() )
        dispatch( startLoadingProveedores() )
    }, [])

    const handleVolver = (e) => {
        dispatch( setMenu( true ) )
    }

    

    return (
        <Container>
            <Grid 
                container
                justifyContent="space-between"
                alignItems="center"
                className={classes.root}
            >
                <Grid item >
                    <Typography variant="h4" component="h4" mb={2}>Stock</Typography>                        
                </Grid>

                <Grid item >
                    <Link to="/dashboard" style={{textDecoration: 'none'}}>
                        <Button 
                            variant="outlined" 
                            color="secondary" 
                            startIcon={<FirstPageIcon />}
                            onClick={ handleVolver }
                        >
                            VOLVER
                        </Button>
                    </Link>
                </Grid>

            </Grid>

            <Box>
                {
                    frigorificos.map( frigorifico => (
                        <Accordion TransitionProps={{ unmountOnExit: true }} >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                style={{backgroundColor: '#F2F4F4',}}
                            >
                                <Typography>{frigorifico.nombre}</Typography>
                            </AccordionSummary>

                            <AccordionDetails
                                children={<StockAll frigorifico={frigorifico}/>}
                            >
                                
                            </AccordionDetails>
                        </Accordion>
                    ))
                }
            </Box>
        </Container>
    )
}
