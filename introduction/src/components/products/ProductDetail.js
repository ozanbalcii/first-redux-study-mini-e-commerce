import React from "react";
import SelectInput from "../toolbox/SelecetInput";
import TextInput from "../toolbox/TextInput";

const ProductDetail = ({categories, product, onSave, onChange}) => {
  return (
    <form onSubmit={onSave}>
      <h2>{product.id ? "Güncelle" : "Ekle"}</h2>
      <TextInput
        name="productName"
        label="Product Name"
        value={product.productName}
        onChange={onChange}
        error="Error"
      />
      <SelectInput
        name="categoryId"
        label="Category"
        defaultOption="Select"
        value={product.categoryId || ""}
        options={categories.map((category) => ({
          value: category.id,
          text: category.categoryName,
        }))}
        onChange={onChange}
        error="Error"
      />
      <button type="submit" className="btn btn-success">
        Save
      </button>
    </form>
  );
};
export default ProductDetail;
