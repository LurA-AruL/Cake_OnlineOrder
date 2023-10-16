import React from 'react';
import '../styles/SuccessInformatiom.css';

export default function SuccessInformation() {
  const orders = [
    { itemDetails: 'Product A sdjk' , qty: 2, total: 30 },
    { itemDetails: 'Product B', qty: 1, total: 15 },
    // Add more orders as needed
  ];
  return (
    <>
    <div className='mx-auto px-3 SuccessInformWrapper'>
        <div className='fw-bold text-center mb-3 w-100 text-success'>
          <div className='text-center w-50 m-auto'><img src='assests/orderSucess.gif' className='w-100 ' alt='no image' /></div>
          <h6 className='SuccessinformText'>Successfully Order Placed</h6></div>
          <div className='d-lg-flex justify-content-between'>
         <h6 className='textHeading'>Order Id: <span className='fw-normal'>123456</span></h6>
         <h6 className='textHeading'>Order Date: <span className='fw-normal'>16/10/2023 & 10:05 Am</span></h6>
          </div>
          <div>
      <div className='d-lg-flex justify-content-between d-none d-lg-block'>
         <div className='col-6'>
           <h6 className='textHeading'>Delivery Information:</h6>
           <h6 className='textHeading'>Type: Delivery</h6>
           <p>Address: First Floor, 95 – D Needarajappaiyar Street, Pondicherry – 605001.</p>
         </div>
         <div className='mt-2 col-6 text-end'>
            <h6 className='textHeading'>Contact Name: <span   className='fw-normal'>John.</span></h6>
            <h6 className='textHeading'>Contact Number: <span className='fw-normal'>7094030845.</span></h6>
         </div>
      </div>
    </div>
          
          
          <div className='w-100 mt-2'>
      <h5 className='fw-bold'>Order Details:</h5>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Item Details</th>
            <th>Qty</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td className='text-break'>{order.itemDetails}</td>
              <td>{order.qty}</td>
              <td>{order.total}</td>
            </tr>
          ))}
          <tr>
              <td>Total</td>
              <td colSpan={2}>Amount</td>
              <td>9000</td>
              {/* <td>{order.total}</td> */}
            </tr>
        </tbody>
      </table>
    </div>
    <div className='d-lg-none'>   
         <div className='mt-2'>
            <h6 className='textHeading'>Contact Name: <span   className='fw-normal'>John.</span></h6>
            <h6 className='textHeading'>Contact Number: <span className='fw-normal'>7094030845.</span></h6>
         </div>
         <div className=''>
           <h6 className='textHeading'>Delivery Information:</h6>
           <h6 className='textHeading '>Type: Delivery</h6>
           <p>Address: First Floor, 95 – D Needarajappaiyar Street, Pondicherry – 605001.</p>
         </div>
      </div>
    </div>
    </>
  )
}
