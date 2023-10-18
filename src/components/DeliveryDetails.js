import React, { useState,useEffect } from "react";
import axios from "axios";
import OptForm from "./OptForm";

function DeliveryDetails({CartdetailstoDelivery,formattedAmount,handleClose,deviceToken,CartEmptyAfterOtpSub}) {

  const [OtpNumber, setOtpNumber] = useState([]);
  // const [orderSend, setOrderSend] = useState([]);

  const [verifyOrder_id, setverifyOrder_id] = useState();
  // const [device_Token,setDevice_Token] = useState()

  // cart details send to child 

  const [orderitemsSendChild, setorderitemsSendChild] = useState('');



  // optOption conditon 

  const [isOptOption, setIsoptOption] = useState(false);

  const [orderSend, setOrderSend] = useState([]);
  const [specialComments, setSpecialComments] = useState(false);
  useEffect(() => {

      const Get_optnumber = JSON.parse(localStorage.getItem('Conform')) || [];
      setOtpNumber(Get_optnumber);

      // cart values 
      const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
      setOrderSend(storedCart);

      // // get device token
      // const deviceToken = JSON.parse(localStorage.getItem('DeviceToken')) || [];
      // setDeviceTokeGet(deviceToken);

  }, [CartdetailstoDelivery]);

  // useEffect(() => {

  //     const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
  //     setOrderSend(storedCart);
  //     // console.log("trying");

  // }, [CartdetailstoDelivery]);


  const updateOtp = (updatedNumbers) => {
      // Update the cart in component state
      setOtpNumber(updatedNumbers);
      // Update the cart in localStorage
      localStorage.setItem('Conform', JSON.stringify(updatedNumbers));

      // cart value increase
  };


  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    address1: "",
    address2: "",
    comments: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    phoneNumber: "",
    address1: "",
    address2: "",
  });

  const minLength = 3; // Minimum length of the name
  const maxLength = 40; // Maximum length of the name
  const validCharsRegex = /^[a-zA-Z\s']+$/; 


  const validateForm = () => {
    const { name, phoneNumber, address1, address2 } = formData;    
    const newErrors = {};
      // Check if the name contains only valid characters

    // // Simple validation for name (required)
    if (!name) {
      newErrors.name = "Name is required";
  } else if (name.length < minLength || name.length > maxLength) {
      newErrors.name = "min 3 & max 40 letters";
  } else if (!validCharsRegex.test(name)) {
      newErrors.name = "Name is only letters";
  }

  // Simple validation for phone number (required, numeric)
  if (!phoneNumber) {
      newErrors.phoneNumber = "Phone Number is required";
  } else if (!/^\d+$/.test(phoneNumber)) {
      newErrors.phoneNumber = "Phone Number must contain only numbers";
  } else if (phoneNumber.length !== 10) {
      newErrors.phoneNumber = "Phone Number must be 10 numbers";
  } else if (!/^[6-9]\d{9}$/.test(phoneNumber)) {
      newErrors.phoneNumber = "Invalid Phone Number";
  }

    // Simple validation for address1 (required)
    if (!address1) {
      newErrors.address1 = "Address Line 1 is required";
    }

    // Simple validation for address1 (required)
    if (!address2) {
        newErrors.address2 = "Address 2 Line 1 is required";
      }

    setErrors(newErrors);

    // Return true if there are no errors, false otherwise
    return Object.values(newErrors).every((error) => !error);
  };

  const otpGenerateFun = (sendData) => {

    const sendOtp = Math.floor(100000 + Math.random() * 900000).toString();


    const message = `
Your verification OTP is ${sendOtp}.
It will expire in the next 60 seconds
- Powered by DIGITAL FACTORY`;


    console.log(message, 'message');
    // console.log(message,'message')
    setTimeout(() => {
        updateOtp('');
    }, 60000);

    updateOtp(sendOtp);

    handlePostRequest(sendData);
}


const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {


        const Nil = '-Nil';
        const total = orderSend.map(e => e.item_qty * e.item_price).reduce((e, ee) => e + ee).toFixed(2);
        // const orderDetails = orderSend.map(event => `${event.item_qty} x ${event.item_name} = ${event.item_qty * event.item_price}`);
        const orderDetails = orderSend;

        const deliveryDetails = [{
            delivery_type: "",
            Contact_name: formData.name,
            Contact_number: formData.phoneNumber,
            Address: '',
        }];

        const special_instruction = null;

        const orderListOitems = [
            {
                Cart_items: orderDetails,
                total_amount: total,
                delivery_information: deliveryDetails,
                special_instruction: special_instruction
            }
        ]
        const sendData = orderListOitems;


        otpGenerateFun(sendData);
        setorderitemsSendChild(sendData);

        // handleClose();

        // console.log(specialComments,'condition');

        // Submit the form data or perform further actions
        // console.log("Form is valid and can be submitted.");
        //             const Nil = '-Nil';
        //             const total = orderSend.map(e => e.item_qty *  e.item_price).reduce((e,ee) => e+ee );
        //             const orderDetails = orderSend.map(event => `${event.item_qty} x ${event.item_name} = ${event.item_qty * event.item_price}`);
        //             const deliveryDetails = `Name: ${formData.name}\nContact Number: ${formData.phoneNumber}`;
        //             const message = `
        // *Dear Customer,*

        //     Thank you for placing an order with *Zuka Chocolate* 😋.

        // *Your Order Details:* 📋

        // ${orderDetails.join('\n')}

        // *Total Amount* = ${total} /-

        // *Delivery Information:* 🛵 

        // ~Delivery~ / Pickup Details:

        // ${deliveryDetails}

        // *Special Instruction:* 🎯
        //     ${formData.comments.trim().length === 0 ? Nil : formData.comments  }

        //     _Kindly confirm the above details to proceed with your order_ 👆`;

        //              sendData = encodeURIComponent(message);

        // console.log(document.forms[0][0].value = " ");
        // console.log(document.forms[0][1].value = " ");
        // console.log(document.forms[0][2].value = " ");

        // formDataRecivings("hai");

        // window.open(`https://api.whatsapp.com/send/?phone=+91${formData.phoneNumber}&text=${sendData}&type=phone_number&app_absent=0`, '_blank');
        // window.open(`https://x2.woonotif.com/api/send.php?number=91${formData.phoneNumber}&type=text&message=${sendData}&instance_id=65263295BD8BC&access_token=652631278d3af`, '_blank');
        // handlePostRequest();
    } else {
        console.log("Form has errors and cannot be submitted.");
    }

};

