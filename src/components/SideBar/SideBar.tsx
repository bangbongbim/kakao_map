import React from 'react';
import styles from './SideBar.module.scss'
import hamburger from '../../assets/hamburger.svg'
// import logo from '../../assets/logo.png'

function SideBar() {
    return (
        <div className={styles['container']}>
            <div className={styles['header']}>
                <img src={hamburger} className={styles['hamburger']} alt="Menu" />
                {/* TODO 로고 제작 후 삽입 */}
                {/* <img src={logo} className={styles['']} alt="Logo" /> */}
                <p className={styles['logo']}>쩝쩝박사</p>
                <div className={styles['search-box']}>
                    <input type="text" className={styles['search']} />
                </div>
            </div>
        </div >
    )
}

export default SideBar;