import React from "react"
import { connect } from "react-redux"
import Badge from "@material-ui/core/Badge"
import { makeStyles } from "@material-ui/core/styles"
import { useHistory } from "react-router-dom"
import { AppBar, IconButton } from "@material-ui/core"
import { Typography } from "@material-ui/core"
import { Toolbar } from "@material-ui/core"
import { Button } from "@material-ui/core"
import Slide from "@material-ui/core/Slide"
import useScrollTrigger from "@material-ui/core/useScrollTrigger"
import ShoppingCartSharpIcon from "@material-ui/icons/ShoppingCartSharp"
import { CART_MAX_TOTAL_PRICE } from "../../constants/shop"

const currencyFormatter = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' })

const useStyles = makeStyles(theme => ({
    headerWrapper: {
        paddingRight: '10px'
    },
    toolBar: {
        display: 'flex',
        justify: 'spaceBetween',
    },
    titleWrapper: {
        flexGrow: 1,
    },
    titleButton: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: '1.5em'
    },
    navButton: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: '1.5em',
    },
    cartIcon: {
        color: 'white',
        fontSize: '1.2em'
    }
}))

const HideOnScroll = ({ children, window }) => {

    const trigger = useScrollTrigger({ target: window ? window() : undefined })

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    )
}

const Header = ({ title, firstCategory, cartTotalPrice }) => {

    const classes = useStyles()

    const history = useHistory()

    const routeHandler = url => history.push(url)

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
                        <Typography>
                            Магазин
                        </Typography>
                    </Button>
                </React.Fragment>
            )
        }
        return null
    }

    const CartIcon = ({ firstCategory, cartTotalPrice }) => {
        if (firstCategory) {
            return (
                <IconButton 
                    onClick={() => routeHandler('/cart')}
                    disabled={cartTotalPrice === 0 ? true : false}
                >
                    <Badge
                        badgeContent={currencyFormatter.format(cartTotalPrice)}
                        color="secondary"
                        max={CART_MAX_TOTAL_PRICE}
                        showZero
                    >
                        <ShoppingCartSharpIcon className={classes.cartIcon} />
                    </Badge>
                </IconButton>
            )
        }
        return null
    }

    return (
        <React.Fragment>
            <HideOnScroll>
                <AppBar className={classes.headerWrapper}>
                    <Toolbar className={classes.toolBar}>
                        <Title title={title} />
                        <ShopButton firstCategory={firstCategory} />
                        <CartIcon
                            firstCategory={firstCategory}
                            cartTotalPrice={cartTotalPrice}
                        />
                    </Toolbar>
                </AppBar >
            </HideOnScroll>
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    return {
        title: state.get('config').get('title'),
        firstCategory: state.get('categories').get('firstCategory'),
        cartTotalPrice: state.get('cart').get('totalPrice')
    }
}

export default connect(mapStateToProps)(Header)