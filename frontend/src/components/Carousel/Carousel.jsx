import React from "react";
import { connect } from "react-redux";
import { Carousel } from 'react-responsive-carousel';
import { makeStyles } from "@material-ui/core/styles";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const useStyles = makeStyles({
    imageContainer: {
        height: 600
    }
});


const ContentCarousel = ({ first_image, second_image }) => {
    const classes = useStyles();

    return (
        <Carousel autoPlay={true}>
            <div className={classes.imageContainer}>
                <img src={first_image} />
            </div>
            <div className={classes.imageContainer}>
                <img src={second_image} />
            </div>
        </Carousel>
    )
}

const mapStateToProps = state => {
    return {
        first_image: state.get('config').get('carousel').get('first_image'),
        second_image: state.get('config').get('carousel').get('second_image'),
    }
}

export default connect(mapStateToProps)(ContentCarousel);