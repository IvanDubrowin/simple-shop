import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    stickToBottom: {
        backgroundColor: '#1983AB',
        textAlign: 'center',
        height: '20px',
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