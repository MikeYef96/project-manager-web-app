import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addHoursWasted, deleteTask } from 'redux/tasks/task-operation';
import sprite from '../../icons/symbol-defs.svg';
import styles from './TasksPageItem.module.css';

export default function TaskPageItem(task) {
  const dispatch = useDispatch();
  const [input, setInput] = useState(0);
  useEffect(() => {
    setInput(
      task.hoursWastedPerDay.find(item => {
        return (
          new Date(item.currentDay).getDate() ===
          new Date(task.currentDay).getDate()
        );
      })?.singleHoursWasted,
    );
  }, [task]);

  const onHandleChange = e => {
    const hours = Number(e.target.value);
    if (hours > 8 || hours < 0) return;
    const date = new Date(Number(e.target.dataset.date));
    const currentDay = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    const id = e.target.id;
    if (hours) {
      setInput(hours);
    }

    dispatch(addHoursWasted(id, hours, currentDay));
  };

  return (
    <li className={styles.tasksListItem} key={task._id}>
      <h5 className={styles.taskTitle}>{task.title}</h5>
      <div className={styles.planned}>
        <p className={styles.plannedTitle}>Заплановано годин </p>
        <p className={styles.plannedHours}>{task.hoursPlanned}</p>
      </div>
      <div className={styles.used}>
        <p className={styles.usedTitle}>Витрачено год/день </p>
        {task.isDisabled ? (
          <p className={styles.hoursWastedInput}>
            <span className={styles.zero}> 0 </span>
          </p>
        ) : (
          <input
            className={styles.hoursWastedInput}
            type="number"
            value={input}
            onChange={onHandleChange}
            data-date={task.currentDay}
            id={task._id}
            // disabled={task.isDisabled}
          />
        )}
      </div>
      <div className={styles.total}>
        <p className={styles.totalTitle}>Витрачено годин (загал.)</p>
        <p className={styles.totalHours}>{task.hoursWasted}</p>
      </div>
      <div className={styles.btnCont}>
        <button
          data-id={task._id}
          type="button"
          className={styles.btnDelete}
          onClick={() => dispatch(deleteTask(task._id))}
        >
          <svg className={styles.btnDeleteIcon}>
            <use href={sprite + '#icon-delete'} />
          </svg>
        </button>
      </div>
    </li>
  );
}
