import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import CategoriesMenu  from "./Categories";
import ProductsList from "./Products";
import { fetchProducts } from "../../redux/reducers/products-reducer";


const useStyles = makeStyles(theme => ({
    categoriesMenuWrapper: {
        flexBasis: '20%',
        flexGrow: 1
    },
    productsListWrapper: {
        display: 'flex',
        flexFlow: 'wrap',
        flexBasis: '80%',
        flexGrow: 4,
        margin: '20px auto 0'
    }
}));

const Shop = ({ match, fetchProducts }) => {
    const classes = useStyles();
    const categoryId = match.params.id;
    fetchProducts(categoryId, 1);
    return (
        <React.Fragment>
            <div className={classes.categoriesMenuWrapper}>
                <CategoriesMenu />
            </div>
            <div className={classes.productsListWrapper}>
                <ProductsList categoryId={categoryId}/>
            </div>
        </React.Fragment>
    )
};

export default connect(null, { fetchProducts })(Shop);