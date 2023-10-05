import React, { useEffect, useState } from 'react'
import '../styles/Delivery.css'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import DeliveryDetails from './DeliveryDetails';
import PickupDelivery from './PickupDelivery';

export default function Delivery({Cartdetails,formattedAmount}) {

    const [delivery,SetDelivery] = useState(false);
    
    useEffect(() => {
        
    },[Cartdetails]);
    
   
    const checking = () => {
        
    }
    
    // ------------------------ Nav item active event -----------------------------

    let links = document.querySelectorAll('.nav-link');
        for(let i=0; i<links.length; i++){
        links[i].addEventListener('click', function() {
        for(let j=0; j<links.length; j++)
        links[j].classList.remove('actives');
        this.classList.add('actives');
        });
    }


    
  return (
    <>
          <div>
              <ul className="nav nav-tabs">
                  <li className="nav-item">
                      <a className="nav-link d-flex justify-content-center align-items-center gap-2 actives" href="#" name='Pickup' onClick={((e) => SetDelivery(false))}><div className='pickupOption'><img src='assests/pickup.png' className='w-100' alt='no image found' /></div>Pickup</a>
                  </li>
                  <li className="nav-item ms-3 position-relative d-flex">
                      <a className="nav-link d-flex justify-content-center align-items-center text-dark"  href="#" name='Delivery' onClick={((e) => SetDelivery(true))}><div className='DeliveryOption'><img src='assests/demo1.png' className='w-100' alt='no image found' /></div>Delivery</a>
                  </li>
              </ul>

              <div className='w-100'>
                  {delivery ? <DeliveryDetails CartdetailstoDelivery={Cartdetails}  formattedAmount={formattedAmount}/> : <PickupDelivery CartdetailstoDelivery={Cartdetails} formattedAmount={formattedAmount}/>}
              </div>
          </div>
    </>
  )
}
