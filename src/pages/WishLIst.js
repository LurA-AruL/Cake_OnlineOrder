import React,{useState,useEffect} from 'react'
import '../styles/HeartItems.css'
// import Additem from '../components/Additem';

export default function WishList() {

  const [getData,setGet_data] = useState([]);
  const [qtyValue,setQtyValue] = useState("1")

  useEffect(() => {
  },[]);

  const handleGetData = () => {
    fetch('http://localhost:5000/heartData')
      .then(res => res.json())
      .then(json => {
        console.log(json);
        setGet_data(json);
      });
       
  }
  
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
          <img src='https://cdn.dribbble.com/users/2333097/screenshots/8574268/media/c024e71216d2ce5d8dd97c81781d573b.gif' className='w-100' alt='no image' />
          <p className='fs-6 fw-bold text-secondary pt-2'>Your Wish list is empty</p>
        </div>
      </div> :
      getData.map(e => (
        <div className=' p-2 d-flex'>
          <div className="card mb-3 border-1 ms-4" style={{maxWidth: 300+"px"}}>
        <div className="row">
          <div className="col-md-4 p-2 bg-light">
            <img src={e.img} className="img-fluid rounded-end" alt="..."/>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <div className='border-bottom border-2 mb-2 d-flex justify-content-between'>
              <h5 className="card-title fs-6">{e.title}</h5>
              <p className="card-price fs-5 fw-bold">Rs.{e.price}</p>
              </div>
              {/* <Additem  qtyGetData={qtyGetData} e={e} /> */}
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
