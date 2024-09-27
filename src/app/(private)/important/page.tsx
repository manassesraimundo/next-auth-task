import styles from "@/styles/global-page.module.css"

import ListTask from "@/components/list-task";
import Header from "@/components/header";

import { getTasksImportant } from "@/action/getTasks";

const ImportantTaskPage = async () => {

    const important = await getTasksImportant()

    return (
        <div className={styles.container}>
            <Header>
                <h1>Tasks <span className={styles.important}>Importante</span></h1>
            </Header>

            <ListTask task={important} />
        </div>
    )
}

export default ImportantTaskPage;