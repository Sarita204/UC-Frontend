export let initialState = {
  basket:
    JSON.parse(sessionStorage.getItem("basket")) === null
      ? []
      : JSON.parse(sessionStorage.getItem("basket")),
  user:
    JSON.parse(sessionStorage.getItem("user")) === null
      ? ""
      : JSON.parse(sessionStorage.getItem("user")),
};

export const getBasketTotal = (basket) =>
  basket?.reduce(
    // (amount, item) => (((item.product?.productprice + (item.product?.SGST/100 * item.product?.productprice) + (item.product?.CGST/100 * item.product?.productprice)) - (item.product?.productdiscount /100 * (item.product?.productprice + (item.product?.CGST /100 * item.product?.productprice) + (item.product?.SGST /100 * item.product?.productprice))) *  item.quantity) + amount, 0);
    (total, item) =>
      (item?.product.price +
        (item?.product.price * (item?.product.SGST + item?.product.CGST)) /
          100 -
        (item?.product.productdiscount *
          (item?.product.price +
            (item?.product.price * (item?.product.CGST + item?.product.SGST)) /
              100)) /
          100) *
        item?.quantity +
      total,
    0
  );

const Store = (state = initialState, action) => {
  switch (action.type) {
    case "addBasketItem":
      const index = state.basket.findIndex(
        (element) => element.product._id === action.item.product._id
      ); //.indexOf(action.item);

      if (index !== -1) {
        let value = state.basket[index];
        action.item.quantity = parseInt(value.quantity) + 1;
        //return{...state,basket:[...state.basket.splice(index,1,action.item)]};
        state.basket.splice(index, 1);
      }
      let newBasket = [...state.basket];
      newBasket.push(action.item);
      sessionStorage.setItem("basket", JSON.stringify(newBasket));
      return { ...state, basket: newBasket }; //[...state.basket,action.item]};
    case "deleteBasketItem":
      // Find the index of the item in the basket array based on its _id
      const delIndex = state.basket.findIndex(
        (item) => item._id === action.item._id
      );

      // Create a new array without the deleted item
      const updatedBasket = [
        ...state.basket.slice(0, delIndex),
        ...state.basket.slice(delIndex + 1),
      ];

      // Update sessionStorage
      sessionStorage.setItem("basket", JSON.stringify(updatedBasket));

      // Return the updated state
      return { ...state, basket: updatedBasket };

    case "emptyBasket":
      sessionStorage.setItem("basket", null);
      return { ...state, basket: [] };

    case "addquantity":
      const incr = state.basket.indexOf(action.item);
      //let value=state.basket[decr];

      // state.basket.splice(decr,1);
      action.item.quantity = parseInt(action.item.quantity) + 1;
      // state.basket.splice(incr, 1);
      let incBasket = [...state.basket];
      incBasket[incr] = action.item;
      sessionStorage.setItem("basket", JSON.stringify(incBasket));

      return { ...state, basket: incBasket }; //[...state.basket,action.item]};//:[...state.basket,action.item]};
    //   }

    case "subquantity":
      const decr = state.basket.indexOf(action.item);
      if (action.item.quantity > 1) {
        action.item.quantity = parseInt(action.item.quantity) - 1;
      }
      let decrBasket = [...state.basket];
      decrBasket[decr] = action.item;
      sessionStorage.setItem("basket", JSON.stringify(decrBasket));

      return { ...state, basket: decrBasket };

    default:
      return state;
  }
};

export default Store;
