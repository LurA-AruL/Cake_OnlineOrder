import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import '../styles/Skeleton.css'

export const SkeletonCard = () => {

    const [items, setItems] = useState([
        {key:1},{key:2},{key:3},{key:4},{key:5},{key:6},{key:7},{key:8}
    ])
  return (
    <>
    {items.map((e,i) => (  
        <div className="custom-card col-3 my-lg-1 SkeletonDisMovie" style={{ width: '17rem'}} key={i}>
        <div className='skeleton_image'>
          <Skeleton height={100} width={'100%'} className="card-img-top skeleton "  />
        </div>
        <div className="card-body px-0">
          <div className='d-flex justify-content-between'>
            <div className='d-flex flex-column px-2'>
              <h5 className="skeleton_header">
                <Skeleton height={20} width={'80%'} style={{ marginBottom: '10px' }} className="skeleton" />
              </h5>
              <span className='skeleton_header pt-1'>
                <Skeleton height={20} width={'60%'} className="skeleton" />
              </span>
              <span className='skeleton_header text-decoration-line-through'>
                <Skeleton height={20} width={'60%'} className="skeleton" />
              </span>
            </div>
            <div className='pe-2'>
              <button className='btn skeleton_button'>
                <Skeleton height={30} width={80} className="skeleton" />
              </button>
            </div>
          </div>
          <div className='d-flex justify-content-between'>
            {/* Additional content if needed */}
          </div>
          <div className='position-absolute top-100 start-50 translate-middle'>
            {/* Add any additional skeleton elements here if needed */}
          </div>
        </div>
        </div>
    ))}
</>
  );
};

export const SkeletonCardBtn = () => {

  const [items, setItems] = useState([
      {key:1},{key:2},{key:3},{key:4},{key:5},{key:6}
  ])
return (
  <>
  {items.map((e,i) => (  
      // <div className="custom-card col-3 my-lg-1 SkeletonDisMovie" style={{ width: '25px'}} key={i}>
      <div className="skeletons-button" style={{height:'2rem',width:'12rem',marginLeft:'20px'}} key={i}>
      </div>
      // </div>
  ))}
</>
);
};


// export {SkeletonCard,SkeletonCardBtn};
