import "../style/styles.css";
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Cart from "../component/cart";

class CartContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItem: props.cartItem,
      productList: props.productList
    };
  }

  render() {
    return (
      <Cart
        cartItem={this.state.cartItem}
        productList={this.state.productList}
      />
    );
  }
}

CartContainer.propTypes = {
  cartItem: PropTypes.array,
  productList: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    cartItem: state.cart.cartItem,
    productList: state.product.productList
  };
};

export default connect(mapStateToProps, null)(CartContainer);
