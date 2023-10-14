import React,{useState,useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function OptForm({OtpNumber,setMbViewDirect,customerPhNo,orderitemsSendChild,handleSubmit,deviceToken,verifyOrder_id}) {

    const [OptformData, setOptFormData] = useState('');

    const [seconds, setSeconds] = useState(60);

    const [timers,setTimers] = useState(false)

    const navigate = useNavigate();

    const [errors, setErrors] = useState(false);


    

  useEffect(() => {

    if(!timers){
      const intervalId = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);
  
  
      // Clear the interval after 50 seconds
      setTimeout(() => {
        clearInterval(intervalId);
        setTimers(true);
      }, 60000);
  
      
          // Cleanup the interval when the component unmounts
        return () => clearInterval(intervalId);
    }
  }, [timers]);

    const handleOptCheck = (event) => {

        event.preventDefault();

        if(/^\d{6}$/.test(OptformData)){

          setErrors(false);

          
                // alert(orderitemsSendChild);
                handlePostRequest();
                // window.open(`https://api.whatsapp.com/send/?phone=+91${formData.phoneNumber}&text=${sendData}&type=phone_number&app_absent=0`, '_blank');
                // navigate('/Cart');
                setOptFormData('');
                // setMbViewDirect(false);
    
            
        }else{
          console.log('false');
          setErrors(true);
          
        }
    };

    const handlePostRequest = async () => {


      // Define the data you want to send in the POST request
const data = {
  verify_device_token:deviceToken,
  verify_mobile_number:customerPhNo,
  verify_order_id:verifyOrder_id,
  verify_otp: OptformData
  };
 
  // Make a POST request using Axios
  axios.post('https://digitalfactory.co.in/dfi/api/otp', data)
  .then(response => {
    console.log(response.status)
if(response.status === 'success');
{
  alert('success');
}

  this.setState({ response: response.data });
  })
  .catch(error => {
  // Handle any errors here
  // console.error('Error:', error);
  });

  //     try {
  //     const PhoneNumber = formData.phoneNumber;
  //         console.log(formData.phoneNumber,'phone')
  //     //   const response = await axios.get(`https://x2.woonotif.com/api/send.php?number=91${formData.phoneNumber}&type=text&message=${message}&instance_id=65263295BD8BC&access_token=652631278d3af`);
  //           const response = await axios.get(`http://smsc.biz/httpapi/send?username=kalil@digitalfactoryindia.com&password=Pondy605001&sender_id=DGFYIN&route=T&phonenumber=7094030845&message=12345 is your DIGITAL FACTORY verification code.`)
  //     // Handle the response
  //       console.log('Response:', response.data);
  //     //   ✅
  //     } catch (error) {
  //       // Handle errors
  //       console.error('Error:', error);
  //     }
    };

    const reGenerateOtp = () => {
      handleSubmit();
      setTimers(false);
      setSeconds(60);
      setErrors(false);
    }
  return (
    
    <div className='w-100 shadow rounded'>
        <form onSubmit={handleOptCheck} className="needs-validation W-100 d-flex flex-column" noValidate autoComplete='off'>
                <div className="mb-3">
                  <div className='d-flex justify-content-between mb-3'>
                  <label htmlFor="sixDigitInput" className="form-label fw-bold">Enter OTP sent to '<span className='customer_number'>{customerPhNo}</span>'</label>
                <label onClick={() => setMbViewDirect(false)} className='fw-bold fs-6 cursor_pointer'>X</label>
                  </div>
                <input
                    type="text"
                    id="sixDigitInput"
                    name="otpnumber"
                    pattern="[0-9]{6}"
                    value={OptformData}
                    onChange={(e) => setOptFormData(e.target.value)}
                    className="form-control"
                    required
                />
                { errors && (
                <div className='text-danger'>
                     Please enter a valid 6-digit code.
                </div>
                )}
                {timers ? <div className='resend_otp fw-bold pt-2 cursor_pointer' onClick={reGenerateOtp}> RESEND OTP <span className='fw-normal ps-2'>in 0:0s</span> </div>: <div className='text-secondary fw-bold pt-2'>RESEND OTP <span className='fw-normal ps-2'>in 0:{seconds}s</span></div>}
                
                </div>
                <button type="submit" className="btn otp_submit">CONTINUE</button>
            </form>
    </div>
  )
}
