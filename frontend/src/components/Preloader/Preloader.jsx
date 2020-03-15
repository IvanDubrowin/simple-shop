import React from "react";
import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    spinner: {
        minHeight: 'initial',
        position: 'absolute',
        top: '45%',
        left: '50%'
    }
}));

const Preloader = () => {
    const classes = useStyles();
    return <CircularProgress disableShrink className={classes.spinner} />
}

export default Preloader;