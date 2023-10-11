import React,{useState} from 'react'

export default function OptForm({orderSend}) {
    const [OptformData, setOptFormData] = useState('');

    const handleOptCheck = (event) => {

        event.preventDefault();

        if(orderSend === OptformData){
            alert('Success');
            setOptFormData('')
        }
    }
  return (
    <div className='w-100'>
        <form onSubmit={handleOptCheck} className="needs-validation" noValidate>
                <div className="mb-3">
                <label htmlFor="sixDigitInput" className="form-label">Enter 6-Digit Code:</label>
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
                <div className='text-dark fw-bold pt-2'>RESEND OTP <span className='fw-normal ps-2'>in 0:51s</span></div>
                <div className="invalid-feedback">
                    Please enter a valid 6-digit code.
                </div>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
    </div>
  )
}
