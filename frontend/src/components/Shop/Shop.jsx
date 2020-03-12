import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CategoriesMenu  from "./Categories";
import { ProductsList } from "./Products";

const useStyles = makeStyles(theme => ({
    categoriesMenuWrapper: {
        width: '15%',
        minHeight: 'calc(100vh - 53x)c',
        background: '#ccc',
        float: 'left',
        marginTop: '90px'
    },
    productsListWrapper: {
        width: '85%',
        minHeight: 'calc(100vh - 53px)',
        background: '#c00',
        float: 'right'
    }
}));

export const Shop = () => {

    const classes = useStyles();
    return (
        <React.Fragment>
            <div className={classes.categoriesMenuWrapper}>
                <CategoriesMenu/>
            </div>
            <div className={classes.productsListWrapper}>
                <ProductsList/>
            </div>
        </React.Fragment>
    )
};
