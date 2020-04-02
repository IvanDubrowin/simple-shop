import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    notFoundWrapper: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: '520px',
        width: '100%',
        lineHeight: '1.4',
        textAlign: 'center',
        paddingBottom: '220px',
        paddingLeft: '10px'
    },
    notFound: {
        position: 'relative',
        height: '240px',
    },
    notFoundH1: {
        fontFamily: "'Montserrat', sans-serif",
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: '252px',
        fontWeight: 900,
        margin: '0px',
        color: '#262626',
        textTransform: 'uppercase',
        letterSpacing: '-40px',
        marginLeft: '-20px',
        '& > span': {
            textShadow: '-8px 0px 0px #fff'
        }
    },
    notFoundH3: {
        fontFamily: "'Cabin', sans-serif",
        position: 'relative',
        fontSize: '16px',
        fontWeight: 700,
        textTransform: 'uppercase',
        color: '#262626',
        margin: '0px',
        letterSpacing: '3px'
    }

}))

const NotFound = () => {
    const classes = useStyles()

    return (
        <div className={classes.notFoundWrapper}>
            <div className={classes.NotFound}>
                <h3 className={classes.notFoundH3}>
                    Упс! Страница не найдена
                </h3>
                <h1 className={classes.notFoundH1}>
                    <span>4</span>
                    <span>0</span>
                    <span>4</span>
                </h1>
            </div>
        </div>
    )
}

export default NotFound