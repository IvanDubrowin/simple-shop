import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { AppBar } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Toolbar } from "@material-ui/core";
import { Button } from "@material-ui/core";


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

const Header = ({ title }) => {
    const classes = useStyles();
    const history = useHistory();
    const routeHandler = (url) => history.push(url);
    return (
        <AppBar>
            <Toolbar className={classes.toolBar}>
                <Typography variant="h6" className={classes.title}>
                    {title}
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

let mapStateToProps = state => {
    return {
        title: state.get('config').get('title')
    }
}

export default connect(mapStateToProps)(Header);