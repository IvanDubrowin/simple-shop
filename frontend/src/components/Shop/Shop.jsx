import React from "react";
import { connect } from "react-redux";
import Grid from '@material-ui/core/Grid';
import ProductsList from "./Products";
import CategoriesList from "./Categories";
import { fetchProducts } from "../../redux/reducers/products-reducer";


const Shop = ({ match, fetchProducts }) => {

    const categoryId = match.params.id

    fetchProducts(categoryId, 1)

    return (
        <Grid 
            container spacing={5}
            justify="center"
            alignItems="center"
            >
            <Grid item xl={12}>
                <CategoriesList currentCategory={categoryId}/>
            </Grid>
            <Grid item xl={10}>
                <ProductsList categoryId={categoryId} />
            </Grid>
        </Grid>
    )
};

export default connect(null, { fetchProducts })(Shop);