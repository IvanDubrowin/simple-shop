import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import { deleteCartItem, addCartItem } from "../../redux/reducers/cart-reducer";

const useStyles = makeStyles(theme => ({
    cartContainer: {
        marginTop: '80px',
        marginBottom: '80px',
        padding: '5px'
    }
}))

const CartItemCounter = ({ count, productId, addCartItem, deleteCartItem }) => {
    const handleIncrement = () => {
        addCartItem(productId, ++count)
    }

    const handleDecrement = () => {
        if(count > 1) {
            addCartItem(productId, --count)
        } else {
            deleteCartItem(productId)
        }
    }

    return (
        <ButtonGroup>
            <Button onClick={handleDecrement}>-</Button>
            <Button disabled>{count}</Button>
            <Button onClick={handleIncrement}>+</Button>
        </ButtonGroup>
    )

}

const CartItem = ({ item, productId, addCartItem, deleteCartItem }) => {
    return (
        <TableRow key={productId}>
            <TableCell>{item.title}</TableCell>
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

const Cart = ({ items, addCartItem, deleteCartItem }) => {
    const classes = useStyles()

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
        <Grid
            container
            className={classes.cartContainer}
            justify="center"
        >
            <Grid item xs={12} sm={8}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Товар</TableCell>
                                <TableCell>Цена</TableCell>
                                <TableCell>Количество</TableCell>
                                <TableCell>Сумма</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {[...cartItems.values()]}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )
}

const mapStateToProps = state => {
    return {
        items: state.get('cart').get('items')
    }
}

export default connect(mapStateToProps, { addCartItem, deleteCartItem })(Cart);
