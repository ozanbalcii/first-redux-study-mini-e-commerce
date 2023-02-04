import React from "react";
import SelectInput from "../toolbox/SelecetInput";
import TextInput from "../toolbox/TextInput";

//! hooks kullandıgımız için bu parametrelerden direkt olarak porpsları alabiliyoruz.
const ProductDetail = ({categories, product, onSave, onChange}) => {
  //! product için tasarım yapıyoruz:
  return (
    <form onSubmit={onSave}>
      {/* Product'ın id'si varsa güncelle yazsın  */}
      <h2>{product.id ? "Güncelle" : "Ekle"}</h2>
      <TextInput
        name="productName"
        label="Product Name"
        value={product.productName}
        onChange={onChange}
        error="Hata"
      />
      <SelectInput
        name="categoryId"
        label="Category"
        defaultOption="Select"
        value={product.categoryId || ""}
        options={categories.map((category) => ({
          //!state'deki categories'leri map edip, her bir category için obje döndürüyoruz
          value: category.id,
          text: category.categoryName,
        }))}
        onChange={onChange}
        error="Hata"
      />
      <button type="submit" className="btn btn-success">
        Save
      </button>
    </form>
  );
};

export default ProductDetail;
