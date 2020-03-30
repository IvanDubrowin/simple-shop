import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Collapse from '@material-ui/core/Collapse';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Pagination from '@material-ui/lab/Pagination';
import { DEFAULT_IMAGE, PRODUCTS_PER_PAGE } from "../../constants/shop";
import { fetchProducts } from "../../redux/reducers/products-reducer";
import { addCartItem } from "../../redux/reducers/cart-reducer";


const useStyles = makeStyles(theme => ({
    product: {
        margin: '10px'
    },
    image: {
        paddingTop: '100%'
    },
    actionButton: {
        margin: '5px'
    },
    pagination: {
        padding: '25px'
    }
}));

const Product = ({
    productId,
    title,
    is_recommend,
    is_top,
    price,
    description,
    image,
    addCartItem,
    cartItems
}) => {
    const classes = useStyles();
    const defaultImage = DEFAULT_IMAGE
    const [expanded, setExpanded] = React.useState(false);
    const inCart = cartItems.get(productId) ? true : false
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    return (
        <Grid item xs={12} sm={3}>
            <Card className={classes.product}>
                <CardMedia
                    className={classes.image}
                    image={!(image) ? defaultImage : image}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        <h2>Цена {price} руб.</h2>
                    </Typography>
                </CardContent>
                <CardActions>
                    <Grid container justify="flex-end">
                        <Button
                            className={classes.actionButton}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            variant="contained"
                            color="primary"
                        >
                            <Typography>
                                Описание
                        </Typography>
                        </Button>
                        <Button
                            className={classes.actionButton}
                            onClick={() => addCartItem(productId, 1)}
                            color={inCart ? "secondary" : "primary"}
                            variant="contained"
                        >
                            <Typography>
                                {inCart ? "В корзине" : "В корзину"}
                            </Typography>
                        </Button>
                    </Grid>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>
                            {description}
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
        </Grid>
    )
}

const ProductsList = ({
    results,
    categoryId,
    fetchProducts,
    addCartItem,
    productCount,
    currentPage,
    cartItems
}) => {
    const classes = useStyles();
    const pagesCount = Math.ceil(productCount / PRODUCTS_PER_PAGE);
    const pageChange = (event, value) => {
        if (!(value === currentPage)) {
            fetchProducts(categoryId, value)
        }
    };
    let products = results.map(
        product => (
            <Product
                productId={product.get('id')}
                title={product.get('title')}
                is_recommend={product.get('is_recommend')}
                is_top={product.get('is_top')}
                price={product.get('price')}
                description={product.get('description')}
                image={product.get('image')}
                addCartItem={addCartItem}
                cartItems={cartItems}
            />
        )
    )

    return (
        <React.Fragment>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                {products}
            </Grid>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                <Pagination
                    className={classes.pagination}
                    count={pagesCount}
                    page={currentPage}
                    onChange={pageChange}
                    color="primary"
                    size="large"
                />
            </Grid>
        </React.Fragment>
    )
};

const mapStateToProps = state => {
    return ({
        results: state.get('products').get('results'),
        productCount: state.get('products').get('count'),
        currentPage: state.get('products').get('page'),
        cartItems: state.get('cart').get('items')
    })
}

export default connect(mapStateToProps, { fetchProducts, addCartItem })(ProductsList);
