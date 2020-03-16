import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import Collapse from '@material-ui/core/Collapse';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddShoppingCartSharpIcon from '@material-ui/icons/AddShoppingCartSharp';
import { DEFAULT_IMAGE } from "../../constants/shop";

const useStyles = makeStyles(theme => ({
    product: {
        flex: '1 0 21%',
        margin: '0 1% 20px',
        flexBasis: '23%'
    },
    image: {
        height: 250,
    },
    actions: {
        float: 'right'
    },
    actionButton: {
        padding: '5px'
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
    const defaultImage = DEFAULT_IMAGE
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    return (
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
            <CardActions className={classes.actions}>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                >
                    <ExpandMoreIcon />
                </IconButton>
                <IconButton>
                    <AddShoppingCartSharpIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography>
                        {description}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    )
}

const ProductsList = ({
    results
}) => {
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
        results: state.get('products').get('results')
    })
}

export default connect(mapStateToProps)(ProductsList);
