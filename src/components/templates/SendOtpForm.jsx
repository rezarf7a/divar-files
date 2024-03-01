import React, { useEffect } from 'react'
import { sendOtp } from '../../services/auth'

function SendOtpForm( {mobile, setMobile, setStep} ) {
    const submitHandler = async (e)=>{

        e.preventDefault()

        if(mobile.length !== 11) return;

        const {response, error} = await sendOtp(mobile);

        if(response) setStep(2)
    }
  return (
    <form onSubmit={submitHandler}>
        <p>شمارهٔ موبایل خود را وارد کنید</p>
        <span>برای استفاده از امکانات دیوار، لطفاً شمارهٔ موبایل خود را وارد کنید. کد تأیید به این شماره پیامک خواهد شد.</span>
        <label htmlFor="input">شماره موبایل خود را وارد کنید</label>
        <input type="text" id='input' placeholder='شماره موبایل' value={mobile} onChange={(e)=> setMobile(e.target.value)} />
        <button type='submit'>ارسال کد تایید</button>
    </form>
  )
}

export default SendOtpForm