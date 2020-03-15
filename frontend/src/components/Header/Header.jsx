import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { AppBar } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Toolbar } from "@material-ui/core";
import { Button } from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
import ShoppingCartSharpIcon from '@material-ui/icons/ShoppingCartSharp';
import useScrollTrigger from "@material-ui/core/useScrollTrigger";

const useStyles = makeStyles(theme => ({
    headerWrapper: {
        flexShrink: 0
    },
    toolBar: {
        display: 'flex'
    },
    title: {
        flexGrow: 1
    },
    navButton: {
        fontWeight: 'bold',
        color: 'inherit',
        padding: '10px'
    },
    cartIcon: {
        fontSize: 35,
        padding: '10px'
    }
}));

const HideOnScroll = ({ children, window }) => {
    const trigger = useScrollTrigger({ target: window ? window() : undefined })

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

const Header = ({ title, firstCategory }) => {
    const classes = useStyles();
    const history = useHistory();
    const routeHandler = url => history.push(url);
    const getShopButton = (firstCategory) => {
        if(firstCategory) {
            const id = firstCategory.get('id')
            const url = `/shop/categories/${id}`
            return (
                <Button
                    className={classes.navButton}
                    onClick={() => routeHandler(url)}>
                    Магазин
                </Button>
            )
        }
        return null
    }
    const getCartIcon = (firstCategory) => {
        if(firstCategory) {
            return <ShoppingCartSharpIcon className={classes.cartIcon}/>
        }
        return null
    }
    return (
        <HideOnScroll>
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
                    {getShopButton(firstCategory)}
                    <Button
                        className={classes.navButton}
                        onClick={() => routeHandler("/contacts")}>
                        Контакты
                    </Button>
                    {getCartIcon(firstCategory)}
                </Toolbar>
            </AppBar>
        </HideOnScroll>
    )
};

let mapStateToProps = state => {
    return {
        title: state.get('config').get('title'),
        firstCategory: state.get('categories').get('firstCategory')
    }
}

export default connect(mapStateToProps)(Header);