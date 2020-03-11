import React from "react";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    categoriesMenuWrapper: {
        width: '85%',
        minHeight: 'calc(100vh - 53x)c',
        background: '#ccc',
        float: 'right'
    },
    productsListWrapper: {
        width: '15%',
        minHeight: 'calc(100vh - 53px)',
        background: '#c00',
        marginRight: '70%'
    }
}));

export const Shop = () => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <div className={classes.categoriesMenuWrapper}></div>
            <div className={classes.productsListWrapper}></div>
        </React.Fragment>
    )
};