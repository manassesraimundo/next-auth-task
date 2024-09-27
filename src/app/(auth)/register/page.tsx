import Link from "next/link";
import styles from "./page.module.css";

import FormRegister from "@/components/form-register";

const RessisterPage = () => {

    return (
        <div className={styles.container}>
            <div className={styles.containerForm}>
                <div className={styles.headerFormLogin}>
                    <h2>Registrar</h2>
                    <p>Faça aqui o seu registro</p>
                </div>

                <FormRegister />

                <div className={styles.footerFormLogin}>
                    <p>Já possui uma conta?</p>
                    <Link href={'/login'}>Entrar</Link>
                </div>
            </div>
        </div>
    )
}

export default RessisterPage;