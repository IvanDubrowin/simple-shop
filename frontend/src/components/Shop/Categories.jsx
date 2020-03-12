import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { getCategories } from "../../redux/reducers/categories-reducer";

const useStyles = makeStyles(theme => ({

}));

const CategoryItem = ({ title }) => {
    const classes = useStyles();
    return  <li>{title}</li>
};

const CategoriesMenu = ({ 
    isLoading,
    count,
    next,
    previous,
    results,
    getCategories 
}) => {
    const classes = useStyles();
    if (!isLoading && count === null) {
        getCategories();
    }
    let categories = results.map(category => <CategoryItem title={category.get('title')}/>)
    return <ul>{categories}</ul>
};

const mapStateToProps = state => {
    return ({
        isLoading: state.get('categories').get('isLoading'),
        count: state.get('categories').get('count'),
        next: state.get('categories').get('next'),
        previous: state.get('categories').get('previous'),
        results: state.get('categories').get('results'),
    })
}

export default connect(mapStateToProps, { getCategories })(CategoriesMenu);