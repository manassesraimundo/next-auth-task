import styles from '@/styles/button.module.css'
import { MdLogin } from 'react-icons/md';
import { FaUserPlus } from 'react-icons/fa';


type ButtonProps = {
    laber: string
    onClick?: () => void
    type?: 'submit'
    logn?: boolean
    registre?: boolean
    disabled?: boolean
}

const Button = ({ laber, type, onClick, logn, registre, disabled }: ButtonProps) => {
    return (
        <div className={styles.divButton}>
            {
                disabled ? (
                    <button className='buttonLoand'>
                        {
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 50 50"
                                className="semi-circle-spinner"
                            >
                                <circle
                                    cx="25" // Centro do círculo no eixo X
                                    cy="25" // Centro do círculo no eixo Y
                                    r="15"  // Raio do círculo
                                    stroke="#fff" // Cor da borda
                                    strokeWidth="5" // Largura da borda
                                    fill="none" // Sem preenchimento interno
                                    strokeLinecap="round" // Bordas arredondadas
                                    strokeDasharray="157" // Comprimento da circunferência (2 * π * r)
                                    strokeDashoffset="78.5" // Exibe apenas metade do círculo (157 / 2)
                                />
                            </svg>
                        }

                        <span>{laber} </span>
                        {
                            logn && (
                                <MdLogin size={24} color="#4d4b4b" />
                            )
                        }

                        {
                            registre && (
                                <FaUserPlus size={24} color='#4d4b4b' />
                            )
                        }
                    </button>
                )
                : (
                    <button
                        className={styles.button}
                        type={type === 'submit' ? type : 'button'}
                    >
                        <span>{laber} </span>
                        {
                            logn && (
                                <MdLogin size={24} color="white" />
                            )
                        }

                        {
                            registre && (
                                <FaUserPlus size={24} color='#fff' />
                            )
                        }
                    </button>
                )
            }
        </div>
    )
}

export default Button;