import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import SuccessMsg from './SuccessMsg';


export default function SearchItems({addToCart,alertOfAddCart}) {

    const [itemsSearch,setItemsSearch] = useState('');
    const [searchLength,setsearchLength] = useState(false);
    const [SearchKey,setSearchKey] = useState([]);
    const navigate = useNavigate();

  const handleGoback = () => {
    // Navigate to the specified route when the link is clicked
    navigate('/');
  };


    const apiUrl = `https://zukachocolates.com/wp-json/wc/v3/products?search=${itemsSearch}&consumer_key=ck_96cb3ae76e2e7faa977b08924c460f4409a5385e&consumer_secret=cs_0f78e3a6d65f0caeb6b3551a18e9285bbb6d9b5a&page=1&per_page=10`;

    useEffect(() => {
      // Fetch data only if there's a search query
      if (itemsSearch.trim() !==  '') {
        HandleSearchItemApi();
        setsearchLength(false);
      } else {
        setsearchLength(true);
        console.log('empty');
      }
        // HandleSearchItemApi();
        console.log(SearchKey,'items here...............');
    },[itemsSearch]);

    // Perform the search when the searchQuery changes
    const HandleSearchItemApi = async () => {
        try {
        const response = await axios.get(apiUrl);
        console.log('Data:',response.data);

      setSearchKey(response.data); // Assuming the API returns results in the 'results' field
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    
    
  };

    const handleSearch = (event) => {
        const inputvalueGet = event;
        setItemsSearch(inputvalueGet); 
      };

  return (
    <>
    <div className='d-flex flex-column w-100'>
    <div className='p-2'>
    <button className='btn border mb-2' onClick={handleGoback}>GoBack</button>
    <input  className="form-control p-lg-2 rounded-pill w-75 m-auto" name={itemsSearch} onChange={((e) => handleSearch(e.target.value))} type="search" placeholder="What would you like to eat?" id="example-search-input" />
    </div>
    
    {
       searchLength === false ?  
    <div className='d-flex gap-3 flex-wrap py-2 card_Main  z-index_-5 scrolling-container'>

    {
         SearchKey.length === 0 ? 
         <p>Please Enter the valid name.</p>
          :  
         SearchKey.map((currentData, index) => (  
           <div className="card col-1 my-lg-1 border-0 cardOuterWrapper mb-2" style={{ width: 17 + "rem" }} key={currentData.id}>
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
                   <div className='pe-2'><button id='AddBtn' className='btn border fw-bold plubtn d-inline px-3 px-lg-3 text-white' onClick={(e, BtnIndex) => addToCart({ item_id: currentData.id, item_name: currentData.name, item_price: currentData.price, item_qty: currentData.qty, item_image: currentData.images.map(e => e.src) })}>Add</button></div></div>

               <div className='position-absolute top-100 start-50 translate-middle'>

                   {/* {chageFoodItems === true ?  <FdItemIncrSamecart  setChageFoodItems={setChageFoodItems}/> : <></>}  */}
               </div>
               <div className='pt-2 px-2 fst-italic fw-light' dangerouslySetInnerHTML={{ __html: currentData.short_description.slice(0, 50)+'...' }} />
           </div>
       </div>
        )
        )
    }
            </div>
            : 
            <p className='text-center py-5'>{SearchItems.length < 0 ? 'Sorry! the item not here....' : 'Please Enter your item.'}</p> 
        }

        {/*-------------------------------- success message---------------------- */}
        <div className='position-fixed add_message'>{alertOfAddCart === true ?  <SuccessMsg /> : <></>}</div>
        </div>
    </>
  )
}
