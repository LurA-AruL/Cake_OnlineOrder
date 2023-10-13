import React,{useState,useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';


export default function OptForm({OtpNumber,setMbViewDirect,customerPhNo,orderitemsSendChild,handleSubmit}) {

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

        if(/^\d{6}$/.test(OptformData) && OtpNumber === OptformData){

          setErrors(false);

          
                alert(orderitemsSendChild);
                // window.open(`https://api.whatsapp.com/send/?phone=+91${formData.phoneNumber}&text=${sendData}&type=phone_number&app_absent=0`, '_blank');
                navigate('/Cart');
                setOptFormData('');
                setMbViewDirect(false);
    
            
        }else{
          console.log('false');
          setErrors(true);
          
        }
    }
    const reGenerateOtp = () => {
      handleSubmit();
      setTimers(false);
      setSeconds(60);
      setErrors(false);
    }
  return (
    
    <div className='w-100 shadow'>
        <form onSubmit={handleOptCheck} className="needs-validation W-100 d-flex flex-column" noValidate autoComplete='off'>
                <div className="mb-3">
                  <div className='d-flex justify-content-between mb-3'>
                  <label htmlFor="sixDigitInput" className="form-label fw-bold">Enter OTP sent to '{customerPhNo}'</label>
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
                {timers ? <div className='text-dark fw-bold pt-2 cursor_pointer' onClick={reGenerateOtp}> RESEND OTP <span className='fw-normal ps-2'>in 0:0s</span> </div>: <div className='text-dark fw-bold pt-2'>RESEND OTP <span className='fw-normal ps-2'>in 0:{seconds}s</span></div>}
                
                </div>
                <button type="submit" className="btn btn-primary">CONTINUE</button>
            </form>
    </div>
  )
}
