import React from "react"
import { useHistory } from "react-router-dom"
import { connect } from "react-redux"
import { makeStyles } from "@material-ui/core/styles"
import Fab from '@material-ui/core/Fab'

const useStyles = makeStyles(theme => ({
    categoryItem: {
        margin: '8px'
    }
}))

const CategoryItem = ({ id, title, currentCategory }) => {
    const isCurrent = +currentCategory === +id

    const classes = useStyles()

    const history = useHistory()

    const routeHandler = url => history.push(url)

    return  (
        <Fab variant="extended"
             size="medium"
             color={isCurrent ? 'secondary' : 'default'}
             className={classes.categoryItem}
             onClick={() => routeHandler(`/shop/categories/${id}`)}
             >
            {title}
        </Fab>
        )
}

const CategoriesList = ({ currentCategory, data }) => {
    let categories = data.map(
        category => (
            <CategoryItem 
                id={category.get('id')} 
                title={category.get('title')}
                currentCategory={currentCategory}
            />
            )
        )
    return <React.Fragment>{categories}</React.Fragment>
}

const mapStateToProps = state => {
    return ({
        data: state.get('categories').get('data')
    })
}

export default connect(mapStateToProps)(CategoriesList)