
import React, { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
// import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
// import { Pagination } from 'swiper/modules';
import '../styles/ShopingCart.css'
// import TotalValus from '../components/TotalValus';
import Delivery from '../components/Delivery';
import {SkeletonCard,SkeletonCardBtn} from '../components/SkeletonCard';
// Import Axios
import axios from 'axios';
import { render } from "react-dom";
import InfiniteScroll from 'react-infinite-scroll-component';
import SuccessMsg from './SuccessMsg';



function TestingPagelodaing({ Cartdetails, removeFromCart, addToCart, formattedAmountSendToMb, filteredData, itemsSearchValue, buttonText,alertOfAddCart }) {

    const [cart, setCart] = useState(Cartdetails);
     //--------------------------------- Axois Api key  -----------------------
     const [apiData, setApiData] = useState([]);
     const [isLoadingPage, setIsLoadingPage] = useState(true);
     const [isskeletonbtn, setisskeletonbtn] = useState(true);

     
    const [storage,setStorage] = useState(apiData);
    // const [cartList, setCartList] = useState(mutton_Dishes);
    // const [allItems, setAllItems] = useState();
    const [mobileCartDeliveryDis, setMobileCartDeliveryDis] = useState(false);
    const [mbViewDirect, setMbViewDirect] = useState(false);

    const [activeCategory, setActiveCategory] = useState(); // Set the initial active category
    const [allBtnActive,setallBtnActive] = useState(false);


    // ------------------------- Modal view and hide automatically -------------------
    const [showModal, setShowModal] = useState(false);

    //------------------------- searching items----------------------
    const [filterDatas, setFilteredDatas] = useState([])
    //------------------------- searching items end----------------------

//    end of carts text
    const [endOfCartText,SetEndOfCartText] = useState(false);

    // ------------------------ changing categeries values ----------------
    const [listCategories, setListCategories] = useState([])
    // const [changeApiCount, SetChangeApiCount] = useState(312);

   

    

    // -------------------------- on scrolling values ------------------------------ 

    const [page, setPage] = useState(1);
    const [per_page, setPerPage] = useState(9);
    const [onscrolling, setOnscrolling] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [categeriesCount, setcategeriesCount] = useState(312)
    const [categorynumber, setCategorynumber] = useState([]);
    const [categoryIndex, setcategoryIndex] = useState(1)

    const apiUrl = `https://zukachocolates.com/wp-json/wc/v3/products?category=${categeriesCount}&consumer_key=ck_96cb3ae76e2e7faa977b08924c460f4409a5385e&consumer_secret=cs_0f78e3a6d65f0caeb6b3551a18e9285bbb6d9b5a&page=${page}&per_page=${per_page}`;
    // console.log(categorynumber,'categorynumber');
    
    const handleViewCart = cart.length+1;
    const fetchMoreValues = async () => {
        setIsLoading(true);
        
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            
            setIsLoading(true);
            setIsLoadingPage(false);
            setisskeletonbtn(false);
            console.log(categorynumber,'categorynumber')
            if(categorynumber <= categoryIndex){
                SetEndOfCartText(true);
            }else{
                SetEndOfCartText(false);
            }
            // console.log(data.length , 'dataLength............')
            console.log(page, 'page');
            if (data.length === 0) {
                console.log(categorynumber.length, 'categorynumber.length............')
                // if (2 >= categoryIndex) {
                    if(categorynumber.length >= categoryIndex){
                    setcategoryIndex(categoryIndex + 1);
                    console.log(categoryIndex, 'index..................');
                    let x = categorynumber[categoryIndex];
                    setPage(1);
                    setcategeriesCount(x);
                }
            }
            // Check for duplicate elements before updating state
                    setApiData(prevValues => {
                const uniqueData = [...prevValues, ...data].filter(
                    (value, index, self) => self.findIndex(v => v.id === value.id) === index
                );
                
                //   const list = listCategories.map(e => e.id);
                //   list
                return uniqueData;
            });

            setStorage(apiData);
        } catch (error) {
            console.error('Error fetching API values:', error);
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMoreValues();
        console.log('fetchMoreValues 1......');

    }, []);

    const handleScroll = () => {
        if (!isLoading) {
            const current_Page = page;
            const scrollY = window.scrollY || window.pageYOffset;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;

            if(onscrolling === true){
            // if (2 >= categoryIndex) {
                if (scrollY + windowHeight >= documentHeight - 100) {
                    fetchMoreValues();
                    setPage(current_Page + 1);
                }
            }
        }
    };

    // Attach the event listener to the scroll event
    useEffect(() => {
        console.log('handleScroll......');
        window.addEventListener('scroll', handleScroll);

        // Remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
        
    }, [handleScroll]);

    // -----------------------------------------------
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);
        inputvalueGetFun();
        //  ------------------------------Api get Method---------------------
        //   fetchData();
        // -------------- categories api functions ----------------- 
        fetchListCategories();
        //--------------------------------------------------------------------------------------
    }, [Cartdetails, itemsSearchValue]);

    // ---------------------------------- all categories items ------------------------
        const AllCategoryFun = (events) => {
            setallBtnActive(true);
            setIsLoadingPage(true);
            if( categorynumber.length >= categoryIndex ){
            fetchMoreValues();
            setOnscrolling(true);
            SetEndOfCartText(false);
            
        } else{
            setApiData(storage);
            console.log('hello');
            SetEndOfCartText(true);
        }
        }

    //----------------------------------------------------------



    const handleCategries = (event, BtnActive) => {
        fetchCategories(event);
        setallBtnActive(false);
        // console.log("Handle BUtton clicked",event);
        setIsLoadingPage(true);
        setPage(1);
        setOnscrolling(false);
        //    setcategoryIndex(0)
        setActiveCategory(BtnActive);

    }


    // -------------------------list of categories function---------------------
    const fetchListCategories = async () => {
        try {
            const response = await axios.get(`https://zukachocolates.com/wp-json/wc/v3/products/categories?consumer_key=ck_96cb3ae76e2e7faa977b08924c460f4409a5385e&consumer_secret=cs_0f78e3a6d65f0caeb6b3551a18e9285bbb6d9b5a&page=1&per_page=30`);
            setListCategories(response.data.filter(e => e.count !== 0));
            //   console.log(response.data.filter(e => e.count !== 0).map(e => e.id),'Categories list');
            setCategorynumber(response.data.filter(e => e.count !== 0).map(e => e.id));
            setIsLoadingPage(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle errors here
        }
    };
    // -----------------------------------Fetch api from categories -----------------------
    const fetchCategories = async (event) => {
        try {
            const response = await axios.get(`https://zukachocolates.com/wp-json/wc/v3/products?category=${event}&consumer_key=ck_96cb3ae76e2e7faa977b08924c460f4409a5385e&consumer_secret=cs_0f78e3a6d65f0caeb6b3551a18e9285bbb6d9b5a&page=${page}&per_page=30`);
            setApiData(response.data);
            setIsLoadingPage(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle errors here
        }
    };

    //  ---------------------------------- Fetch Api Axois Methods -------------------------

    //   const fetchData = async () => {
    //     try {

    //       const response = await axios.get(`https://zukachocolates.com/wp-json/wc/v3/products?consumer_key=ck_96cb3ae76e2e7faa977b08924c460f4409a5385e&consumer_secret=cs_0f78e3a6d65f0caeb6b3551a18e9285bbb6d9b5a&page=1&per_page=30`);
    //       setApiData(response.data);
    //       console.log(response.data,'cat');
    //       setIsLoadingPage(false);

    //     } catch (error) {

    //       console.error('Error fetching data:', error);
    //       // Handle errors here
    //     }
    //   };

    // ----------------------------------- Fetch Api Axois Methods ---------------------------

    // ------------------------- Modal view and hide automatically -------------------
    const inputvalueGetFun = () => {
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
        <div className=' w-100 position-relative '>
            {/* ------------------------------------- The Avaible items Filters Buttom components here---------------------  */}
                <div className='slider-container py-2 categorie position-sticky top-0 bg-white z-index_5' >
                    {isskeletonbtn ? <SkeletonCardBtn /> : 
                    <>
                    <button type='button' className={`btn slider-item btn_menu border px-2 px-sm-4 ${allBtnActive  ? 'Btn_active' : ''} `} onClick={(ee) => AllCategoryFun()}>All</button>
                    {listCategories.map(e => (
                        <div className='slider-item'>
                            <button type='button' className={`btn w-100 btn_menu border px-2 px-sm-4 ${allBtnActive ? '' : activeCategory === e ? 'Btn_active' : ''} `} onClick={(ee) => handleCategries(e.id, e)}>{e.name}</button>
                    </div>
                    ))}</>}
                </div>
                {/* -----------------------button end----------------------- */}
            <div className='d-flex gap-3 flex-wrap py-2 card_Main  z-index_-5 scrolling-container'>
                 {/*------------------- serach set--------------------------  */}
                {itemsSearchValue.length > 0 ? filterDatas.length === 0 ? <p className='fs-6 fw-bold mt-5'>Give the correct name of the items</p>
                    :
                    filterDatas.map((currentData) => (
                        <div className="card col-1 my-lg-1 cardOuterWrapper" style={{ width: 17 + "rem" }} key={currentData.id}>
                            <div className='position-relative cart_imgae'>
                                <i className="bi bi-heart-fill position-absolute  hearticon text-white" id='heart'></i> {/* onClick={(color) => handleHeartAdd(currentData,color.target.id)} */}
                                <img src={currentData.img} className="card-img-top p-2 w-100" alt="no image found" />
                            </div>
                            <div className="card-body">
                                <div className='d-flex justify-content-between'><h5 className="card-title">{currentData.title}</h5><div><button id='AddBtn' className='btn border fw-bold plubtn d-inline px-3 px-lg-3 text-white' onClick={(e) => addToCart({ item_id: currentData.id, item_name: currentData.title, item_price: currentData.price, item_qty: currentData.qty, item_image: currentData.img, event: e.target.id })}>Add</button></div></div>
                                <div><span className='cardtext'><i className="bi bi-currency-rupee"></i>{currentData.price}</span></div>
                            </div>
                        </div>
                    ))
                    :

                    isLoadingPage ? (
                        <SkeletonCard />
                    ) : (


                        apiData.map((currentData, index) => (
                            <div className="card col-1 my-lg-1 border-0 cardOuterWrapper api-item mb-2" style={{ width: 17 + "rem" }} key={currentData.id}>
                                <div className='ImageWrapper'>
                                    <div className='ImageInner'>
                                        {/* <i className="bi bi-heart-fill position-absolute  hearticon text-white" id='heart'></i> onClick={(color) => handleHeartAdd(currentData,color.target.id)} */}
                                        <img src={currentData.images.length > 1 ? currentData.images[0].src : currentData.images.map(e => e.src)} className="card-img-top cart_imgae" alt="no image found" />
                                    </div>
                                </div>
                                <div className="card-body px-0 d-flex flex-column justify-content-center d-lg-bolck">
                                    <div className='d-flex justify-content-between'>
                                        <div className='d-flex flex-column  px-2'>
                                            <h5 className="Shoping_cartTitle fw-bold card-title p-0 m-0">{currentData.name}</h5>
                                            <span className='CartPriceHome pt-1 fw-bold'>{currentData.price ? "Price: " + currentData.price : <></>}</span>
                                            <span className='CartPriceHome text-decoration-line-through'>{currentData.regular_price && currentData.regular_price !== currentData.price ? "Regular Price: " + currentData.regular_price : <></>}</span>
                                            {/* <div className='pt-2 fst-italic fw-light'>{currentData.short_description.slice(' ').slice(3,42)}...</div> */}
                                        </div>
                                        <div className='pe-2'><button id='AddBtn' className='btn border fw-bold plubtn d-inline px-3 px-lg-3 text-white' onClick={(e, BtnIndex) => addToCart({ item_id: currentData.id, item_name: currentData.name, item_price: currentData.price, item_qty: currentData.qty, item_image: currentData.images.map(e => e.src) })}>{buttonText}</button></div></div>

                                    <div className='position-absolute top-100 start-50 translate-middle'>

                                        {/* {chageFoodItems === true ?  <FdItemIncrSamecart  setChageFoodItems={setChageFoodItems}/> : <></>}  */}
                                    </div>
                                    <div className='pt-2 px-2 fst-italic fw-light' dangerouslySetInnerHTML={{ __html: currentData.short_description.slice(0, 50)+'...' }} />
                                </div>
                            </div>
                        )
                        ))}

            </div>


            {/* ----------------- view modal when the product increase then hide and hide  modal ------------------------- */}
            {/* <div className='position-absolute'>{endOfCartText === true ? <p>end of the carts...</p> : isLoading === true ? <p>Loading...</p> : <></>}</div> */}
                    {/* // ---------------------------- modal view carts --------------------------- */}

                    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" show={showModal} onHide={() => setShowModal(false)}>
                        <div className="modal-dialog modal-fullscreen-sm-down">
                            <div className="modal-content">
                                <div className="modal-header d-flex gap-2">
                                    <div className=''>
                                        {mobileCartDeliveryDis === true ? <button type="button" className='btn p-0 me-3 ' onClick={(() => setMobileCartDeliveryDis(false))}><i className="bi bi-arrow-left pt-3 fs-4 upArrowModalBtn"></i> <span className='ms-3 p-1'>Delivery Details</span></button> :
                                            <h5 className="modal-title" id="staticBackdropLabel"> My Order </h5>}
                                    </div>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                {/* ----------------- display  modal body -------- */}
                                <div className="modal-body">
                                    {/* ----------------- display  carts views-------- */}
                                    {cart.length !== 0 ? 
                                    mobileCartDeliveryDis === true ? <Delivery formattedAmount={formattedAmountSendToMb} /> :
                                        cart.map((e, index) => (
                                            <div className="card border-0 mb-1 w-100" key={index}>
                                                <div className="row px-3">
                                                    <div className="col-2 rounded d-flex align-items-center">
                                                        <img src={e.item_image} className="img-fluid rounded w-100" alt="no image found" />
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
                                                                            {item.item_id === e.item_id ? item.item_qty + ' x ' + item.item_price : <></>}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )) :
                                        <div className='text-center w-100'>
                                            <img src="assests/emptyCart_moblieView.png" className='w-75 front_corsur ' alt='no image found' />
                                            <p>Your Carts is empty</p>
                                            <p>Looks like you haven't added any items to your cart yet.</p>
                                            <button className='btn border px-4 rounded-pill bg-success text-white py-2 fs-6'>ADD ITEMS TO CART</button>
                                        </div>
                                    }

                                </div>
                                {mobileCartDeliveryDis === false ?
                                    <div className="modal-footer d-flex justify-content-between">
                                        <div className='d-flex w-100 justify-content-between'>
                                            <div className=' d-flex align-items-center'><span className='fw-bold'>Total {formattedAmountSendToMb}</span><i data-bs-toggle="modal" data-bs-target="#staticBackdrop" className="bi bi-chevron-up ps-2 fs-6 upArrowModalBtn front_corsur"></i></div>
                                            <div className='d-flex gap-2'><button type="submit" onClick={(() => setMobileCartDeliveryDis(true))} className="btn border w-100 whatsappBtn "><i className="bi bi-whatsapp px-2 text-success"></i>Order on Whatsapp</button></div>
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

                                    {mbViewDirect === true ? <Delivery formattedAmount={formattedAmountSendToMb} /> : <></>}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* // ----------------------------- modal end view ---------------------------- */}

                    <div className='position-fixed add_message'>{alertOfAddCart === true ?  <SuccessMsg /> : <></>}</div>
                    {/* -------------------- onclick condition show or hide ---------------- */}
                    
                    {cart.length === 0 ? <></> :
                    <div className='container footerCartrMb rounded position-fixed d-lg-none'>
                        <div className='row text-white p-2 footerCartrMb_TotalAmount'>
                            <div className='col-5 d-flex  flex-column g-1' data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                <div className='fw-bold items'><span className='items_Animation'>{cart.length} {cart.length > 1 ? "Items" : "Item"} </span><i className="bi bi-chevron-up upArrowModalBtn front_corsur text-white"></i></div>
                                <div className='fw-bold'>Total: {formattedAmountSendToMb}</div>
                            </div>
                            {/* <div className='col-3 ps-1 text-end position-relative'>View<span className="position-absolute top-0 start-100 translate-middle badge rounded bg-white text-dark badge_footerMb">{cart.length}</span></div> */}
                            <div className='col-7 p-0 d-flex justify-content-end  align-items-center'>
                                <button type="button" onClick={(() => setMbViewDirect(true))} className="btn footerCartrMb_OrdeBtn me-2 text-success" data-bs-toggle="modal" data-bs-target="#MovieViewDirectDelivery"><i className="bi bi-whatsapp pe-1 whatsAppICon" ></i>Order on Whatsapp <i class="bi bi-arrow-right-circle-fill"></i></button>
                            </div>
                        </div>
                    </div>
                    }
        </div>
    );
}

export default TestingPagelodaing;
