"use client";

// import styles from '@/styles/button-menu.module.css';

const ButtonMenu = () => {

    const opne = () => {
        const menu = document.getElementById('menu');
        if (menu)
            menu?.classList.add('activeMenu')
    }

    // return <button onClick={opne} className={styles.button}>Menu</button>
}

// export default ButtonMenu;