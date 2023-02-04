import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {getCategories} from "../../redux/actions/categoryActions";
import {saveProduct} from "../../redux/actions/productActions";
import ProductDetail from "./ProductDetail";
import {useParams} from "react-router-dom";
import axios from "axios";

function AddOrUpdateProduct({
  products,
  categories,
  getProducts,
  getCategories,
  saveProduct,
  history,
  ...props 
}){
  const [product, setProduct] = useState({ ...props.product }); 
  useEffect(() => {
    setProduct({ ...props.product });               
  }, [props.product]);                               

  function handleChange(event) {
    const { name, value } = event.target;                  
    setProduct((previousProduct) => ({
      ...previousProduct,                                                   
      [name]: name === "categoryId" ? parseInt(value, 10) : value,              
    }));
  }

  function handleSave(event) {
    event.preventDefault();                                             
    saveProduct(product)                                                       
      .then(() => {
        history.push("/"); 
      });
  }
    return (<ProductDetail
        product={product}
        category={categories}
        onChange={handleChange}
        onSave={handleSave}/>)
}

export function getProductById(products, productId) { 
  let product = products.find((product) => product.id === productId) || null;  
  return product;
}

// function mapStateToProps(state, ownProps) {  
//     const productId = ownProps.match.params.productId ; 
//     const product = productId && state.productListReducer.length > 0  
//     ?getProductById(state.productListReducer, productId) 
//     : {}
//     return {
//         product,
//         products: state.productListReducer,
//         categories: state.categoryListReducer
//     }
// }

function ProductScreen() {
  const[setProduct]=useState([]);
  const { id } = useParams();

  useEffect((state)=>{
    async function fetchProduct(){
         const {data}= await axios.get('/api/products/'+id)
         setProduct(data)
     }
     fetchProduct()
 })
}
  
const mapDispatchToProps = {
    getCategories,
    saveProduct
}
export default connect(ProductScreen, mapDispatchToProps)(AddOrUpdateProduct);
