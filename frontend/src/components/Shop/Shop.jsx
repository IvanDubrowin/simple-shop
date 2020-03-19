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
                <ProductsList categoryId={categoryId}/>
        </React.Fragment>
    )
};

export default connect(null, { fetchProducts })(Shop);