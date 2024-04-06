const filterData = (allData, categorys) => {
    if(!categorys) return allData
    allData?.data.posts.filter(item => item.category.includes(categorys))
    console.log('run')
  }

  export { filterData }