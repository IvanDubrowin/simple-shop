import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CategoriesMenu  from "./Categories";
import { ProductsList } from "./Products";

const useStyles = makeStyles(theme => ({
    categoriesMenuWrapper: {
        width: '15%',
        marginTop: '80px'
    },
    productsListWrapper: {
        width: '85%'
    }
}));

export const Shop = () => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <div className={classes.categoriesMenuWrapper}>
                <CategoriesMenu />
            </div>
            <div className={classes.productsListWrapper}>
                <ProductsList/>
            </div>
        </React.Fragment>
    )
};
