import React ,{useState,useEffect} from 'react';
import SearchItems from '../components/SearchItems';


export default function Portfolio() {

  const [cart, setCart] = useState([]);
  const [alertOfAddCart,setAlertOfAddCart] = useState(false);


  useEffect(() => {
    // Load the cart from localStorage when the component mounts
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);
  // ---------------------------------- Aside Carts items Updating function here --------------------------------

const updateCart = (updatedCart) => {
  // Update the cart in component state
  setCart(updatedCart);
  // Update the cart in localStorage
  localStorage.setItem('cart', JSON.stringify(updatedCart));

  // cart value increase
};

  // ---------------------------------- Aside and Main Carts items Adding function here --------------------------------
  const addToCart = (item) => {
    // Check if the item is already in the cart
    const existingItemIndex = cart.findIndex((cartItem) => cartItem.item_id === item.item_id);

    if (existingItemIndex !== -1) {
      // Item is already in the cart, update its quantity
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].item_qty += 1;
      updateCart(updatedCart);

    } else {
      // Item is not in the cart, add it
      const updatedCart = [...cart, { ...item, item_qty: 1 }];
      updateCart(updatedCart);
    }
    // handleClick();

    // --------------------- set Toasted toggle -------------------------- 
    setAlertOfAddCart(true);

    setTimeout(() => {

      setAlertOfAddCart(false);

    }, 1000);
  };

  // ---------------------------------- Aside Carts items Removing function here --------------------------------   

  const removeFromCart = (item) => {
    // Find the item in the cart
    const existingItemIndex = cart.findIndex((cartItem) => cartItem.item_id === item.item_id);

    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      // Decrease the item quantity and remove it if quantity becomes zero
      updatedCart[existingItemIndex].item_qty -= 1;

      if (updatedCart[existingItemIndex].item_qty === 0) {
        updatedCart.splice(existingItemIndex, 1);
      }

      updateCart(updatedCart);
    }
  };
  return (
    <>
    <SearchItems addToCart={addToCart} removeFromCart={removeFromCart} alertOfAddCart={alertOfAddCart}/>
    </>
  )
}
