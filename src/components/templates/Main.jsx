import React from 'react'

import styles from './main.module.css'

function Main( {posts} ) {
  console.log(posts)
  const BASE_URL = import.meta.env.VITE_BASE_URL
  return (
    <div className={styles.conainer}>
      {
        posts.data.posts.map( item => (
          <div key={item._id} className={styles.card}>
            <div className={styles.info}>
              <p>{item.options.title}</p>
              <div>
                <p>{item.amount.toLocaleString('fa')} تومان</p>
                <span>{item.options.city}</span>
              </div>
            </div>
            <img src={`${BASE_URL}${item.images[0]}`} alt="" />
          </div>
        ))
      }
    </div>
  )
}

export default Main