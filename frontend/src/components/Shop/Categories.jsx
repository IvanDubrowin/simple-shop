import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({

}));

const CategoryItem = ({ id, title }) => {
    const classes = useStyles();
    const history = useHistory();
    const routeHandler = url => history.push(url);
    return  (
        <ListItem>
            <Button
                onClick={() => routeHandler(`/shop/categories/${id}`)}>
                {title}
            </Button>
        </ListItem>
        )
};

const CategoriesMenu = ({ data }) => {
    const classes = useStyles()
    let categories = data.map(
        category => (
            <CategoryItem 
                id={category.get('id')} 
                title={category.get('title')}
            />
            )
        )
    return <List>{categories}</List>
};

const mapStateToProps = state => {
    return ({
        data: state.get('categories').get('data')
    })
}

export default connect(mapStateToProps)(CategoriesMenu);