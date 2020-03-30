import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import grey from '@material-ui/core/colors/grey';

const useStyles = makeStyles(theme => ({
    stickToBottom: {
        backgroundColor: grey[300],
        textAlign: 'center',
        minHeight: '19px',
        padding: '17px',
        flexShrink: 0
    },
}));

export const Footer = () => {
    const classes = useStyles();

    return (
        <footer className={classes.stickToBottom}>footer</footer>
    )
};