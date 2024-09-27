import styles from "@/styles/global-page.module.css";

import ListTask from "@/components/list-task";
import Header from "@/components/header";

import { getTasksCompleted } from "@/action/getTasks";

const CompletidPage = async () => {

    const conplete = await getTasksCompleted()

    return (
        <>
            <div className={styles.container}>
                <Header>
                    <h1>Tasks <span className={styles.completed}>Concluídos</span></h1>
                </Header>

                <ListTask task={conplete} />
            </div>
        </>
    )
}

export default CompletidPage;