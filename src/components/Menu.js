import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import StoreIcon from '@material-ui/icons/Store';
import StorageIcon from '@material-ui/icons/Storage';

import { setMenu } from '../redux/actions/ui';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2),
        flexGrow: 1,
    },    
    items: {
        height: 150,
        width: 150,
        textAlign: 'center',
        background: '#3f51b5'
    },
    cardContend: {
        marginTop: theme.spacing(1),
    },
    cardTitle: {
        marginTop: theme.spacing(0),
        marginBottom: theme.spacing(0),
        fontSize: 26,
        fontWeight: 'bold',
    },
    control: {
      padding: theme.spacing(2),
    },
  }));

export default function Menu() {
    const [spacing, setSpacing] = React.useState(2);
    const classes = useStyles();

    const { menu } = useSelector(state => state.ui)

    const dispatch = useDispatch()


    const handleVisible = ( e ) => {
        dispatch( setMenu( e.target.value ) )
    }

    return (
        <div hidden={!menu}>

            <Grid container
                direction="row"
                justifyContent="center"
                className={classes.root}
                spacing={3}
            >
                
                <Grid 
                    item 
                    container
                    xs={12}
                    justifyContent="center"
                >
                    <Card className={classes.items}>
                        <Link to="/listadocliente" style={{textDecoration: 'none'}} onClick={handleVisible} value={false}>
                            <CardContent 
                                className={classes.cardContend}
                            >
                                <EmojiPeopleIcon style={{ fontSize: 80, color: '#6fbf73' }}/>
                                <Typography className={classes.cardTitle} variant="h4" style={{color: '#6fbf73'}} align="center">
                                    Clientes
                                </Typography>
                            </CardContent>
                        </Link>
                    </Card>
                </Grid>

                <Grid 
                    container
                    justifyContent="center"
                    spacing={3}
                >
                    <Grid item >
                        <Card className={classes.items}>
                            <Link to="/listadofrigorifico" style={{textDecoration: 'none'}} onClick={handleVisible} value={false}>
                                <CardContent 
                                    className={classes.cardContend}
                                >
                                    <StoreIcon color="action" style={{ fontSize: 80, color: '#6fbf73' }}/>
                                    <Typography className={classes.cardTitle} variant="h4" style={{color: '#6fbf73'}} align="center">
                                        Frigorífico
                                    </Typography>
                                </CardContent>
                            </Link>
                        </Card>
                    </Grid>

                    <Grid item >
                        <Card className={classes.items}>
                            <Link to="/listadostock" style={{textDecoration: 'none'}} onClick={handleVisible} value={false}>
                                <CardContent 
                                    className={classes.cardContend}
                                >
                                    <StorageIcon color="action" style={{ fontSize: 80, color: '#6fbf73' }}/>
                                    <Typography className={classes.cardTitle} variant="h4" style={{color: '#6fbf73'}} align="center">
                                        Stock
                                    </Typography>
                                </CardContent>
                            </Link>
                        </Card>
                    </Grid>
                </Grid>

            </Grid>
        </div>
    )
}
