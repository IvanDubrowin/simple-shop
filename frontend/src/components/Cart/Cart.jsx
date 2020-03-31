import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import Paper from '@material-ui/core/Paper';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import { deleteCartItem, addCartItem } from "../../redux/reducers/cart-reducer";
import { DEFAULT_IMAGE } from "../../constants/shop";

const useStyles = makeStyles(theme => ({
    cartContainer: {
        marginTop: '80px',
        marginBottom: '80px',
        padding: '5px',
    },
    counter: {
        '&:disabled': {
            color: theme.palette.grey[900]
        }
    },
    image: {
        flex: 1,
        width: 50,
        height: 50,
        resizeMode: 'contain'
    },
    productTitle: {
        display: 'flex',
        alignContent: 'center'
    },
    paper: {
        boxShadow: '0 0 5px',
    }
}))

const CartItemCounter = ({ count, productId, addCartItem, deleteCartItem }) => {
    const classes = useStyles()

    const handleIncrement = () => {
        addCartItem(productId, ++count)
    }

    const handleDecrement = () => {
        if (count > 1) {
            addCartItem(productId, --count)
        } else {
            deleteCartItem(productId)
        }
    }

    return (
        <ButtonGroup>
            <Button onClick={handleDecrement}>-</Button>
            <Button className={classes.counter} disabled>{count}</Button>
            <Button onClick={handleIncrement}>+</Button>
        </ButtonGroup>
    )

}

const CartItem = ({ item, productId, addCartItem, deleteCartItem }) => {
    const classes = useStyles()

    const image = (!item.image) ? DEFAULT_IMAGE : item.image

    return (
        <TableRow key={productId}>
            <TableCell>
                <img src={image} className={classes.image} />
            </TableCell>
            <TableCell>
                <Typography>
                    {item.title}
                </Typography>
            </TableCell>
            <TableCell>{item.price}</TableCell>
            <TableCell>
                <CartItemCounter
                    count={item.count}
                    productId={productId}
                    addCartItem={addCartItem}
                    deleteCartItem={deleteCartItem}
                />
            </TableCell>
            <TableCell>{item.price * item.count}</TableCell>
            <TableCell>
                <IconButton onClick={() => deleteCartItem(productId)}>
                    <DeleteSharpIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    )
}

const Cart = ({ items, addCartItem, deleteCartItem, priceCount }) => {
    const classes = useStyles()

    const OrderButton = ({ priceCount }) => {
        if(priceCount > 0) {
            return (
                <Button variant="outlined" size="medium" color="primary">
                    Заказать
                </Button>
            )
        }
        return null
    } 

    const cartItems = items.map(
        (value, key) => (
            <CartItem
                item={value}
                productId={key}
                addCartItem={addCartItem}
                deleteCartItem={deleteCartItem}
            />
        )
    )

    return (
        <React.Fragment>
            <Grid
                container
                className={classes.cartContainer}
                direction="row"
                justify="center"
            >
                <Grid item xs={12} sm={8}>
                    <TableContainer className={classes.paper} component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={2}>Товар</TableCell>
                                    <TableCell>Цена</TableCell>
                                    <TableCell>Количество</TableCell>
                                    <TableCell>Сумма</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {[...cartItems.values()]}
                            </TableBody>
                            <TableFooter>
                                <TableCell colSpan={2}>
                                    <Typography>
                                        Общая сумма:
                                </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography>
                                        {priceCount}
                                    </Typography>
                                </TableCell>
                                <TableCell align="right" colSpan={3}>
                                    <OrderButton priceCount={priceCount}/>
                                </TableCell>
                            </TableFooter>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    return {
        items: state.get('cart').get('items'),
        priceCount: state.get('cart').get('priceCount')
    }
}

export default connect(mapStateToProps, { addCartItem, deleteCartItem })(Cart);
