import React, { useState } from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

import { getCategory } from '../../services/admin'
import { getCookies } from '../../utils/cookies'

import styles from "./addPost.module.css"
import toast from 'react-hot-toast'

function AddPost() {

    const [form, setForm] = useState({
        title: "",
        content: "",
        amount: null,
        city: "",
        category: "",
        image: null,
    })
  const { data } = useQuery(["get-category"], getCategory)

  const changeHandler = e => {
    
    const name = e.target.name
    
    if(e.target.name !== "image"){
      setForm({
        ...form,
        [name]: e.target.value
      })
    }else{
      setForm({
        ...form,
        [name]: e.target.files[0]
      })
    }
  }
  
  const postHandler = (e) => {
    e.preventDefault()
    const formData = new FormData();
    for( let i in form){
      formData.append(i, form[i])
    }

    const token = getCookies('accessToken')

    axios.post(`${import.meta.env.VITE_BASE_URL}post/create`, formData, {
      headers:{
        "Content-Type": "multipart/form-data",
        Authorization: `bearer ${token}`
      }
    }).then(res => toast.success(res.data.message)).catch(error => toast.error("مشکلی پیش آمده است"))
  };

  return (
    <form onChange={changeHandler} className={styles.form}>
        <h3>ایجاد آگهی جدید</h3>
        <label htmlFor="title">عنوان</label>
        <input type="text" name='title' id='title' />

        <label htmlFor="content">توضیحات</label>
        <textarea name="content" id="content" />

        <label htmlFor="amount">قیمت</label>
        <input type="number" name='amount' id='amount' />

        <label htmlFor="city">شهر</label>
        <input type="text" name='city' id='city' />

        <label htmlFor="category">دسته بندی</label>
        <select name="category" id="category">
            {data?.data.map(i => <option key={i._id} value={i._id}>{i.name}</option>)}
        </select>

        <label htmlFor="image">عکس</label>
        <input type="file" name='image' id='image' />

        <button onClick={postHandler}>ایجاد آگهی</button>
    </form>
  )
}

export default AddPost