const handlePostRequest = async (sendData) => {


    // Define the data you want to send in the POST request
    const data = {
        name: formData.name,
        mobile_number: formData.phoneNumber,
        order_details: sendData,
        device_token: deviceToken
    };

    // Make a POST request using Axios
    axios.post('https://digitalfactory.co.in/dfi/api/otp', data)
        .then(response => {
            console.log(response.data.order_id);
            setverifyOrder_id(response.data.order_id);
            console.log(deviceToken, 'device token');
            setIsoptOption(true);
            // console.log(Math.floor(Math.random() * 3),'device_Token');
            this.setState({ response: response.data });
        })
        .catch(error => {
            // Handle any errors here
            // console.error('Error:', error);
        });
};


//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (validateForm()) {

//       // handleClose();
//       // Submit the form data or perform further actions
//       // console.log("Form is valid and can be submitted.");
//       const Nil = '-Nil';
//       const total = orderSend.map(e => e.item_qty *  e.item_price).reduce((e,ee) => e+ee );
//       const orderDetails = orderSend.map(event => `${event.item_qty} x ${event.item_name} = ${event.item_qty * event.item_price}`);
//       const deliveryDetails = `Name: ${formData.name}\nContact Number: ${formData.phoneNumber}\nAddress: ${formData.address1}\nAddress2: ${formData.address2}`;
//       const message = `
// *Dear Customer,*

// Thank you for placing an order with *Zuka Chocolate* 😋.

// *Your Order Details:* 📋

// ${orderDetails.join('\n')}

// *Total Amount* = ${total} /-

// *Delivery Information:* 🛵 

// ~Pickup~ / Delivery Details:

// ${deliveryDetails}

// *Special Instruction:* 🎯
// ${formData.comments.trim().length === 0 ? Nil : formData.comments  }

// _Kindly confirm the above details to proceed with your order_ 👆`;

//       const sendData = encodeURIComponent(message);

