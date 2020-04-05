import React from "react"
import { connect } from "react-redux"
import Grid from "@material-ui/core/Grid"
import ProductsList from "./Products"
import Error from "../Errors/Error"
import CategoriesList from "./Categories"
import { fetchProducts } from "../../redux/reducers/products-reducer"

const Shop = ({ match, fetchProducts, categories }) => {

    const categoryId = match.params.id

    const categoriesIdList = categories.map(item => item.get('id'))

    const notExistCategory = !(categoriesIdList.includes(+categoryId))

    if (notExistCategory) {
        return <Error text="Упс! Страница не найдена" code={404} />
    }

    fetchProducts(categoryId, 1)

    return (
        <Grid 
            container 
            direction="column" 
            alignItems="flex-start"
        >
            <Grid container direction="row" justify="flex-start">
                <CategoriesList currentCategory={categoryId} />
            </Grid>
            <Grid container direction="row" justify="center">
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