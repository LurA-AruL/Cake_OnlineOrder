import React, { useState,useRef } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import WishList from './pages/WishLIst';
import Portfolio from './pages/Portfolio';
// import ReactsSideOfCan from './components/ReactsSideOfCan';


function App() {
const [cartCounting,setcartCounting] = useState(0);
const [activeIcon, setActiveIcon] = useState(''); // Initialize the activeIcon state
 

useState(() => {

},[])

// ----------------search fun----------------

const childInputRef = useRef(null);

  const focusChildInput = () => {

    handleIconClickOne('search');
    
    if (childInputRef.current) {
      // Use the "focus" method to place the cursor in the child input field
      childInputRef.current.focus();
    }
  };

  // ---------- end ----------------------

  // ---------------------callback function for carts counting--------------------
 
const cartItems = (cardItemValue) => {

     setcartCounting(cardItemValue);
    //  console.log(cardItemValue,"the run app.js")
}

  const handleIconClickOne = (iconName) => {
    setActiveIcon(iconName); // Set the active icon based on the clicked icon name
  };


  
  return (
    <>
      <div className='d-flex mainBody position-relative'>
      <Router> 
          
        <div className='NavBarFooter min-vh-100 col-12 d-sm-block NavBar_Bg' style={{width:"5%"}}>
        <div className='d-lg-flex mt-lg-5 flex-lg-column p-lg-2 gap-lg-5 align-items-lg-center position-sticky top-0 NavBarFooter_inner' >
        {/* <div className='d-none d-lg-block'><ReactsSideOfCan  /></div>  */}
        {/* <Link onClick={((e) => handleIconClick(e))} className='navLink_icons navLink_icons_active w-100 text-center d-md-block' to="/">      <i onClick={((e) => handleIconClickOne(e))} className="icons border-0 NavBarFooter_inner_icons bi bi-house-door NavBarFooter_inner_icons_active "></i></Link>
        <Link onClick={((e) => handleIconClick(e))} className='navLink_icons  w-100 text-center d-md-block' to="/cards">                     <i onClick={((e) => handleIconClickOne(e))} className="icons border-0 NavBarFooter_inner_icons bi bi-cart-plus position-relative"><span className="position-absolute  top-0 start-100 translate-middle badge rounded-pill bg-warning " id='badgeChangePosition'>{cartCounting}+</span></i></Link>
        <Link onClick={((e) => handleIconClick(e))} className='navLink_icons  w-100 text-center d-md-block' to="/heart">                     <i onClick={((e) => handleIconClickOne(e))} className="icons border-0 NavBarFooter_inner_icons bi bi-suit-heart "></i></Link>
        <Link onClick={((e) => handleIconClick(e))} className='navLink_icons  w-100 text-center d-lg-block d-none' to="/portfolio">          <i onClick={((e) => handleIconClickOne(e))} className="icons border-0 NavBarFooter_inner_icons bi bi-person-gear  text-black"></i></Link> */}
        <Link
        onClick={() => handleIconClickOne('home')}
        className={` w-100 text-center d-md-block text-secondary ${activeIcon === 'home' ? 'navLink_icons_active' : ''}`}
        to="/"
      >
        <i className={`icons border-0 NavBarFooter_inner_icons bi bi-house-door-fill text-secondary${activeIcon === 'home' ? 'NavBarFooter_inner_icons_active' : ''}`}></i>
      </Link>

      <Link
        onClick={focusChildInput}
        className={` w-100 text-center d-lg-none ${activeIcon === 'search' ? 'navLink_icons_active' : ''}`}
        to="#"
      >
        <i className={`icons border-0  NavBarFooter_inner_icons bi bi-search text-secondary ${activeIcon === 'search' ? 'NavBarFooter_inner_icons_active' : ''}`}></i>
      </Link>

      <Link
        onClick={() => handleIconClickOne('cart')}
        className={` w-100 text-center d-md-block ${activeIcon === 'cart' ? 'navLink_icons_active' : ''}`}
        to="/Cart"
      >
        <i className={`icons border-0 NavBarFooter_inner_icons bi bi-cart-plus-fill text-secondary position-relative ${activeIcon === 'cart' ? 'NavBarFooter_inner_icons_active' : ''}`}>
          <span className={`position-absolute top-0 start-100 translate-middle badge rounded-pill text-dark ${activeIcon === 'cart' ? 'active_icons' : ''}`}  id='badgeChangePosition'>{cartCounting}</span>
        </i>
      </Link>

      <Link
        onClick={() => handleIconClickOne('heart')}
        className={` w-100 text-center d-md-block ${activeIcon === 'heart' ? 'navLink_icons_active' : ''}`}
        to="/WishList"
      >
        <i className={`icons border-0 NavBarFooter_inner_icons bi bi-suit-heart-fill text-secondary ${activeIcon === 'heart' ? 'NavBarFooter_inner_icons_active' : ''}`}></i>
      </Link>

      <Link
        onClick={() => handleIconClickOne('portfolio')}
        className={` w-100 text-center d-none ${activeIcon === 'portfolio' ? 'navLink_icons_active' : ''}`}
        to="/portfolio"
      >
        <i className={`icons border-0 NavBarFooter_inner_icons bi bi-person-gear text-black ${activeIcon === 'portfolio' ? 'NavBarFooter_inner_icons_active' : ''}`}></i>
      </Link>
        </div>
        

        </div>
      <Routes>
        <Route path='/' element={<Home   inputRef={childInputRef}  cartItems={cartItems}/>} />
        <Route path='/Cart' element={<Cart cartreciveFun={cartItems} />} />
        <Route path='/WishList' element={<WishList />} />
        <Route path='/portfolio' element={<Portfolio />} />
      </Routes>
      </Router>
      </div>
    </>
  );
}

export default App;