//       // console.log(document.forms[0][0].value = " ");
//       // console.log(document.forms[0][1].value = " ");
//       // console.log(document.forms[0][2].value = " ");
//       // console.log(document.forms[0][3].value = " ");
//       // console.log(document.forms[0][4].value = " ");
//       // handlePostRequest( )
//       // window.open(`https://x2.woonotif.com/api/send.php?number=91${formData.phoneNumber}&type=text&message=${sendData}&instance_id=65263295BD8BC&access_token=652631278d3af`, '_blank');    
//       // window.open(`https://api.whatsapp.com/send/?phone=+91${formData.phoneNumber}&text=${sendData}&type=phone_number&app_absent=0`, '_blank');
//     } else {
//       console.log("Form has errors and cannot be submitted.");
//     }
//   };

  // const handlePostRequest = async () => {
    //     try {
    //         const phone = '91'+formData.phoneNumber;
    //         console.log(phone)
    //       const response = await axios.get(`https://x2.woonotif.com/api/send.php?number=91${formData.phoneNumber}&type=text&message=${sendData}&instance_id=65263295BD8BC&access_token=652631278d3af`);
    
    //       // Handle the response
    //       console.log('Response:', response.data);
    //     //   ✅
    //     } catch (error) {
    //       // Handle errors
    //       console.error('Error:', error);
    //     }
    //   }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="container position-realtive">
      {isOptOption === true ?

<div className=''>
    <OptForm OtpNumber={OtpNumber} customerPhNo={formData.phoneNumber} orderitemsSendChild={orderitemsSendChild} handleSubmit={otpGenerateFun} deviceToken={deviceToken} verifyOrder_id={verifyOrder_id} CartEmptyAfterOtpSub={CartEmptyAfterOtpSub} />
</div>

:
      <form onSubmit={handleSubmit} className="pt-3 m-0" >
        
        <div className="d-flex flex-column gap-3">
        <div className="form-group">
          <label htmlFor="name" className="font_Headers">Name:</label>
          <input
            type="text"
            className="form-control border-0 border-bottom border-white-50 rounded-0 px-0 py-1"
            placeholder='Your name'
            id="name"
            name="name"
            onChange={handleChange}
            
          />
          <span className="text-danger">{errors.name}</span>
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber"  className="font_Headers">Contact Number:</label>
          <input
            type="text"
            className="form-control border-0 border-bottom border-white-50 rounded-0 px-0 py-1"
            placeholder='Enter contact number'
            id="phoneNumber"
            name="phoneNumber"
            onChange={handleChange}
          />
          <span className="text-danger">{errors.phoneNumber}</span>
        </div>

        <div className="form-group">
          <label htmlFor="address1"  className="font_Headers">Address Line 1:</label>
          <input
            type="text"
            className="form-control border-0 border-bottom border-white-50 rounded-0 px-0 py-1"
            placeholder='Landmark / City / Postal code'
            id="address1"
            name="address1"
            onChange={handleChange}
          />
          <span className="text-danger">{errors.address1}</span>
        </div>

        <div className="form-group">
          <label htmlFor="address2"  className="font_Headers">Address Line 2:</label>
          <input
            type="text"
            className="form-control border-0 border-bottom border-white-50 rounded-0 px-0 py-1"
            placeholder='Unit / Building name / locality'
            id="address2"
            name="address2"
            onChange={handleChange}
          />
          <span className="text-danger">{errors.address2}</span>
        </div>
        </div>

        <div className="form-group mt-4">
          <label htmlFor="comments" className="font_Headers">Notes:</label>
          <textarea
            className="form-control border-0 border-bottom border-white-50 rounded-0 px-0 py-1"
            placeholder="Enter your notes here..."
            id="comments"
            name="comments"
            rows="4"
            onChange={handleChange}
          />
            <div className="form-text">We'll never share your location with anyone else.</div>
          <span className="text-danger">{errors.comments}</span>
        </div>

        <div className="form-group pt-3 whatsappBtnWrapper  sticky-lg-bottom d-none d-lg-block">
          <button type="submit" className="btn border w-100 whatsappBtn"><i className="bi bi-whatsapp px-2 text-success"></i>Place an Order</button>
        </div>

        <div className="form-group fixed-bottom d-sm-none d-flex border-top p-2">
                    <div className="w-25 p-2 fw-bold d-flex align-items-center">Total:<i className="bi bi-currency-rupee "></i><span className="fw-normal">{formattedAmount}</span></div>
                    <div className="w-75 p-2 text-end"><button type="submit" className="btn border whatsappBtn "><i className="bi bi-whatsapp px-2 text-success"></i>Place an Order</button></div>
                </div>
      </form>
}
    </div>
  );
}

export default DeliveryDetails;
