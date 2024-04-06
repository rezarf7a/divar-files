import { Link } from "react-router-dom"

import styles from './header.module.css'
import { useQuery } from "@tanstack/react-query"
import { getProfile } from "../services/user"
import { deleteCookie } from "../utils/cookies"
import { useState } from "react"

function Header() {

    const [show, setShow] = useState(false)

    const { isloading, data, refetch } = useQuery(['profile'], getProfile)

    const singOut = () => {
        deleteCookie()
        refetch()
    }

    const showHandler = () => {
        setShow(!show)
    }

  return (
    <header className={styles.header}>
        <div>
            <Link to='/' >
                <img src="/divar.svg" className={styles.logo} />
            </Link>
            <span>
                <img src="/location.svg" />
                <p>تهران</p>
            </span>
        </div>
        <div style={{position: 'relative'}}>
            {/* <Link to='/auth'> */}
                <span onClick={showHandler} style={{cursor: "pointer"}}>
                    <img src="/profile.svg" />
                    <p>دیوار من</p>
                </span>
            {/* </Link> */}
            {!!data && show &&
                <div className={styles.account_opt} >
                    <ul>
                        {data?.data?.role === 'ADMIN' && <li><Link to={'/admin'}>پنل ادمین</Link></li>}
                        <li><Link to={'/dashboard'}>داشبورد</Link></li>
                        <li onClick={singOut} >خروج از حساب کاربری</li>
                    </ul>
                </div>
             }
            
            <Link to='/dashboard' className={styles.button}>ثبت آگهی</Link>
        </div>
    </header>
  )
}

export default Header