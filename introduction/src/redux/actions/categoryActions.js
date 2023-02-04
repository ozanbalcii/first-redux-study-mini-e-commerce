import * as actionTypes from './actionTypes';

export function changeCategory(categories) {
    return { type: actionTypes.CHANGE_CATEGORY, payload: categories }

}

export function getCategoriesSuccess(categories) { //! GET_CATEGORIES_SUCCESS bu actions için yeni state=categories olsun
    return { type: actionTypes.GET_CATEGORIES_SUCCESS, payload: categories }
}

export function getCategories(){ //! api'den categoryleri çektik.(front-backend iletişimi gibi bişey)
    return function(dispatch){
        // debugger; //! burda hata varsa burda durur, mantığı şudur: fonksiyonda buraya kadar geliyor mu gelmiyor mu diye görebiliriz(google'da)
        let url = "http://localhost:3000/categories";
        return fetch(url)
        .then(response => response.json())  //! Her then bir önceki then'in sonucuyla ilgilenir
        .then(result => dispatch(getCategoriesSuccess(result)));
    }
}