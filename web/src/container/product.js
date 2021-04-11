import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ProductInfo from "../component/product";
import { addToCart } from "../action";

class ProductContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      productId: props.productId,
      name: props.productObj.name,
      price: props.productObj.price,
      addToCart: props.addToCart
    };
  }

  render() {
    return (
      <ProductInfo
        productId={this.state.productId}
        name={this.state.name}
        price={this.state.price}
        addToCart={this.state.addToCart}
      />
    );
  }
}

ProductContainer.propTypes = {
  productObj: PropTypes.object,
  productId: PropTypes.string,
  addToCart: PropTypes.func
};

const mapStateToProps = (state, props) => {
  let id = props.match.params.productId;
  return {
    productObj: state.product.productList[id],
    productId: id
  };
};

export default connect(mapStateToProps, { addToCart })(ProductContainer);
