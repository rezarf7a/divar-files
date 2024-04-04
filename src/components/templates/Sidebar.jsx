import { useQuery } from '@tanstack/react-query'

import { getCategory } from '../../services/admin'

import styles from './sideBar.module.css'

function Sidebar( {category} ) {

  
  return (
    <div className={styles.sidebar}>
      <h4>دسته بندی ها</h4>
      <ul>
        {
          category?.data.map( item => <li key={item._id}>
            <img src={`${item.icon}.svg`} />
            <p>{item.name}</p>
          </li>)
        }
      </ul>
    </div>
  )
}

export default Sidebar