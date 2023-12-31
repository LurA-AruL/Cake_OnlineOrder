import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import '../styles/Successmsg.css'


function SuccessMsg({successMessage}) {
  const [show, setShow] = useState(true);

  return (
    <Row>
      <Col>
        <Toast onClose={() => setShow(false)} show={show} delay={4000} autohide className='toastWrapper'>
          {/* <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Bootstrap</strong>
            <small>11 mins ago</small>
          </Toast.Header> */}
          <Toast.Body className='bg-success Successfully_message rounded text-center text-white'>{successMessage}</Toast.Body>
          {/* <div class="cracker"></div> */}
        </Toast>
      </Col>
      {/* <Col xs={6}>
        <Button onClick={() => setShow(true)}>Show Toast</Button>
      </Col> */}
    </Row>
  );
}

export default SuccessMsg;