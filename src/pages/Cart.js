import React, { useEffect, useState } from 'react';
import '../styles/cardItem.css'
// import Additem from '../components/Additem';

export default function Cart(props) {
  const [getData,setGet_data] = useState([]);
  const [qtyValue,setQtyValue] = useState()

  useEffect(() => {
  },[]);
 

  const handleGetData = () => {
// -------------------- try to local storage--------------
    let getLc_storage = JSON.parse(localStorage.getItem("orderItemList" ) || "[]");

    let x = getLc_storage.map(e => e.order).map(e => e.order_Details).map(e => e[0]);
     
    setGet_data(x);

    console.log(x);

    // ---------------end -------------------------
    // fetch('http://localhost:5000/cardsData')
    //   .then(res => res.json())
    //   .then(json => {
    //     console.log(json);
    //     setGet_data(json);
    //   });
       
  }


  // qty get data 
  const qtyGetData = (value) => {
    console.log("im, child value " ,value)
    setQtyValue(value);
}
  return (
    <>
    <div className=' px-2 w-100 cartsWrapper' >
      {getData.length <= 0 ?
      <div className='heartImg_Wrapper text-center'>
        <div className='d-flex flex-column justify-content-center'>
          <img src='assests/emtycart1.gif' className='w-100' alt='no image' />
          <p className='fs-6 fw-bold text-secondary pt-2'>Your cart is empty</p>
        </div>
      </div> :
      getData.map((e,index) => ( 
        <div className=' p-2 d-flex' key={index}>
          <div className="card mb-3 shadow border-0 ms-4" style={{maxWidth: 450+"px"}}>
        <div className="row">
          <div className="col-md-4 p-2 bg-light">
            <img src={e.product_image} className="img-fluid rounded-end" alt="..."/>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <div className='border-bottom border-2 mb-2 d-flex justify-content-between'>
              <h5 className="card-title fs-6">{e.product_name}</h5>
              <p className="card-price fs-5 fw-bold">Rs.{e.product_price}</p>
              </div>
              {/* <Additem  qtyGetData={qtyGetData} e={e} random_No={e.random_No} /> */}
              
            </div>
          </div>
        </div>
      </div>
        </div>
      
      ))}
      </div>
    </>
  )
}
