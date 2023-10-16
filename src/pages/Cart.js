import React, { useEffect, useState } from 'react';
import '../styles/cardItem.css';
import Delivery from '../components/Delivery';
// import Additem from '../components/Additem';

export default function Cart({cartreciveFun}) {
  const [getData,setGet_data] = useState([]);

  const [isModalShow,setIsModalShow] = useState(false);
  const [qtyValue,setQtyValue] = useState()

  useEffect(() => {
    // Load the cart from localStorage when the component mounts
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setGet_data(storedCart);
     //  ------------------------------Api get Method---------------------
  }, []);


  //  ------------------------------ Adding Cart Total Amount and values --------------------------------------

  function sumTotal(arrNumber) {
    cartreciveFun(getData.length);
    // console.log(getData.length,"cart length");
    return arrNumber.reduce((acc, currentValue) => acc + currentValue, 0);

  }
  
  const TotalValus = getData.map(events => events.item_price * events.item_qty);
  const result = sumTotal(TotalValus);

  //  ------------ To formatted into  currency Simbols ------------------------------

  const formattedAmount = Math.round(result);

  // const formattedAmount = result.toLocaleString('en-IN', {
  //   style: 'currency',
  //   currency: 'INR',
  // });


  const updateCart = (cartValue) => {
    // Update the cart in component state
    setGet_data(cartValue);
  // Update the cart in localStorage
  localStorage.setItem('cart', JSON.stringify(cartValue));

  }

  const addToCart = (item) => {
    // Check if the item is already in the cart
    const existingItemIndex = getData.findIndex((cartItem) => cartItem.item_id === item.item_id);

    if (existingItemIndex !== -1) {
      // Item is already in the cart, update its quantity
      const updatedCart = [...getData];
      updatedCart[existingItemIndex].item_qty += 1;
      updateCart(updatedCart);
    } else {
      // Item is not in the cart, add it
      const updatedCart = [...getData, { ...item, item_qty: 1 }];
      updateCart(updatedCart);
    }
  };
  const removeFromCart = (item) => {
    // Find the item in the cart
    const existingItemIndex = getData.findIndex((cartItem) => cartItem.item_id === item.item_id);

    if (existingItemIndex !== -1) {
      const updatedCart = [...getData];
      // Decrease the item quantity and remove it if quantity becomes zero
      updatedCart[existingItemIndex].item_qty -= 1;

      if (updatedCart[existingItemIndex].item_qty === 0) {
        updatedCart.splice(existingItemIndex, 1);
      }

      updateCart(updatedCart);
    }
  };
//  console.log(getData,'getdata'); 


//   // qty get data 
//   const qtyGetData = (value) => {
//     console.log("im, child value " ,value)
//     setQtyValue(value);
// }
  return (
    <>
    <div className="modal fade" id="CartViewDirectDelivery" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
              <div className="modal-dialog modal-fullscreen-sm-down">
                <div className="modal-content">
                  <div className="modal-header d-flex gap-2">
                    <div className=''>
                    <span className='ms-3 p-1'>Delivery Details</span>
                    </div>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> 
                  </div>
           {/* ----------------- display  modal body -------- */}
                  <div className="modal-body">
           {/* ----------------- display  carts views-------- */}
              
           {isModalShow ===  true ? <></> : <Delivery formattedAmount={formattedAmount} /> }
                  </div>
                </div>
              </div>
            </div>


    <div className=' px-2 w-100 cartsWrapper' >
      {getData.length <= 0 ?
      <div className='w-100'>
        <div className='m-auto text-center emptyCart_moblieView' >
            <img src="assests/emptyCart_moblieView.png" className='w-50  m-auto front_corsur ' alt='no image found' />
            <p>Your Cart is empty!</p>
            <p>Looks like you haven't added any items <br/> to your cart yet.</p>
            <button className='btn border px-4 rounded-pill bg-success text-white py-2 fs-6'>ADD items TO CART</button>
        </div>
      </div> :

      <div className='row w-100'>
        <div className='col-lg-7 d-none d-lg-block pt-lg-4 border '>
            <div className='w-75 m-auto '>
            <p className='mt-2 fw-bold fs-3'>How Would You Like Your Order? </p>
            <p className='mt-2 cart_CUSTOMIZE_Text'>Choose <span className='CartDeliveryOptionText'>Pickup</span> or <span className='CartDeliveryOptionText'>Delivery</span> to suit your convenience.</p>
              <Delivery />
            </div>
        </div>
        <div className='col-12 col-lg-4 position-relative'> 
        <div className='d-flex flex-column px-3 overflow-auto cartAreaItems pt-4'>
        <div className='my-order w-100 fs-6 fw-bold py-3 d-flex align-items-center'><div className='OrderOption'><img src='assests/ordericon.png' className='w-100' alt='no image found' /></div><div className='ps-1'>Your Order</div></div>
                {/* {cart.length} */}
                {getData.map((e, index) => (
                    <div className="card border-0 mb-2 cartAreaItemsOuter shadow" style={{ maxWidth: 100 + "%" }} key={index}>
                      <div className="row px-3 cartAreaItemsInner">
                        <div className="col-md-4 col-4 rounded text-start cartAreaItemsOuter_div py-2 px-1" >
                          <img src={e.item_image} className="img-fluid rounded cartAreaItemsOuter_img" alt="no image found" />
                        </div>
                        <div className="col-md-8 col-7">
                          <div className="card-body">
                            <div className=''>
                              <h5 className="card-title asideCartHeader" >{e.item_name}</h5>
                              <div className="card-price SideCardprice d-flex"><i className="bi bi-currency-rupee "></i><span>
                                {getData.map((item, index) => (
                                  <div key={index} className=''>
                                    {item.item_id == e.item_id ? + (item.item_qty * item.item_price).toFixed(2) : <></>}
                                  </div>
                                ))}
                              </span>
                              </div>
                            </div>
                            <div className='mt-3'>
                              {getData.map((item, index) => (
                                <div key={index} className='d-flex gap-3 align-item-center '>
                                  {item.item_id == e.item_id ? <>
                                    <button className='btn border' onClick={() => removeFromCart(item)}>-</button>
                                    <div className='p-1 d-flex align-items-center'>{item.item_qty}</div>
                                    <button className='btn border' onClick={() => addToCart(item)}>+</button></>
                                    : <></>}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>                                    
                  ))}
                    {/*--------------------------- Total Amount Component here ------------------------- */}
                    
              </div>
              <div className='cartFooterWrapper rounded d-none d-lg-block' >
                            <div className=' row w-100 '>
                              <div className='col-12 py-2'><p className="w-100 fw-bold ps-2 d-flex justify-content-between " ><span>Total Items</span><span className='text-white pe-2'>{getData.length}</span></p></div>
                              <div className='col-12 py-2 '><p className="w-100 pt-2 fw-bold ps-2 d-flex justify-content-between"><span>Total Amount</span><span className='text-white pe-2'><i className="bi bi-currency-rupee "></i>{formattedAmount}</span></p></div>
                              </div>        
              </div>

              <div className='container footerCartrMb rounded position-fixed d-lg-none'>
              <div className='row text-white p-2 rounded  d-flex justify-content-between align-items-center'>
                    <div className='col-5'>
                      {/* <div className='fw-bold items'><span className='items_Animation'>{getData.length} {getData.length > 1 ? "Items" : "Item"} </span><i data-bs-toggle="modal" data-bs-target="#staticBackdrop" className="bi bi-chevron-up upArrowModalBtn front_corsur text-white"></i></div> */}
                      <div className='fw-bold items'><span className='items_Animation'>{getData.length} {getData.length > 1 ? "Items" : "Item"} </span></div>
                      <div className='fw-bold totalText'>Total:{formattedAmount}</div>
                    </div>
                    <div className='col-7 text-end'><button type="button"  className="btn p-1 footerCartrMb_OrdeBtn text-success" data-bs-toggle="modal" data-bs-target="#CartViewDirectDelivery"><i className="bi bi-whatsapp pe-1 whatsAppICon" ></i>Order on Whatsapp <i class="bi bi-arrow-right-circle-fill"></i></button></div>
                  </div>
            </div>
        </div>
      </div>
    }
      
      </div>
    </>
  )
}
