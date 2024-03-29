import React from 'react'
import { useQuery } from '@tanstack/react-query'

import { getPosts } from '../../services/user'
import Loader from '../modules/Loader'

import styles from "./postList.module.css"

function PostList() {

    const { data, isLoading } = useQuery(["get-my-posts"], getPosts)
    // console.log({isLoading, data})
    // console.log(data.data.posts)
    
  return (
    <div className={styles.list}>
      {isLoading ? <Loader /> :
      (<>
        <h3>آگهی های شما</h3>
        {
          data.data.posts.map( post => (
            <div key={post._id} className={styles.post}>
              <img src={post.images.length ? `${import.meta.env.VITE_BASE_URL}${post.images[0]}` : 'no-image.jpg'} />
              <div>
                <p>{post.options.title}</p>
                <span>{post.options.content}</span>
              </div>
              <div className={styles.price}>
                <p>{new Date(post.createdAt).toLocaleDateString("fa-IR")}</p>
                <span>{post.amount.toLocaleString("fa")} تومان</span>
              </div>
            </div>
          ))
        }
      </>)
      }
    </div>
  )
}

export default PostList