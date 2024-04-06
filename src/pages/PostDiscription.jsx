import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getPostById } from '../services/user';
import styles from './postDiscription.module.css'
import api from '../configs/api';

function PostDiscription() {

  const BASE_URL = import.meta.env.VITE_BASE_URL
  const parametrs = useParams();

  const {data} = useQuery(["by-id"], () => getPostById(parametrs.id), {
    staleTime: 0,
    refetchOnMount: true,
  });

  console.log(data)
   
  return (
    <div>
        <div  className={styles.card}>
              <div className={styles.info}>
                <h3>{data?.data.post.options.title}</h3>
                <p className={styles.description}>{data?.data.post.options.content}</p>
                <div>
                  <span>{data?.data.post.options.city}</span>
                  <p>{data?.data.post.amount.toLocaleString('fa')} تومان</p>
                </div>
              </div>
              <img src={`${BASE_URL}${data?.data.post.images[0]}`} alt="" />
            </div>
    </div>
  )
}

export default PostDiscription