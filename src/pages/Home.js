import React, { useEffect, useState, useRef } from 'react'
import Delivery from '../components/Delivery';
// import Cards from './Cards';
import ShoppingCart from './ShoppingCart';
import axios from 'axios';
import TestingPagelodaing from '../components/TestingPagelodaing'
import { Button, Modal } from 'react-bootstrap';
import SearchItems from '../components/SearchItems';
import { Link, useNavigate } from 'react-router-dom';
import ConformationForm from '../components/ConformationForm';

export default function Home({inputRef,cartItems}) {

  // const api = "http://localhost:5000/comments";
  const [s,sets] = useState('1')

  const [cart, setCart] = useState([]);
  // const [totalAmount, SetTotalAmount] = useState([]);
  const [itemsSearch,setItemsSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  //--------------------------------- Axois Api key  -----------------------
  const [apiData, setApiData] = useState([]);

  //--------------- search button refference-----------------
  // const inputRef = useRef(null);

   // change button text
   const [buttonText, setButtonText] = useState('Add');

  // -------------------- add to carts animation in css -----------------------
    const [isClicked, setIsClicked] = useState(false);

     //------------- alert Add to carts toasted----------

     const [alertOfAddCart,setAlertOfAddCart] = useState(false);

    // ------------------- Model show and hide -------------------------
    const [show, setShow] = useState(false);

     // device Token =----------------
   const [deviceToken,setDeviceToken] = useState();
   const [CheckToken,setCheckToken] = useState();

   


    //  otpm submit then carts value none call state

    const [cartEmptyAfterOtpSub,setCartEmptyAfterOtpSub] = useState(false)

    // testing remove add text....
    const [testing,settesting] = useState(false)

    // add animation for bottom
    const [addAnimi,setAnimi] = useState(false);


    function generateRandomToken(length) {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let token = '';
      for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      token += characters.charAt(randomIndex);
      }
      return token;
     }

     const DeviceTokeFun = (token) => {

        
      // Update the cart in component state
      setDeviceToken(token);
      // Update the cart in localStorage
      localStorage.setItem('DeviceToken', JSON.stringify(token));
      
      // cart value increase
      };

    const handleShow = () => {
      setShow(true);
      if(deviceToken === undefined){
        const generateRandom = generateRandomToken(30);
        DeviceTokeFun(generateRandom);
    }
    };


    const handleClose = () => setShow(false);

  useEffect(() => {
    // Load the cart from localStorage when the component mounts
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);

     //  ------------------------------Api get Method---------------------
     fetchData();
     localStorage.setItem('DeviceToken', JSON.stringify(''));
  }, [cartEmptyAfterOtpSub]);

  useEffect(() => {
    // get device token
    const deviceToken = JSON.parse(localStorage.getItem('DeviceToken')) || [];
    setCheckToken(deviceToken);
},[])
    //  ---------------------------------- Fetch Api Axois Methods -------------------------

    const fetchData = async () => {
      try {
        const response = await axios.get('https://zukachocolates.com/wp-json/wc/v3/products?consumer_key=ck_96cb3ae76e2e7faa977b08924c460f4409a5385e&consumer_secret=cs_0f78e3a6d65f0caeb6b3551a18e9285bbb6d9b5a');
        
        setApiData(response.data);
      } catch (error) {

        console.error('Error fetching data:', error);
        // Handle errors here
      }
    };
  
    // -------------------- add to carts animation in css -----------------------
    const handleClick = () => {
      // Handle the click event here
      setIsClicked(true);
  
      // Perform other actions if needed
      alert('Button clicked!');
    };
  
  // ------------------ filter carts items -----------------------
  const handleSearch = (event) => {
    
    const inputvalueGet = event;
    setItemsSearch(inputvalueGet); 
        
    const filtered = []; 
    // const filtered = biriyanilist.filter(item =>
    //   item.title.toLowerCase().includes(inputvalueGet.toLowerCase())
    // );

    setFilteredData(filtered);

  }; 

  //-------------------------------- increase cart values 

  //  ------------------------------ Adding Cart Total Amount and values --------------------------------------

  function sumTotal(arrNumber) {
    cartItems(cart.length)
    return arrNumber.reduce((acc, currentValue) => acc + currentValue, 0);

  }
  
  const TotalValus = cart.map(events => events.item_price * events.item_qty);
  const result = sumTotal(TotalValus);

  // Round off the result to two decimal places (adjust as needed)
  const formattedAmount = Math.round(result);

  //  ------------ To formatted into  currency Simbols ------------------------------

  // const formattedAmount = roundedResult.toLocaleString('en-IN', {
  //   style: 'currency',
  //   currency: 'INR',
  // });

