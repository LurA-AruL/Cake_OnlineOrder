
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import Home from '../pages/Home';
import Offcanvas from 'react-bootstrap/Offcanvas';

function ReactsSideOfCan() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant='sidebarColor' onClick={handleShow}  >
        <div className='lineone p-0 m-1'/>
        <div className='lineone p-0 m-1'/>
        <div className='lineone p-0 m-1'/>
      </Button>

      <Offcanvas  show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className='d-flex flex-column align-items-center bg-dark'>
        <Link className='navmenu_icons d-flex justify-content-start my-3 gap-3 w-75 text-center rounded link-underline link-underline-opacity-0' to="/heart"><i className="icons bi bi-suit-heart  fs-3 text-white-50 "></i><span className='ps-2 fs-3 fW-bold text-white-50'>liked</span></Link>
        <Link className='navmenu_icons d-flex justify-content-start my-3 gap-3 w-75 text-center rounded link-underline link-underline-opacity-0' to="/">     <i className="icons bi bi-house-door fs-3 text-white-50"></i><span className='ps-2 fs-3 fW-bold text-white-50'>HOME</span></Link>
        <Link className='navmenu_icons d-flex justify-content-start my-3 gap-3 w-75 text-center rounded link-underline link-underline-opacity-0' to="/"><i className="icons bi bi-cart-plus fs-3 text-white-50"></i><span className='ps-2 fs-3 fW-bold text-white-50'>CARDS</span></Link>
        <Link className='navmenu_icons d-flex justify-content-start my-3 gap-3 w-75 text-center rounded link-underline link-underline-opacity-0' to="/"><i className="icons bi bi-person-gear fs-3 text-white-50"></i><span className='ps-2 fs-3 fW-bold text-white-50'>Settings</span></Link>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default ReactsSideOfCan;


