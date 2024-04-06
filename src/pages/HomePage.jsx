import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { getAllPosts } from '../services/user'
import { getCategory } from '../services/admin'
// import { filterData } from '../utils/helper'

import Sidebar from '../components/templates/Sidebar'
import Main from '../components/templates/Main'
import Loader from '../components/modules/Loader'

const style = {
  display: 'flex'
}

function HomePage() {

  const { data: posts, isLoading: postsLoading } = useQuery(["get-all-posts"], getAllPosts);
  const { data: categories, isLoading: categoryLoding } = useQuery(["get-category"], getCategory);

  console.log({posts, postsLoading})
  // console.log({categories, categoryLoding})
  

  const [query, setQuery] = useState({});
  const [displayed, setDisplayed] = useState([])

  const getQuery = (data) => {
    setQuery({category: `${data}`})
  }

  // const filterData = (allData, categorys) => {
    
  //   if(!categorys) return allData
  //   return allData?.data.posts.filter(item => item.category.includes(categorys.category))
  // }
  // console.log(filterData(posts, query))

  // useEffect( () => { console.log(query)}, [query])

  return (
    <>
      {
        postsLoading || categoryLoding ? <Loader /> : (
          <div style={style}>
          <Sidebar category={categories} getQuery={getQuery}  />
          <Main posts={posts} query={query} />
          </div>
        )
      }
    </>
  )
}

export default HomePage