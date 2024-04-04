import React from 'react'
import { useQuery } from '@tanstack/react-query'

import { getAllPosts } from '../services/user'
import { getCategory } from '../services/admin'

import Sidebar from '../components/templates/Sidebar'
import Main from '../components/templates/Main'
import Loader from '../components/modules/Loader'

const style = {
  display: 'flex'
}

function HomePage() {

  const { data: posts, isLoading: postsLoading } = useQuery(["get-all-posts"], getAllPosts)
  const { data: categories, isLoading: categoryLoding } = useQuery(["get-category"], getCategory)


  return (
    <>
      {
        postsLoading || categoryLoding ? <Loader /> : (
          <div style={style}>
          <Sidebar category={categories} />
          <Main posts={posts} />
          </div>
        )
      }
    </>
  )
}

export default HomePage