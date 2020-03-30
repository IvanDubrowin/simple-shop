import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({}))

const Cart = ({ items }) => {
    return <div></div>
}

const mapStateToProps = state => {
    return {
        items: state.get('cart').get('items')
    }
}

export default connect(mapStateToProps, null)(Cart);
