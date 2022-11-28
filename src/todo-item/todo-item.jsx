import React, { useState, useContext } from 'react';
import dayjs from 'dayjs';
import { uploadTasks, StateContext } from '../hoc/state-provider';
import TaskDataService from '../services/task-service';
import { EditTaskForm } from '../hoc/add-edit-todo-form';
import { Button } from '../components/button';

import './todo-item.less'

const TodoItem = ( props ) => {
    const { title: loadedTitle, plot: loadedPlot, date: loadedDate,
        fileName: loadedFileName, fileUrl: loadedFileUrl, id } = props
    const { setTodos } = useContext(StateContext)
    const [editing, setEditing] = useState(false)
    const [done, setDone] = useState(false)
    const [taskTitle, setTaskTitle] = useState(loadedTitle)
    const [taskPlot, setTaskPlot] = useState(loadedPlot)
    const [taskDate, setTaskDate] = useState(loadedDate)
    const [taskFileName, setTaskFileName] = useState(loadedFileName)
    const [taskFileUrl, setTaskFileUrl] = useState(loadedFileUrl)
    const todayDate = dayjs().format('YYYY-MM-DD');
    const data = {
        taskTitle,
        taskPlot,
        taskDate,
        taskFileName,
        taskFileUrl,
        editing
    }
    const methods = {
        setEditing,
        setTaskTitle,
        setTaskPlot,
        setTaskDate,
        setTaskFileName,
        setTaskFileUrl
    }
    const deleteHandler = async (id) => {
        await TaskDataService.deleteTask(id)
        uploadTasks(setTodos)
    }
    const doneHandler = () => {
        setDone(!done)
    }
    const editHandler = () => {
        setEditing(!editing)
    }
    const doneClass = done ? 'done' : ''
    const failed = (todayDate > taskDate) ? 'red' : ''
    const newClass = `${doneClass} ${failed}`
    return (
        <li>
            <div className='todo'>
                <div>
                    <div className={`${newClass} title`}>{taskTitle}</div>
                    <div className={`${newClass} plot`}>{taskPlot}</div>
                    <div className={`${newClass} date`}>{taskDate}</div>
                    {taskFileName && taskFileUrl && (
                        <a href={taskFileUrl} download >                            
                            < Button classButton='download' content={taskFileName} />
                        </a>
                    )}
                </div>
                <div className='buttons'>
                    < Button classButton='change' onClick={ ()=> {editHandler() }} content='Change' />
                    < Button classButton='delete' onClick={ () => { deleteHandler({id}.id) }} content='Delete' />
                    < Button onClick={ () => { doneHandler() }} content='Done' />
                </div>                    
            </div>
            {editing && (
                <div className='edit-form-wrapper'>
                    <EditTaskForm id={{ id }.id}
                        {...data}
                        {...methods}

                    />
                </div>
            )}
        </li>
    );
}

export {TodoItem};
