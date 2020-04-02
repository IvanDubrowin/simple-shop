import React from "react";
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import ContentCarousel from "../Carousel/Carousel";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { clearCart } from "../../redux/reducers/cart-reducer";


const useStyles = makeStyles(theme => ({
    contentWrapper: {
        display: 'flex',
        flexDirection: 'column',
        padding: '8px'
    },
    successOrder: {
        width: '100%'
    }
}));

const Content = ({ text, orderCreated, clearCart }) => {
    const classes = useStyles()

    const [open, setOpen] = React.useState(false)

    const handleClose = (event, reason) => {
        if (!(reason === 'clickaway')) {
            setOpen(false)
        }
    }

    if (orderCreated && !(open)) {
        clearCart()
        setOpen(true)
    }

    const Alert = props => (
        <MuiAlert 
            elevation={6} 
            variant="filled" 
            className={classes.successOrder}
            {...props}
        />
    )

    return (
        <React.Fragment>
            <div className={classes.contentWrapper}>
                <ContentCarousel />
                <div dangerouslySetInnerHTML={{ __html: text }}></div>
            </div>
            <Snackbar 
                open={open} 
                onClose={handleClose}
                autoHideDuration={8000}
            >
                <Alert  
                    onClose={handleClose} 
                    severity="success"
                >
                    Ваш заказ успешно обработан
                </Alert>
            </Snackbar>
        </React.Fragment>
    )
};

const mapStateToProps = state => {
    return ({
        text: state.get('config').get('content').get('text'),
        orderCreated: state.get('cart').get('orderCreated')
    })
}

export default connect(mapStateToProps, { clearCart })(Content);