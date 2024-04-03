import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import {getProfile} from '../../services/user';
import { setCookies } from '../../utils/cookies';
import { checkOtp } from '../../services/auth';

import styles from './CheckOtpForm.module.css'

function CheckOtpForm( {code, setCode, mobile, setStep} ) {

  const navigate = useNavigate()

  const { refetch } = useQuery(["profile"], getProfile)

  const submitHandler = async (e) => {
    e.preventDefault();

    if (code.length != 5) return;

    const { response, error } = await checkOtp(mobile, code)
    // console.log(response)

    if(response){
      setCookies(response.data)
      navigate("/")
      refetch()
    }
  }

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <p>تایید کد ارسال شده</p>
      <span>کد ارسال شده به شماره «{mobile}» وارد کنید</span>
      <label htmlFor="input">کد تأیید را وارد کنید</label>
      <input type="text" id='input' placeholder='کد تایید' value={code} onChange={(e) => setCode(e.target.value)} />
      <button type='submit'>ورود</button>
      <button onClick={() => setStep(1)} className={styles.backButton}>تغییر شماره موبایل</button>
    </form>
  )
}

export default CheckOtpForm