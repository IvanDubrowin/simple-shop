import React from "react";
import { useHistory } from "react-router-dom";
import { Map, fromJS } from 'immutable';
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import MaskedInput from 'react-text-mask';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TextField from '@material-ui/core/TextField';
import CartItem from "./CartItem";
import { createOrder } from "../../services/api/shop";
import { setOrderCreated } from "../../redux/reducers/cart-reducer";

const currencyFormatter = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' })

const useStyles = makeStyles(theme => ({
    cartContainer: {
        marginTop: '80px',
        marginBottom: '80px',
        padding: '5px',
    },
    orderModal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    orderForm: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2, 4, 3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        '& > div': {
            margin: '10px'
        },
        '& > button': {
            margin: '10px'
        }
    }
}))


const Cart = ({ items, priceCount, setOrderCreated }) => {
    const history = useHistory()

    if (priceCount === 0) {
        history.push('/')
    }

    const classes = useStyles()

    const [open, setOpen] = React.useState(false)

    const handleOpenOrderForm = () => setOpen(true)

    const handleCloseOrderForm = () => setOpen(false)

    const OrderButton = ({ priceCount }) => {
        if (priceCount > 0) {
            return (
                <Button
                    variant="outlined"
                    size="medium"
                    color="primary"
                    onClick={handleOpenOrderForm}
                >
                    Заказать
                </Button>
            )
        }
        return null
    }

    const PhoneMask = (props) => {
        const { inputRef, ...other } = props
      
        return (
          <MaskedInput
            {...other}
            ref={(ref) => {
              inputRef(ref ? ref.inputElement : null);
            }}
            mask={
                ['+', /[1-9]/, '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]
            }
            placeholderChar={'\u2000'}
            showMask
          />
        )
      }

    const OrderForm = () => {
        const [name, setName] = React.useState('')

        const [phoneNumber, setPhoneNumber] = React.useState('+7(999)999-99-99')

        const [email, setEmail] = React.useState('')

        const [errors, setErrors] = React.useState(Map({
            name: null,
            phone_number: null,
            email: null
        }))

        const handleSubmit = event => {
            createOrder(name, phoneNumber.replace(/[^+\d]/g, ''), email)
                .then(() => {
                        setOrderCreated()
                        history.push('/')
                    }
                )
                .catch(error => setErrors(fromJS(error.response.data)))
        }

        return (
            <Modal
                className={classes.orderModal}
                open={open}
                onClose={handleCloseOrderForm}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <form className={classes.orderForm}>
                        <TextField 
                            variant="outlined"
                            id="name" 
                            label="Имя покупателя" 
                            color="secondary"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            error={errors.get('name') != null}
                            helperText={errors.get('name') != null ? errors.get('name').first() : ''}
                            required
                        />
                        <TextField
                            variant="outlined"
                            id="phone_number"
                            label="Номер телефона"
                            color="secondary"
                            InputProps={{inputComponent: PhoneMask}}
                            value={phoneNumber}
                            onChange={(event) => setPhoneNumber(event.target.value)}
                            error={errors.get('phone_number') != null}
                            helperText={errors.get('phone_number') != null ? errors.get('phone_number').first() : ''}
                            required
                        />
                        <TextField
                            variant="outlined"
                            id="email" 
                            label="Email" 
                            color="secondary"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            error={errors.get('email') != null}
                            helperText={errors.get('email') != null ? errors.get('email').first() : ''}
                            required
                        />
                        <Button 
                            onClick={handleSubmit}
                            variant="outlined"
                            size="medium"
                            color="primary"
                        >
                            Подтвердить
                        </Button>
                    </form>
                </Fade>
            </Modal>
        )
    }

    const cartItems = items.map((value, key) => <CartItem item={value} productId={key} />)

    return (
        <React.Fragment>
            <Grid
                container
                className={classes.cartContainer}
                direction="row"
                justify="center"
            >
                <Grid item xs={12} sm={8}>
                    <TableContainer>
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
                                        {currencyFormatter.format(priceCount)}
                                    </Typography>
                                </TableCell>
                                <TableCell align="right" colSpan={3}>
                                    <OrderButton priceCount={priceCount} />
                                    <OrderForm />
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

export default connect(mapStateToProps, { setOrderCreated })(Cart);
