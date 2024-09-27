"use client";

import React from "react";
import styles from "@/styles/list-task.module.css";

import CardTask, { taskProps } from "./card-task";
import NewTaskModal from "./new-task";

import { IoMdAdd } from "react-icons/io";

type taskPropsList = {
    task: taskProps[]
}

const ListTask = ({ task }: taskPropsList) => {

    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className={styles.containerlistTasks}>
            <div className={styles.cardFlex}>
                {
                    task.map(task => (
                        <CardTask
                            key={task.id}
                            id={task.id}
                            title={task.title}
                            description={task.description}
                            completed={task.completed}
                            important={task.important}
                        />
                    ))
                }
                <button
                    onClick={() => setIsOpen(true)}
                    className={styles.btnAddTask}
                >
                    <IoMdAdd size={24} color="#fff" />
                    Add Task
                </button>
            </div>

            <NewTaskModal isOpen={isOpen} closeModal={() => setIsOpen(false)} />
        </div>
    );
}

export default ListTask;