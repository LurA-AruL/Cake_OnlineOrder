import React ,{useState,useEffect}from 'react';
import { Button, Modal } from 'react-bootstrap';
import OptForm from './OptForm';
import axios from 'axios';
import '../styles/conformation.css'



export default function ConformationForm({setoptSucessThenAutoCloseModal,setMbViewDirect}) {

    const [orderSend, setOrderSend] = useState([]);
    const [specialComments,setSpecialComments] = useState(false);
    

    // optOption conditon 
    
    const [isOptOption,setIsoptOption] = useState(false);
    
    // ------------------- Model show and hide -------------------------
    // const [shows, setShows] = useState(false);

    // const handleShows = () => setShows(true);
    // const handleCloses = () => setShows(false);
    

    useEffect(() => {

        const storedCart = JSON.parse(localStorage.getItem('Conform')) || [];
        setOrderSend(storedCart);
        // console.log("trying");
        
    }, []);

    const updateCart = (updatedCart) => {
        // Update the cart in component state
        setOrderSend(updatedCart);
        // Update the cart in localStorage
        localStorage.setItem('Conform', JSON.stringify(updatedCart));
      
        // cart value increase
      };


    const [formData, setFormData] = useState({
        name: "",
        phoneNumber: ""
    });

    const [errors, setErrors] = useState({
        name: "",
        phoneNumber: ""
    });

    const minLength = 3; // Minimum length of the name
    const maxLength = 40; // Maximum length of the name
    const validCharsRegex = /^[a-zA-Z\s']+$/;

    const validateForm = () => {
        const { name, phoneNumber } = formData;
        const newErrors = {};

        // // Simple validation for name (required)
        // if (!name) {
        //     newErrors.name = "Name is required";
        // } else if (name.length < minLength || name.length > maxLength) {
        //     newErrors.name = "min 3 & max 40 letters";
        // } else if (!validCharsRegex.test(name)) {
        //     newErrors.name = "Name is only letters";
        // }



        // Simple validation for phone number (required, numeric)
        // if (!phoneNumber) {
        //     newErrors.phoneNumber = "Phone Number is required";
        // } else if (!/^\d+$/.test(phoneNumber)) {
        //     newErrors.phoneNumber = "Phone Number must contain only numbers";
        // } else if (phoneNumber.length !== 10) {
        //     newErrors.phoneNumber = "Phone Number must be 10 numbers";
        // }
       
        // Simple validation for comments (required)

        setErrors(newErrors);

        // Return true if there are no errors, false otherwise
        return Object.values(newErrors).every((error) => !error);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
             // Submit the form data or perform further actions
             const sendData = Math.floor(100000 + Math.random() * 900000).toString();

             console.log(sendData,'otp');

            const message = `
Your verification OTP is ${sendData}.
It will expire in the next 60 seconds
 - Powered by DIGITAL FACTORY`;

           
           console.log(message,'message');
            // console.log(message,'message')
            setTimeout(() => {
            updateCart('');   
            }, 20000);

            updateCart(sendData);

            setIsoptOption(true);

            handlePostRequest(message);

            console.log("Form is valid and can be submitted.",orderSend);

            // handleShows();

            // window.open(`https://api.whatsapp.com/send/?phone=+91${formData.phoneNumber}&text=${sendData}&type=phone_number&app_absent=0`, '_blank');
            // window.open(`https://x2.woonotif.com/api/send.php?number=91${formData.phoneNumber}&type=text&message=${sendData}&instance_id=65263295BD8BC&access_token=652631278d3af`);
        } else {
            console.log("Form has errors and cannot be submitted.");
        }

    };

    const handlePostRequest = async (message) => {
        try {
            const phone = '91'+formData.phoneNumber;
            console.log(phone)
          const response = await axios.get(`https://x2.woonotif.com/api/send.php?number=91${formData.phoneNumber}&type=text&message=${message}&instance_id=65263295BD8BC&access_token=652631278d3af`);
    
          // Handle the response
          console.log('Response:', response.data);
        //   ✅
        } catch (error) {
          // Handle errors
          console.error('Error:', error);
        }
      };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });


    };

    

  return (
    <div className="container Delivery_OuterWrapper">

        {isOptOption === true  ? 

        <div className=''>
             <OptForm  orderSend={orderSend}  setMbViewDirect={setMbViewDirect} customerPhNo={formData.phoneNumber}/> 
        </div>
        
        :

        <div className=''>
            <form onSubmit={handleSubmit} className="d-flex flex-column gap-3 pt-3 position-relative m-0">
        <div className="form-group">
            <label htmlFor="name" className="CustorName" >Name:</label>
            <input
                type="text"
                className="form-control CustorName_input border-0 border-bottom border-white-50 rounded-0 px-0 py-1"
                placeholder='Your name'
                id="name"
                name="name"
                onChange={handleChange}

            />
            <span className="text-danger">{errors.name}</span>
        </div>

        <div className="form-group">
            <label htmlFor="phoneNumber" className="Custorphone">Contact Number:</label>
            <input
                type="text"
                className="form-control Custorphone_input border-0 border-bottom border-white-50 rounded-0 px-0 py-1"
                placeholder='Enter contact number'
                id="phoneNumber"
                name="phoneNumber"
                onChange={handleChange}
            />
            <span className="text-danger">{errors.phoneNumber}</span>
        </div>
        <div className="form-group sticky-lg-bottom">
            <button type="submit" className="btn border w-100  whatsappBtn "><i className="bi bi-whatsapp px-2 text-success"></i>Place an Order</button>
        </div>
        {/* <div className="form-group fixed-bottom d-sm-none d-flex border-top p-2">
        <div className="w-25 p-2 fw-bold d-flex align-items-center">Total:<i className="bi bi-currency-rupee "></i><span className="fw-normal">{formattedAmount}</span></div>
            <div className="w-75 text-end p-2"><button type="submit" className="btn border whatsappBtn "><i className="bi bi-whatsapp px-2 text-success"></i>Place an Order</button></div>
        </div> */}
    </form>
        </div>
    }
</div>
  )
}
