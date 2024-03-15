import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { addCategory } from '../../services/admin'

import styles from './category.module.css'

function CategoryForm() {

    const queryClient = useQueryClient()

    const [form, setForm] = useState({name:"", slug:"", icon:""})
    
    const {mutate, isLoading, data, error} = useMutation(addCategory, {
        onSuccess: ()=> queryClient.invalidateQueries('get-category')
    })

    const changeHandler = event => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        })
    }


    const submitHandler = (event) => {
        event.preventDefault()
        if(!form.icon || !form.name || !form.slug)return
        mutate(form)
    }

  return (
    <form onChange={changeHandler} onSubmit={submitHandler} className={styles.form}>
        <h3>دسته بندی جدید</h3>
        {data?.status === 201 && <p>دسته بندی ایجاد شد</p>}
        {!!error && <p>مشکلی پیش آمده دوباره سعی کنید</p>}
        <label htmlFor="name">اسم دسته بندی</label>
        <input type="text" name='name' id='name' />

        <label htmlFor="slug">اسلاگ</label>
        <input type="text" name='slug' id='slug' />

        <label htmlFor="icon">آیکون</label>
        <input type="text" name='icon' id='icon' />

        <button type='submit' disabled={isLoading}>ایجاد</button>
    </form>
  )
}

export default CategoryForm