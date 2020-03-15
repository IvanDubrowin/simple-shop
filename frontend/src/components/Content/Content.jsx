import React from "react";
import { connect } from "react-redux";
import ContentCarousel from "../Carousel/Carousel";

const Content = ({ text }) => {

    return (
        <React.Fragment>
            <ContentCarousel />
            <div dangerouslySetInnerHTML={{ __html: text }}></div>
        </React.Fragment>
    )
};

const mapStateToProps = state => {
    return ({
        text: state.get('config').get('content').get('text')
    })
}

export default connect(mapStateToProps)(Content);