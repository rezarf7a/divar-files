

import styles from './sideBar.module.css'

function Sidebar( {category, getQuery} ) {

  const clickHandler = (e) =>{
    getQuery(e.target.id)
  }
  
  return (
    <div className={styles.sidebar}>
      <h4>دسته بندی ها</h4>
      <ul onClick={clickHandler}>
        {
          category?.data.map( item => <li key={item._id}>
            <img id={item._id} src={`${item.icon}.svg`} />
            <p id={`${item._id}`} >{item.name}</p>
          </li>)
        }
      </ul>
    </div>
  )
}

export default Sidebar