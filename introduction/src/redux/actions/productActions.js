import * as actionTypes from "./actionTypes";

export function getProductsSuccess(products) {
  //! GET_CATEGORIES_SUCCESS bu actions için yeni state=categories olsun
  return { type: actionTypes.GET_PRODUCTS_SUCCESS, payload: products };
}

export function createProductSuccess(product) {
  return { type: actionTypes.CREATE_PRODUCT_SUCCESS, payload: product };
}
export function updateProductSuccess(product) {
  return { type: actionTypes.UPDATE_PRODUCT_SUCCESS, payload: product };
}

export function saveProductApi(product) {
    return fetch(
      "http://localhost:3000/products/" + (product.id || ""), //! adresten productların id'si varsa, method'dan devam yoksa boş döndür
      {
        method: product.id ? "PUT" : "POST",                      //! product.id varsa PUT yoksa POST yap
        headers: { "Conent-Type": "application/json" },           //! api yi json yaptık
        body: JSON.stringify(product),                            //! body: adrese gönderdiğimiz datadır. gönderdiğimiz data'yı string yaptık. çünkü requestler stringtir.
      }
    )
      .then(handleResponse)
      .catch(handleError);
  }

export function saveProduct(product) { //! kısaca mantık id varsa update yapılacak ilgili ürüne, id yoksa yeni üründür ekleme yapılacak api'ye
    return function(dispatch) {
        //! saveProductApi(product) ::::> yukarda fetch'i çağırmıstık, spagetti kod yazmamak için yukardakini direkt aldık  
        return saveProductApi(product)               //* veritabanına save edildi
        .then(savedProduct => {                         //* eklenecek olan veriyi  redux'a yolluyoruz burada
            product.id?dispatch(updateProductSuccess(savedProduct)) : dispatch (createProductSuccess(savedProduct)) //? id varsa updateProductSuccess'i çalıştır, yoksa createProductSuccess
        })
        .catch(error=> {throw error});
    }
}

export async function handleResponse(response) { //! saveProductApi'daki response'nin cevabına göre buarada karar veriyoruz
    if (response.ok) {
      return response.json();
    }
    const error = await response.text();
    throw new Error(error);
}

export function handleError(error) {  //! saveProductApi'daki error'a gelirse..
    console.error("Bir hata oluştu");
    throw error;
}

export function getProducts(categoryId) {
  //* products are exported to database or api
  return function (dispatch) {
    // debugger; //! burda hata varsa burda durur, mantığı şudur: fonksiyonda buraya kadar geliyor mu gelmiyor mu diye görebiliriz(google'da)
    let url = "http://localhost:3000/products";
    if (categoryId) {
      url = url + "?categoryId=" + categoryId; //? kullandıgımız api'ye göre yazdık bunu, yani bu şuanki apinin özelliği
    }
    return fetch(url)
      .then((response) => response.json()) //! Her then bir önceki then'in sonucuyla ilgilenir
      .then((result) => dispatch(getProductsSuccess(result)));
  };
}





