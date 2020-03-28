import React from "react";
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import { AppBar } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Toolbar } from "@material-ui/core";
import { Button } from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import ShoppingCartSharpIcon from '@material-ui/icons/ShoppingCartSharp';

const useStyles = makeStyles(theme => ({
    headerWrapper: {
        flexShrink: 0
    },
    toolBar: {
        display: 'flex',
        justify: 'spaceBetween'
    },
    titleWrapper: {
        flexGrow: 1,
    },
    titleButton: {
        color: 'white',
        fontWeight: 'bold',
        padding: '10px',
        fontSize: 35,
    },
    navButton: {
        color: 'white',
        fontWeight: 'bold',
        padding: '10px',
        fontSize: 35,
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

    const Title = ({ title }) => (
        <div className={classes.titleWrapper}>
            <Button
                className={classes.titleButton}
                onClick={() => routeHandler("/")}>
                <Typography variant="h6">
                    {title}
                </Typography>
            </Button>
        </div>
    )

    const ShopButton = ({ firstCategory }) => {
        if (firstCategory) {

            const id = firstCategory.get('id')

            const url = `/shop/categories/${id}`

            return (
                <React.Fragment>
                    <Button
                        className={classes.navButton}
                        onClick={() => routeHandler(url)}>
                        <Typography variant="h6">
                            Магазин
                        </Typography>
                    </Button>
                </React.Fragment>
            )
        }
        return null
    }

    const CartIcon = ({ firstCategory }) => {
        if (firstCategory) {
            return <ShoppingCartSharpIcon className={classes.cartIcon} />
        }
        return null
    }

    return (
        <React.Fragment>
            <HideOnScroll>
                <AppBar>
                    <Toolbar className={classes.toolBar}>
                        <Title title={title} />
                        <ShopButton firstCategory={firstCategory} />
                        <Button
                            className={classes.navButton}
                            onClick={() => routeHandler("/contacts")}>
                            <Typography variant="h6">
                                Контакты
                            </Typography>
                        </Button>
                        <CartIcon firstCategory={firstCategory} />
                    </Toolbar>
                </AppBar >
            </HideOnScroll>
        </React.Fragment>
    )
};

let mapStateToProps = state => {
    return {
        title: state.get('config').get('title'),
        firstCategory: state.get('categories').get('firstCategory')
    }
}

export default connect(mapStateToProps)(Header);