import React,{useState,useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';


export default function OptForm({orderSend,setMbViewDirect,customerPhNo}) {
    const [OptformData, setOptFormData] = useState('');

    const [seconds, setSeconds] = useState(60);

    const navigate = useNavigate();


  useEffect(() => {

    const intervalId = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds - 1);
    }, 1000);

    // Clear the interval after 50 seconds
    setTimeout(() => {
      clearInterval(intervalId);
    }, 60000);

    
        // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

    const handleOptCheck = (event) => {

        event.preventDefault();

        if(orderSend === OptformData){
            alert('Success');
            navigate('/Cart');
            setOptFormData('');
            setMbViewDirect(false);
        }
    }
  return (
    
    <div className='w-100 shadow'>
        <form onSubmit={handleOptCheck} className="needs-validation W-100 d-flex flex-column" noValidate>
                <div className="mb-3">
                <label htmlFor="sixDigitInput" className="form-label fw-bold">Enter OTP sent to '{customerPhNo}'</label>
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
                <div className='text-dark fw-bold pt-2'>RESEND OTP <span className='fw-normal ps-2'>in 0:{seconds}s</span></div>
                <div className="invalid-feedback">
                    Please enter a valid 6-digit code.
                </div>
                </div>
                <button type="submit" className="btn btn-primary">CONTINUE</button>
            </form>
    </div>
  )
}
