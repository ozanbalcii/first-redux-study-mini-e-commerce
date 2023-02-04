import React, { Component } from "react";
import { connect } from "react-redux";
import { ListGroup, ListGroupItem, Badge } from "reactstrap";
import { bindActionCreators } from "redux";
import * as categoryActions from "../../redux/actions/categoryActions";
import * as productActions from "../../redux/actions/productActions";

class CategoryList extends Component {
  componentDidMount() {
    //! ÇOK ÖNEMLİ!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //* altta category'leri getirmek için yaptıgımız şeyi h3'de kullandık
    //* altta actionlaro propsa bağlıyoruz o yüzden this.props.actions.getcategory... diye yaptık. kodu takip edersek mantıgını anlarız
    this.props.actions.getCategories(); //! kısaca burada uygulama açıldıgında state değişiyor, ( category'leri çekiyoruz yani categoryler geliyor)
    //! actions.getCategories çalışıyor -> getCategories'de getCategoriesSuccess'i çalıştırıyor -> getCategoriesSuccess'de actionTypes.GET_CATEGORIES_SUCCESS bunu çalıştırdğınıdan dolayı categoryListReducer çalışıyor -> categoryListReducer burda da state'i payload vermiştik, payload'da category bilgileri vardır ve categoryler gelmektedir.
    //? NOT: KONTROL ETMEK İÇİN ALTTA DİVİN İÇİNE  <h3>Categories: {this.props.categories.length}</h3>  YAZARAK UZUNLUK GELİYORSA CATEGORY DATASI DA GELİYOR KONTROLÜ YAPABİLİRİZ
  }

  selectCategory = (category) => {
    this.props.actions.changeCategory(category);
    this.props.actions.getProducts(category.id);
  };

  render() {
    return (
      <div>
        <h2>
          <Badge color="warning">Categories</Badge>
        </h2>
        <ListGroup action active>
          {this.props.categories.map((category) => (
            //! bunun içindeki onClick: changeCategory ile seçili category'yi getirme.    active={category.id===this.props.currentCategory --> seçilen mavi olur
            <ListGroupItem
              color="success"
              active={category.id === this.props.currentCategory.id}
              onClick={() => this.selectCategory(category)}
              key={category.id}
            >
              {category.categoryName}
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    );
  }
}

//! belirlediğimiz state'i props'a bağla:
function mapStateToProps(state) {
  return {
    //! state'de bulunan reducerları currentCategory'e map et.
    currentCategory: state.changeCategoryReducer,
    categories: state.categoryListReducer,
  };
}

//! action'ları props'a bağla:
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      //! category'leri getirmek için:
      getCategories: bindActionCreators(
        categoryActions.getCategories,
        dispatch
      ), //! parametre olarak dispatch(sevk etmek)

      //! seçili category'yi getirmek için:
      changeCategory: bindActionCreators(
        categoryActions.changeCategory,
        dispatch
      ),
      getProducts: bindActionCreators(productActions.getProducts, dispatch),
    },
  };
}

//! export edip connect ile redux'a bağlanıyoruz
export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
