import React from "react";
import { connect } from "react-redux";
import Carousel from 'react-responsive-carousel/lib/components/Carousel';
import { makeStyles } from "@material-ui/core/styles";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const useStyles = makeStyles(theme => ({
    imageContainer: {
        height: '100%'
    }
}));

const ContentCarousel = ({ firstImage, secondImage }) => {

    const classes = useStyles();

    return (
        <Carousel
            autoPlay={true}
            infiniteLoop={true}
            showThumbs={false}
            showStatus={false}
            interval={7000}
        >
            <div className={classes.imageContainer}>
                <img src={firstImage} alt=""/>
            </div>
            <div className={classes.imageContainer}>
                <img src={secondImage} alt =""/>
            </div>
        </Carousel>
    )
}

const mapStateToProps = state => {
    return {
        firstImage: state.get('config').get('carousel').get('first_image'),
        secondImage: state.get('config').get('carousel').get('second_image'),
    }
}

export default connect(mapStateToProps)(ContentCarousel);