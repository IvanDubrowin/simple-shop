import React from "react";
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import ContentCarousel from "../Carousel/Carousel";

const useStyles = makeStyles(theme => ({
    contentWrapper: {
        display: 'flex',
        flexDirection: 'column',
        padding: '8px'
    }
}));

const Content = ({ text }) => {
    const classes = useStyles()
    return (
        <div className={classes.contentWrapper}>
            <ContentCarousel/>
            <div dangerouslySetInnerHTML={{ __html: text }}></div>
        </div>
    )
};

const mapStateToProps = state => {
    return ({
        text: state.get('config').get('content').get('text')
    })
}

export default connect(mapStateToProps)(Content);