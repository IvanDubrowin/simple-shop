import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartSharpIcon from '@material-ui/icons/AddShoppingCartSharp';
import { fetchProducts } from "../../redux/reducers/products-reducer";

const useStyles = makeStyles(theme => ({
    product: {
        flex: '1 0 21%',
        margin: '0 1% 20px',
        height: '700px',
        flexBasis: '23%'
    }
}));

const Product = ({ 
    id, 
    title, 
    is_recommend, 
    is_top, 
    price, 
    description, 
    image 
}) => {
    const classes = useStyles();
    return (
        <Card className={classes.product}>
            <CardHeader title={title}/>
            <CardContent>
                <Typography>
                    <h3>{description}</h3>
                    <h2>Цена {price} руб.</h2>
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton>
                    <AddShoppingCartSharpIcon/>
                </IconButton>
            </CardActions>
        </Card>
    )
}

const ProductsList = ({ 
    initialized, 
    categoryId, 
    results, 
    fetchProducts
}) => {
    if(!initialized) {
        fetchProducts(categoryId, 1)
    }
    let products = results.map( 
        product => (
            <Product
                id={product.get('id')}
                title={product.get('title')}
                is_recommend={product.get('is_recommend')}
                is_top={product.get('is_top')}
                price={product.get('price')}
                description={product.get('description')}
                image={product.get('image')}
            />
        )
    )

    return (
        <React.Fragment>
            {products}
        </React.Fragment>
    )
};

const mapStateToProps = state => {
    return ({
        results: state.get('products').get('results'),
        initialized: state.get('products').get('initialized')
    })
}

export default connect(mapStateToProps, { fetchProducts })(ProductsList);
