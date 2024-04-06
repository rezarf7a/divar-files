import React from 'react'
import { Link } from 'react-router-dom'

import styles from './main.module.css'

function Main( {posts, query} ) {

  console.log(posts)
  console.log(query.category)
  const BASE_URL = import.meta.env.VITE_BASE_URL

  const filterData = (allData, filteredValue) => {
    
      if(!filteredValue) return allData.data.posts

      return allData.data.posts.filter((item) => item.category.includes(filteredValue))
    }

    const filteredPosts = filterData(posts, query.category);

  return (
    <div className={styles.conainer}>
      {
        filteredPosts.map( item => (
          <Link key={item._id} to={`description/${item._id}`}>
            <div  className={styles.card}>
              <div className={styles.info}>
                <p>{item.options.title}</p>
                <div>
                  <p>{item.amount.toLocaleString('fa')} تومان</p>
                  <span>{item.options.city}</span>
                </div>
              </div>
              <img src={`${BASE_URL}${item.images[0]}`} alt="" />
            </div>
          </Link>
        ))
      }
    </div>
  )
}

export default Main