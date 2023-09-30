import React from 'react'

export default function TotalValus() {
  return (
    <>
    <div className='fluid-container'>
        <div className='container pb-0'>
            <div className='px-3 my-2'>
            <div className='d-flex justify-content-between'><span className='fontGold'>sub Total</span>      <span className='rupesText'>$125</span></div>
            <div className='d-flex justify-content-between'><span className='fontGold'>Delivery free</span>  <span className='rupesText'>$15</span></div>
            </div>
            <div className='border border-bottom rounded-1 border-warning '>
            <div className='d-flex justify-content-between p-3 rounded fs-6 bg_gold '><span className='p-1 find_text'>Find promotion</span> <span className='btn btn_coupen bg-warning border-white px-2 border '><i className="bi bi-ticket-perforated text-secondary pe-3"></i>Add Coupon</span></div>
            </div>
            <div className='pb-0 '>
            <div className='d-flex justify-content-between p-4 rounded'><span className='fontGold'>Total</span>  <span className='rupesText'>$152</span></div>
            <button type='btn bg-warning' className='btn py-2 fs-6 w-100 p-1 bg-warning btn_menu'> check out</button>
            </div>
        </div>
    </div>
    </>
  )
}