// ---------------------------------- Aside Carts items Updating function here --------------------------------

const updateCart = (updatedCart) => {
  // Update the cart in component state
  setCart(updatedCart);
  // Update the cart in localStorage
  localStorage.setItem('cart', JSON.stringify(updatedCart));

  // cart value increase
};

// anime function 

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
    setAnimi(true);
    setTimeout(() => {
    setAnimi(false);
      setAlertOfAddCart(false);

    }, 1500);
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
        sets('1');
        updatedCart.splice(existingItemIndex, 1);
      }

      updateCart(updatedCart);
    }
  };

 

  
  return (
    <>
      <div className='d-flex col-lg-11 col-12 homeMainDiv' style={{width:"95%"} }>
        <div className='px-md-4 py-3 col-12 col-lg-9 position-relative'>
          {/*------------------------------------- The Header components here---------------------  */}
          <header className='d-flex flex-row align-items-center justify-content-center'>
            <div className='logo col-3 col-sm-2  text-center'>
              <img src="zukaImage/Zuka-Logo.png" className='w-50 rounded-2 front_corsur ' alt='no image found' />
            </div>
            <div className='col-9 col-md-10 px-lg-2 pe-3' >
              {/* <p className=' mb-1 text-center text-lg-start font-monospace text-muted promotionText'><i class="bi bi-emoji-smile-upside-down text-warning"></i> Freshly Cooked, Always Delicious!</p> */}
              <input  ref={inputRef} className="form-control p-lg-2 rounded-pill" name={itemsSearch} onChange={((e) => handleSearch(e.target.value))} type="search" placeholder="What would you like to eat?" id="example-search-input" />
            </div>
            {/* <div className='col-1 col-md-2'>
              <i className="bi bi-filter front_corsur filler_icon" ></i>
            </div> */}
          </header>
          {/*------------------------------------- The panner components here---------------------  */}
          <div id="carouselExampleIndicators" className="carousel slide p-3 " data-bs-ride="carousel">
            <div className="carousel-indicators">
              <div>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-current="true" aria-label="Slide 1"></button>
              </div>
            </div>
            <div className="carousel-inner">
            <div className="carousel-item active">
                <img src="zukaImage/banner1.jpeg" className="panner_image d-none d-lg-block" alt="no image found" />
                <img src="zukaImage/banner1_smallScale.png" className="panner_image  d-lg-none" alt="no image found" />
              </div>
              <div className="carousel-item ">
                <img src="zukaImage/banner2.jpeg" className="panner_image  d-none d-lg-block" alt="no image found" />
                <img src="zukaImage/banner2_smallScale.png" className="panner_image d-lg-none" alt="no image found" />
              </div>
            </div>
          </div> 
  

          {/* ------------------------------------- The Avaible items Filters Buttom components here---------------------  */}
                  {/* if you want set the Avaible items Filters Buttom here */}

          {/*------------------------------------- The Available cart Item Displays components here---------------------  */}
          <div className='d-flex gap-2 flex-wrap py-2 card_Main position-relative'>
            
            <TestingPagelodaing Cartdetails={cart} s={s} addToCart={addToCart} removeFromCart={removeFromCart} formattedAmountSendToMb={formattedAmount} filteredData ={filteredData} itemsSearchValue={itemsSearch} buttonText={buttonText} alertOfAddCart={alertOfAddCart} CartEmptyAfterOtpSub={setCartEmptyAfterOtpSub} testing={testing} addAnimi={addAnimi}/>
            {/* <ShoppingCart Cartdetails={cart} addToCart={addToCart} removeFromCart={removeFromCart} formattedAmountSendToMb={formattedAmount} filteredData ={filteredData} itemsSearchValue={itemsSearch} buttonText={buttonText}/> */}
          </div>

        {/*------------------------------------- The Main Session to be end.... ---------------------  */}

        {/* --------------------------------------------- modal start ----------------------------------- */}

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        <h1 className="modal-title fs-5 fw-bold" id="staticBackdropLabel">Your Order details</h1>
        </Modal.Header>
        <Modal.Body>
                {/* <Delivery  handleClose={handleClose}/> */}
                <ConformationForm    setCart={updateCart} CartEmptyAfterOtpSub={setCartEmptyAfterOtpSub} deviceToken={deviceToken}/> 
        </Modal.Body>
      </Modal>
        
        {/* <div class="modal fade" id="HomeOrderOnWhatsapp" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">Order Details</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button>
              </div>
              <div class="modal-body">
                <Delivery />
              </div>
            </div>
          </div>
        </div> */}
        {/* -------------------------------------------------model end--------------------------- */}
        </div>
        {/*------------------------------------- the Aside components here---------------------  */}

        <div className='col-lg-3 d-lg-block d-none asideBg_color position-relative min-vh-100'>
          <div className=' d-flex flex-column align-items-center position-sticky top-0 ' >
            <div className='my-order w-100 fs-6 fw-bold ps-4 py-3 d-flex align-items-center'><div className='OrderOption'><img src='assests/ordericon.png' className='w-100' alt='no image found' /></div><div className='ps-1'>Your Order</div></div>
            <div className='w-100 d-flex flex-column align-items-center border-bottom positon-relative'>
              {/*------------------------------------- The Aside Cart Adding and displaying components here---------------------  */}
              <div className='d-flex flex-column px-3 cartItems_Scroll overflow-auto'>
                {/* {cart.length} */}
                {cart.length == 0 ?
                  <div className='mx-auto w-75 text-center ' >
                  <img src="assests/emptyCart_moblieView.png" className='w-100  m-auto front_corsur ' alt='no image found' />
                  <p>Your Cart is empty!</p>
                  {/* <p>Looks like you haven't added any items <br/> to your cart yet.</p> */}
              </div>
                  :
                  cart.map((e, index) => (
                    <div className="card border-0 mb-1" style={{ maxWidth: 300 + "px" }} key={index}>
                      <div className="row px-3">
                        <div className="col-md-4 rounded py-2">
                          <img src={e.item_image} className="img-fluid rounded" alt="no image found" />
                        </div>
                        <div className="col-md-8">
                          <div className="card-body">
                            <div className=''>
                              <h5 className="card-title asideCartHeader" >{e.item_name.slice(0,35)}...</h5>
                              <div className="card-price SideCardprice d-flex"><i className="bi bi-currency-rupee "></i><span>
                                {cart.map((item, index) => (
                                  <div key={index} className=''>
                                    {item.item_id == e.item_id ?  (item.item_qty * item.item_price).toFixed(2) : <></>}
                                  </div>
                                ))}
                              </span>
                              </div>
                            </div>
                            <div className='mt-1'>
                              {cart.map((item, index) => (
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
              {/*------------------------------------- The delivery components here---------------------  */}
              {/* <div className='deliveryArea mt-lg-5 border-1 border-warning border-top w-100'> */}
              {/* <div className='position-fixed bottom-0 asideBg_color_footer pt-3 pb-1'> */}
              {result !== 0 ? 
                        
                  
              <div className='position-fixed bottom-0 asideBg_color_footer'>
                            <div className='d-flex  row asideBg_color_footer_inner'>
                              <div className='col-12 py-2'><p className="w-100 fw-bold ps-2 d-flex justify-content-between " ><span>Total Items</span><span className=' pe-2'>{cart.length}</span></p></div>
                              <div className='col-12 py-2 '><p className="w-100 pt-2 fw-bold ps-2 d-flex justify-content-between"><span>Total Amount</span><span className=' pe-2'><i className="bi bi-currency-rupee "></i>{formattedAmount}</span></p></div>
                              {/* <div className='col-12 my-2 text-center'><button type="submit" className="btn w-100 border whatsappBtns " data-bs-toggle="modal" data-bs-target="#HomeOrderOnWhatsapp"><i className="bi bi-whatsapp pe-2 text-success" onClick={openModal}></i>Order on Whatsapp</button></div>   */}
                              <div className='col-12 my-2 text-center'><button type="submit" className="btn w-100 border whatsappBtns " onClick={handleShow}><i className="bi bi-whatsapp pe-2 text-success"></i>Order on Whatsapp</button></div>  
                              </div>
              </div>
                : <></> }
                            {/* <div className='d-flex justify-content-between'><span className='fontGold'>Delivery free</span><span className='rupesText'>Free</span></div> */}
                {/* <Delivery Cartdetails={cart} /> */}
              {/* </div> */}

            </div>
            {/* <TotalValus /> */}
          </div>
        </div>
      </div>
    </>
  )
}
