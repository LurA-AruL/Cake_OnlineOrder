import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
// import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
// import { Pagination } from 'swiper/modules';
import '../styles/ShopingCart.css'
// import TotalValus from '../components/TotalValus';
import Delivery from '../components/Delivery';
import SkeletonCard from '../components/SkeletonCard';
  // Import Axios
  import axios from 'axios';





function ShoppingCart({Cartdetails,removeFromCart,addToCart,formattedAmountSendToMb,filteredData,itemsSearchValue,buttonText}) {

    const [cart, setCart] = useState(Cartdetails);
    // const [cartList, setCartList] = useState(mutton_Dishes);
    // const [allItems, setAllItems] = useState();
    const [mobileCartDeliveryDis, setMobileCartDeliveryDis] = useState(false);
    const [mbViewDirect, setMbViewDirect] = useState(false);

    // ------------------------- Modal view and hide automatically -------------------
    const [showModal, setShowModal] = useState(false);

    //------------------------- searching items----------------------
    const [filterDatas, setFilteredDatas] = useState([])
    //------------------------- searching items end----------------------

    //--------------------------------- Axois Api key  -----------------------
    const [apiData, setApiData] = useState([]);
    const [isLoadingPage, setIsLoadingPage] = useState(true);

    // ------------------------ changing categeries values ----------------
    
    const [changeApiCount,SetChangeApiCount] = useState(5);

    useEffect(() => {
         const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
         setCart(storedCart);
         inputvalueGetFun(); 
        //  ------------------------------Api get Method---------------------
          fetchData();
     }, [Cartdetails,itemsSearchValue,changeApiCount]);
     

     const handleCategries = (event) => {
        setIsLoadingPage(true);
        SetChangeApiCount(event);
     }

  //  ---------------------------------- Fetch Api Axois Methods -------------------------

  const fetchData = async () => {
    try {

      const response = await axios.get(`https://srivenkateshwarasweets.in/wp-json/wc/v3/products?page=${changeApiCount}&consumer_key=ck_b31cbf4a99a70c0c02f682eeae469b7cbfc774c0&consumer_secret=cs_0d51924fb90c2a413674ca4bd37d54955178f2f9`);
      setApiData(response.data);
      setIsLoadingPage(false);

    } catch (error) {

      console.error('Error fetching data:', error);
      // Handle errors here
    }
  };

  // ----------------------------------- Fetch Api Axois Methods ---------------------------

     // ------------------------- Modal view and hide automatically -------------------
     const inputvalueGetFun = () =>{
        setFilteredDatas(filteredData);
        // console.log(filteredData,"check value is there");
     }

    //  ----------------------modal close automatically -----------------------
    // const modalCloseAutomatically = () => {
    //   if(cart.length === 0){
    //     alert("hai your cart is zero");
    //   }
    // }
     

    // console.log(apiData.map(e => e),"asdjbhgdgvsdiomoldsbhgu");
    

    return (
        <div className=' w-100 position-relative'>
            <h2 className='d-none fs-lg-1 ps-lg-0 fw-bold'>Available Items</h2>
            {/* ------------------------------------- The Avaible items Filters Buttom components here---------------------  */}
          <div className='pt-3 pb-1 categorie position-sticky top-0 bg-white z-index_5'>
            {/* <Swiper
              slidesPerView={2}
              spaceBetween={10}
              centeredSlides={true}
              pagination={{
                clickable: false,
              }}
              modules={[Pagination]}
              className="mySwiper d-md-none pb-5"
            >
              <SwiperSlide className='rounded'><button type='button' className='btn w-75 btn_menu border px-2 px-sm-4 ' onClick={(e) => setCartList(biriyanilist)}>Biryani</button></SwiperSlide>
              <SwiperSlide className='rounded'><button type='button' className='btn w-75 btn_menu border px-2 px-sm-4 ' onClick={(e) => setCartList(mutton_Dishes)}>Mutton Dishes</button></SwiperSlide>
              <SwiperSlide className='rounded'><button type='button' className='btn w-75 btn_menu border px-2 px-sm-4 ' onClick={(e) => setCartList(mutton_Dishes)}>Mutton Dishes</button></SwiperSlide>
              <SwiperSlide className='rounded'><button type='button' className='btn w-75 btn_menu border px-2 px-sm-4 ' onClick={(e) => setCartList(mutton_Dishes)}>Mutton Dishes</button></SwiperSlide>
            </Swiper> */}

            {/*-------------------------- Button scroll mobile view  -----------------------------*/}
            <div className="slider-container position-sticky top-0 d-md-none">
               <div className="slider-item "><button type='button' className='btn w-100 btn_menu border px-1 px-sm-4 ' onClick={(e) => handleCategries(2)}>Celebration Cakes</button></div>
               <div className="slider-item "><button type='button' className='btn w-100 btn_menu border px-1 px-sm-4 ' onClick={(e) => handleCategries(3)}>Chocolate Truffle Cakes</button></div>
               <div className="slider-item "><button type='button' className='btn w-100 btn_menu border px-1 px-sm-4 ' onClick={(e) => handleCategries(10)}>Single Pastries</button></div>
               <div className="slider-item "><button type='button' className='btn w-100 btn_menu border px-1 px-sm-4 ' onClick={(e) => handleCategries(7)}>Chocolate Gift Boxes</button></div>
               <div className="slider-item "><button type='button' className='btn w-100 btn_menu border px-1 px-sm-4 ' onClick={(e) => handleCategries(6)}>Chocolate Bars</button></div>
               {/* Add more slider items as needed */}
            </div>

            {/*-------------------------- desktop view  -----------------------------*/}
            
            <div className=' d-none d-lg-block py-2' >
              <div className=' d-flex flex-wrap gap-4' >
                <button type='button' className='btn btn_menu border px-2 px-sm-4 ' onClick={(e) => handleCategries(2)}>Celebration Cakes</button>
                <button type='button' className='btn btn_menu border px-2 px-sm-4 ' onClick={(e) => handleCategries(3)}>Chocolate Truffle Cakes</button>
                <button type='button' className='btn btn_menu border px-2 px-sm-4 ' onClick={(e) => handleCategries(10)}>Single Pastries</button>
                <button type='button' className='btn btn_menu border px-2 px-sm-4 ' onClick={(e) => handleCategries(7)}>Chocolate Gift Boxes</button>
                <button type='button' className='btn btn_menu border px-2 px-sm-4 ' onClick={(e) => handleCategries(6)}>Chocolate Bars</button>
              </div>
            </div>
            
          </div>

          {/* -----------------------button end----------------------- */}

          <div className='d-flex gap-2 flex-wrap py-2 card_Main  z-index_-5'>
            {/*------------------- serach set--------------------------  */}

            {itemsSearchValue.length > 0 ? filterDatas.length === 0 ? <p className='fs-6 fw-bold mt-5'>Give the correct name of the items</p>
             : 
            filterDatas.map((currentData) => (
                    <div className="card col-1 my-lg-1 cardOuterWrapper" style={{ width: 17 + "rem" }} key={currentData.id}>
                        <div className='position-relative cart_imgae'>
                            <i className="bi bi-heart-fill position-absolute  hearticon text-white" id='heart'></i> {/* onClick={(color) => handleHeartAdd(currentData,color.target.id)} */}
                            <img src={currentData.img} className="card-img-top p-2 w-100"  alt="no image found" />
                        </div>
                        <div className="card-body">
                            <div className='d-flex justify-content-between'><h5 className="card-title">{currentData.title}</h5><div><button id='AddBtn' className='btn border fw-bold plubtn d-inline px-3 px-lg-3 text-white' onClick={(e) => addToCart({ item_id: currentData.id, item_name: currentData.title, item_price: currentData.price, item_qty: currentData.qty, item_image: currentData.img, event: e.target.id })}>Add</button></div></div>
                            <div><span className='cardtext'><i className="bi bi-currency-rupee"></i>{currentData.price}</span></div>
                            <div className='position-absolute top-100 start-50 translate-middle'>
                                {/* {chageFoodItems === true ?  <FdItemIncrSamecart  setChageFoodItems={setChageFoodItems}/> : <></>}  */}
                            </div>
                        </div>
                    </div>
                )) 
                : 

                isLoadingPage ? (
                  <SkeletonCard />
                ) : (
                 
                  apiData.map((currentData,index) => (
                    <div className="card col-1 my-lg-1 cardOuterWrapper" style={{ width: 17 + "rem" }} key={currentData.id}>
                      <div className='ImageWrapper'>
                          <div className='ImageInner'>
                            {/* <i className="bi bi-heart-fill position-absolute  hearticon text-white" id='heart'></i> onClick={(color) => handleHeartAdd(currentData,color.target.id)} */}
                            <img src={currentData.images.map(e => e.src)} className="card-img-top cart_imgae"  alt="no image found" />  
                          </div>
                      </div>
                      <div className="card-body px-0">
                          <div className='d-flex justify-content-between'><div className='d-flex flex-column px-2'><h5 className="Shoping_cartTitle fw-bold card-title p-0 m-0">{currentData.name}</h5><span className='CartPriceHome pt-1'>{currentData.price ? "Price: "+ currentData.price : <></>}</span><span className='CartPriceHome text-decoration-line-through'>{currentData.regular_price && currentData.regular_price !== currentData.price  ? "Regular Price: " + currentData.regular_price :<></>}</span><div>{currentData.yoast_head_json.og_description.slice(0, 54)}</div></div> <div className='pe-2'><button id='AddBtn' className='btn border fw-bold plubtn d-inline px-3 px-lg-3 text-white' onClick={(e,BtnIndex) => addToCart({ item_id: currentData.id, item_name: currentData.name, item_price: currentData.price, item_qty: currentData.qty, item_image: currentData.images.map(e => e.src)})}>{buttonText}</button></div></div>
                          <div className='position-absolute top-100 start-50 translate-middle'>
                            
                              {/* {chageFoodItems === true ?  <FdItemIncrSamecart  setChageFoodItems={setChageFoodItems}/> : <></>}  */}
                          </div>
                      </div>
                  </div>
                    )
              )) } 
            </div>

            {cart.length === 0 ? 

            <></>

            :
      
            <>
            {/* // ---------------------------- modal view carts --------------------------- */}

            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" show={showModal} onHide={() => setShowModal(false)}>
              <div className="modal-dialog modal-fullscreen-sm-down">
                <div className="modal-content">
                  <div className="modal-header d-flex gap-2">
                    <div className=''>
                    {mobileCartDeliveryDis === true ? <button type="button" className='btn p-0 me-3 '  onClick={(() => setMobileCartDeliveryDis(false))}><i className="bi bi-arrow-left pt-3 fs-4 upArrowModalBtn"></i> <span className='ms-3 p-1'>Delivery Details</span></button> :
                        <h5 className="modal-title" id="staticBackdropLabel"> My Order </h5>}
                    </div>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> 
                  </div>
           {/* ----------------- display  modal body -------- */}
                  <div className="modal-body">
           {/* ----------------- display  carts views-------- */}
              
           {mobileCartDeliveryDis ===  true ? <Delivery   formattedAmount={formattedAmountSendToMb}/> : 
                    cart.map((e, index) => (
                    <div className="card border-0 mb-1 w-100" key={index}>
                      <div className="row px-3">
                        <div className="col-2 rounded d-flex align-items-center">
                          <img src={e.item_image} className="img-fluid rounded w-100"  alt="no image found" />
                        </div>
                        <div className="col-8">
                          <div className="card-body">
                            <div className='d-flex justify-content-between'>
                              <h5 className="card-title asideCartHeader" >{e.item_name}</h5>
                              
                            </div>
                            <div className='mt-1 d-flex'>
                              {/* --------------- add and removing Area------------------------- */}
                              {cart.map((item, index) => (
                                <div key={index} className='d-flex gap-3 align-item-center '>
                                  {item.item_id === e.item_id ? <>
                                    <button className='btn border' onClick={() => removeFromCart(item)}>-</button>
                                    <div className='p-1 d-flex align-items-center'>{item.item_qty}</div>
                                    <button className='btn border' onClick={() => addToCart(item)}>+</button></>
                                    : <></>}
                                </div>
                              ))}
                             <div className="card-price SideCardprice d-flex align-items-center justify-content-end w-100 ">
                                {/* <i className="bi bi-currency-rupee "></i> */}
                                {/*------------------------- adding price Area------------------------ */}
                                {cart.map((item, index) => (
                                  <div key={index} className=' mobileViewCartAmount'>
                                    {item.item_id === e.item_id ?  item.item_qty + ' x ' +item.item_price : <></>}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>                                    
                  ))
                }
              
                  </div>
                  {mobileCartDeliveryDis === false ?
                  <div className="modal-footer d-flex justify-content-between">
                    <div className='d-flex w-100 justify-content-between'>
                        <div className=' d-flex align-items-center'><span className='fw-bold'>Total {formattedAmountSendToMb}</span><i data-bs-toggle="modal" data-bs-target="#staticBackdrop" className="bi bi-chevron-up ps-2 fs-6 upArrowModalBtn front_corsur"></i></div>
                        <div className='d-flex gap-2'><button type="submit" onClick={(() => setMobileCartDeliveryDis(true))} className="btn border w-100 bg-warning whatsappBtn "><i className="bi bi-whatsapp px-2 text-success"></i>Order on Whatsapp</button></div>  
                    </div>
                  </div>
                  : <></>}
                </div>
              </div>
            </div>
            {/* // ----------------------------- modal end view ---------------------------- */}

            {/* // ---------------------------- modal view carts --------------------------- */}

            <div className="modal fade" id="MovieViewDirectDelivery" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
              
           {mbViewDirect ===  true ? <Delivery   formattedAmount={formattedAmountSendToMb}/> : <></>}
                  </div>
                </div>
              </div>
            </div>
            {/* // ----------------------------- modal end view ---------------------------- */}
            <div className='container footerCartrMb rounded position-fixed d-lg-none'>
                  <div className='row text-white p-2 footerCartrMb_TotalAmount'>
                    <div className='col-5 d-flex  flex-column g-1 '>
                      <div className='fw-bold items'><span className='items_Animation'>{cart.length} {cart.length > 1 ? "Items" : "Item"} </span><i data-bs-toggle="modal" data-bs-target="#staticBackdrop" className="bi bi-chevron-up upArrowModalBtn front_corsur text-white"></i></div>
                      <div className='fw-bold'>Total: {formattedAmountSendToMb}</div>
                    </div>
                    {/* <div className='col-3 ps-1 text-end position-relative'>View<span className="position-absolute top-0 start-100 translate-middle badge rounded bg-white text-dark badge_footerMb">{cart.length}</span></div> */}
                    <div className='col-7 p-0 d-flex justify-content-end  align-items-center'><button type="button" onClick={(() => setMbViewDirect(true))} className="btn footerCartrMb_OrdeBtn me-2 text-success" data-bs-toggle="modal" data-bs-target="#MovieViewDirectDelivery"><i className="bi bi-whatsapp pe-1 whatsAppICon" ></i>Order on Whatsapp <i class="bi bi-arrow-right-circle-fill"></i></button></div>
                  </div>
            </div>
            </>
            }
        </div>
    );
}

export default ShoppingCart;
 