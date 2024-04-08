import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'

import { getAllPosts } from '../services/user'
import { getCategory } from '../services/admin'
import { filterData, setParams } from '../utils/helper'

import Sidebar from '../components/templates/Sidebar'
import Main from '../components/templates/Main'
import Loader from '../components/modules/Loader'

const style = {
  display: 'flex'
}

function HomePage() {

  const [query, setQuery] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: posts, isLoading: postsLoading } = useQuery(["get-all-posts"], getAllPosts);
  const { data: categories, isLoading: categoryLoding } = useQuery(["get-category"], getCategory);

  const getQuery = (data) => {
    setQuery({category: `${data}`})
  }

  useEffect( () => {
    const query = {}
    const category = searchParams.get("category")
    if(category) query.category = category
    setQuery(query)
  }, [])

  useEffect( () => {
    setSearchParams(setParams(query))
  }, [query])

  return (
    <>
      {
        postsLoading || categoryLoding ? <Loader /> : (
          <div style={style}>
          <Sidebar category={categories} getQuery={getQuery}  />
          <Main posts={posts} query={query} filterData={filterData} />
          </div>
        )
      }
    </>
  )
}

export default HomePage