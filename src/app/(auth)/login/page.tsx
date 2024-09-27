import FormLogin from "@/components/form-login";
import styles from './page.module.css'
import Link from "next/link";

const LoginPage = () => {

    return (
        <div className={styles.container}>
            <div className={styles.containerForm}>
                <div className={styles.headerFormLogin}>
                    <h2>Login</h2>
                    <p>Faça aqui o seu login</p>
                </div>

                <FormLogin />
                
                <div className={styles.footerFormLogin}>
                    <p>Ainda não possui uma conta?</p>
                    <Link href={'/register'}>Criar conta</Link>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;