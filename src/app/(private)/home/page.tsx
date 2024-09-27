import styles from "@/styles/global-page.module.css"

import ListTask from "@/components/list-task";
import Header from "@/components/header";

import { getTasks } from "@/action/getTasks";

const HomePage = async () => {

    const task = await getTasks();

    return (
        <>
            <div className={styles.container}>
                <Header>
                    <h1>Listar todas as Tasks</h1>
                </Header>

                <ListTask task={task} />
            </div>
        </>
    )
}

export default HomePage;