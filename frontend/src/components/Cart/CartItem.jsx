import React from "react"
import { connect } from "react-redux"
import { makeStyles } from "@material-ui/core/styles"
import { IconButton, Typography } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import ButtonGroup from "@material-ui/core/ButtonGroup"
import TableCell from "@material-ui/core/TableCell"
import TableRow from "@material-ui/core/TableRow"
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined"
import { deleteCartItem, addCartItem } from "../../redux/reducers/cart-reducer"
import { DEFAULT_IMAGE } from "../../constants/shop"

const currencyFormatter = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' })

const useStyles = makeStyles(theme => ({
    counter: {
        '&:disabled': {
            color: theme.palette.grey[900]
        },
        minWidth: 50
    },
    image: {
        flex: 1,
        width: 50,
        height: 50,
        resizeMode: 'contain'
    },
    priceCell: {
        minWidth: 100, 
        maxWidth: 100
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
                <img src={image} alt="" className={classes.image} />
            </TableCell>
            <TableCell>
                <Typography>
                    {item.title}
                </Typography>
            </TableCell>
            <TableCell className={classes.priceCell}>
                    {currencyFormatter.format(item.price)}
            </TableCell>
            <TableCell>
                <CartItemCounter
                    count={item.count}
                    productId={productId}
                    addCartItem={addCartItem}
                    deleteCartItem={deleteCartItem}
                />
            </TableCell>
            <TableCell className={classes.priceCell}>
                {currencyFormatter.format(item.price * item.count)}
            </TableCell>
            <TableCell>
                <IconButton onClick={() => deleteCartItem(productId)}>
                    <DeleteForeverOutlinedIcon fontSize="large" color="primary"/>
                </IconButton>
            </TableCell>
        </TableRow>
    )
}

export default connect(null, { addCartItem, deleteCartItem })(CartItem)