import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Tooltip } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Collapse from '@material-ui/core/Collapse';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Pagination from '@material-ui/lab/Pagination';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import { DEFAULT_IMAGE, PRODUCTS_PER_PAGE } from "../../constants/shop";
import { fetchProducts } from "../../redux/reducers/products-reducer";
import { addCartItem } from "../../redux/reducers/cart-reducer";

const currencyFormatter = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' })

const useStyles = makeStyles(theme => ({
    product: {
        margin: '10px',
        boxShadow: '0 0 0px'
    },
    image: {
        paddingTop: '100%'
    },
    addCartButton: {
        margin: '5px',
        '&:disabled': {
            color: theme.palette.secondary.main
        }
    },
    descriptionButton: {
        margin: '5px'
    },
    pagination: {
        padding: '25px'
    },
    iconWidget: {
        padding: '5px',
        fontSize: '30px'
    }
}));

const ProductWidgets = ({ isRecommend, isTop }) => {
    const classes = useStyles()

    const IsRecommend = () => {
        if(isRecommend) {
            return (
                <Tooltip className={classes.iconWidget} title="Рекомендовано">
                    <ThumbUpAltOutlinedIcon/>
                </Tooltip>
            )
        }
        return null
    }

    const IsTop = () => {
        if(isTop) {
            return (
                <Tooltip className={classes.iconWidget} title="Топ">
                    <StarBorderOutlinedIcon/>
                </Tooltip>
            )
        }
        return null
    }

    return (
        <Typography>
            <IsRecommend/>
            <IsTop/>
        </Typography>
    )
}

const Product = ({
    productId,
    title,
    isRecommend,
    isTop,
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
        <Grid item lg={3} md={6} sm={12} xs={12}>
            <Card className={classes.product}>
                <CardMedia
                    className={classes.image}
                    image={!(image) ? defaultImage : image}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {title}
                    </Typography>
                    <Typography component="p">
                        <h2>{currencyFormatter.format(price)}</h2>
                    </Typography>
                    <Typography>
                        <ProductWidgets isRecommend={isRecommend} isTop={isTop}/>
                    </Typography>
                </CardContent>
                <CardActions>
                    <Grid container justify="flex-end">
                        <Button
                            className={classes.descriptionButton}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            disabled={description === "" ? true : false}
                            variant="outlined"
                            color="primary"
                        >
                            <Typography>
                                Описание
                        </Typography>
                        </Button>
                        <Button
                            className={classes.addCartButton}
                            onClick={() => addCartItem(productId, 1)}
                            disabled={inCart ? true : false}
                            variant="outlined"
                            color="primary"
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
                isRecommend={product.get('is_recommend')}
                isTop={product.get('is_top')}
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
