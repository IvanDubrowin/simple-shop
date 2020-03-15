import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CategoriesMenu  from "./Categories";
import ProductsList from "./Products";

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

export const Shop = ({ match }) => {
    const classes = useStyles();
    const categoryId = match.params.id;
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
