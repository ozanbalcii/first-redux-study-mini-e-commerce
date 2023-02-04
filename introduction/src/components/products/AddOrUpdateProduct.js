import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {getCategories} from "../../redux/actions/categoryActions";
import {saveProduct} from "../../redux/actions/productActions";
import ProductDetail from "./ProductDetail";
import {useParams} from "react-router-dom";
import axios from "axios";
//! setState useState kullanılıyor, compenentDidMount yerine useEffect kullanılıyor.
function AddOrUpdateProduct({
  products,
  categories,
  getProducts,
  getCategories,
  saveProduct,
  history,
  ...props //! ****tüm props'ları al-genişlet. bunu HOOKS ile kullandığımızda yukardaki değişkenleri de props'lara ekle olarak kullanılıyor.****
}){
  //* örneğin ürün eklemek istediğimizde bazı değerleri sabit getirmek istersek:
  const [product, setProduct] = useState({ ...props.product }); //! state'deki product'ı setProduct ile set ediyoruz.
  useEffect(() => {
                 //! category'lere ihtiyac var fakat user direkt link ile product'a giderse, state'de category bilgisi olmaz, bundan dolayı useEffect kullanıyoruz.
                                                  //* categoryleri getiren sayfaya gelmemiştir
      // getCategories();
    
    setProduct({ ...props.product });                //* state'deki product'ı setProduct ile set ediyoruz.
  }, [props.product]);                                //! [props.product]--> product props'a DOM'a yerleştiğinde bu döngüyü bitir, bug'a girmemesi için.

  function handleChange(event) {
    const { name, value } = event.target;                   //! textBox'ın name ve value'su ile event'te bulunan target'daki name ve value'ya atıyoruz
    setProduct((previousProduct) => ({
      ...previousProduct,                                                   //! önceki product'ı extend(genişletmek, update etmek gibi yani) ediyoruz
      [name]: name === "categoryId" ? parseInt(value, 10) : value,              //* [önceki product'ın name değeri]:  hangi textBox'ı değiştiriyorsak onun alanını kontrol ediyoruz. eğer categoryId var ise değeri int yaptık. eğer categoryID gelmiyorsa value döndür
    }));
  }

  function handleSave(event) {
    event.preventDefault();                                                 //!  not refresh the page (sayfayı yenileme )
    saveProduct(product)                                                        //! product'ı saveProduct ile kaydediyoruz
      .then(() => {
        history.push("/"); //! histroy ile daha once geldiğimiz sayfalra yönlendirme yapılıyor
      });
  }
    //* return altında ilgili şeyin tasarımını koyduk. ProductDetail'da kullandığımız paramterelerin değerini koyuyoruz. statelerde bulunan propsları koyuyoruz
    return (<ProductDetail
        product={product}
        category={categories}
        onChange={handleChange}
        onSave={handleSave}/>)
}

export function getProductById(products, productId) { //* bulunmak istenen ürün ve id'si
  let product = products.find((product) => product.id === productId) || null;  //* her product üstünde geziyoruz ve bakıyoruz id'ye
  return product;
}

// function mapStateToProps(state, ownProps) {  //! ownProps: componentlerin kendi içersinde barındırdıkları propslar
//     const productId = ownProps.match.params.productId ; //! ownProps ile productId'yi alıyoruz
//     const product = productId && state.productListReducer.length > 0  //!state içerisinde product'ın id'sine göre products'ı bulmaya çalışıyoruz
//     ?getProductById(state.productListReducer, productId) //! eğer bir üstteki durum varsa, productId ye göre state içerisinde o id'deki products'ları çekiyoruz
//     : {}
//     return { //! mevcut state olusturuyoruz
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

   



//! Hooks aracılığıyla, APP'yi redux ile bağlamak için: (redux ile hooks arasındaki farklardan biri buradadır. redux ile buradaki kısmı karşılaştır)
const mapDispatchToProps = {
    getCategories,
    saveProduct
}



export default connect(ProductScreen, mapDispatchToProps)(AddOrUpdateProduct);
