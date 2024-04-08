const filterData = (allData, filteredValue) => {
    
  if(!filteredValue) return allData.data.posts

  return allData.data.posts.filter((item) => item.category.includes(filteredValue))
}

const setParams = (curentQuery) => {
  if(curentQuery.category === ''){
    return {}
  }else{
    return curentQuery
  }
}

  export { filterData, setParams }