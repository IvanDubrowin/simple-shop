import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import {useHistory} from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
    toolBar: {
        display: 'flex'
    },
    title: {
        flexGrow: 1
    },
    navButton: {
        color: 'inherit'
    }
});

export const Header = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const routeHandler = (url) => history.push(url);

    return (
        <AppBar>
            <Toolbar className={classes.toolBar}>
                <Typography variant="h6" className={classes.title}>
                    Title
                </Typography>
                <Button
                    className={classes.navButton}
                    onClick={() => routeHandler("/")}>
                    Главная
                </Button>
                <Button
                    className={classes.navButton}
                    onClick={() => routeHandler("/shop")}>
                    Магазин
                </Button>
                <Button
                    className={classes.navButton}
                    onClick={() => routeHandler("/contacts")}>
                    Контакты
                </Button>
            </Toolbar>
        </AppBar>
    )
};