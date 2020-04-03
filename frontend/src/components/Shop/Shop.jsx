import React from "react"
import { connect } from "react-redux"
import Grid from "@material-ui/core/Grid"
import ProductsList from "./Products"
import NotFound from "../Errors/NotFound"
import CategoriesList from "./Categories"
import { fetchProducts } from "../../redux/reducers/products-reducer"

const Shop = ({ match, fetchProducts, categories }) => {

    const categoryId = match.params.id

    const categoriesIdList = categories.map(item => item.get('id'))

    if(!(categoriesIdList.includes(+categoryId))) {
        return <NotFound/>
    }

    fetchProducts(categoryId, 1)

    return (
        <Grid 
            container
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
}

const mapStateToProps = state => {
    return ({
        categories: state.get('categories').get('items')
    })
}

export default connect(mapStateToProps, { fetchProducts })(Shop)