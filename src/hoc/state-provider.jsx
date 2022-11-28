import React, { createContext, useState, useEffect } from "react"
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

import TaskDataService from '../services/task-service';

export const StateContext = createContext(null)

export const StateProvider = ({ children }) => {
    const [todos, setTodos] = useState([])
    useEffect(() => {
        uploadTasks(setTodos)
    }, []);
    const data = {todos, setTodos}
    return (
        <StateContext.Provider value={data}>
                {children}
        </StateContext.Provider>
    )
}

/** получение ссылки на URL */
const getFileUrl = async (file) => {
    /** получить ссылку на хранилище от firebase */
    const storageRef = getStorage()
    /**  создать ссылку на файл */
    const fileRef = ref(storageRef, file.name)
    /** загрузить файл из инпута */
    await uploadBytes(fileRef, file)
    // /** получить URL файла
    //  * @returns {string} URL файла
    //  */
    return getDownloadURL(fileRef)
}

/** обновление списка задач */
const uploadTasks = async (setTodos) => {
    const tasks = await TaskDataService.getAllTasks()
    setTodos(tasks.docs.map(doc => ({ ...doc.data(), id: doc.id })))
} 

const addTodo = async (e, setTodos, title, plot, date, file, fileName, setTitle, setPlot, setDate, setFile, setFileName, setMessage) => {
    e.preventDefault()
    if (title === '' || plot === '' || date === '') {
        setMessage({ error: true, msg: 'Title, plot, date fields are required!' })
        return
    }
    let newTask = {}        
    const getFileFromInput = async () => {
        const fileUrl = await getFileUrl(file)
        newTask = {
            title,
            plot,
            date,
            fileName,
            fileUrl
        }
    }
    /** проверка наличия прикрепленного файла */
    (file instanceof File) && (await getFileFromInput())
    !(file instanceof File) && (() => {
        newTask = {
            title,
            plot,
            date,
        }
    })()
    try {
        await TaskDataService.addTask(newTask)
        setMessage({ error: false, msg: '' })
        uploadTasks(setTodos)
        setTitle('')
        setPlot('')
        setDate('')
        setFile({})
        setFileName('Upload File')
    } catch (err) {
        setMessage({error: true, msg: err.message})
    }
}



const editTodo = async (e, title, plot, date, file, fileName, id,
    taskTitle, taskPlot, taskDate, taskFileName, taskFileUrl, setTaskTitle, setTaskPlot,
    setTaskDate, setTaskFileName, setTaskFileUrl, setEditing, setMessage) => {
    e.preventDefault()
    if (title === taskTitle && plot === taskPlot && date === taskDate) {
        setMessage({ error: true, msg: 'You should change at least one field!' })
        return
    }
    let editedTask = {}
    /** получение нового прикрепленного файла */
    const getFileFromInput = async () => {
        const fileUrl = await getFileUrl(file)
        editedTask = {
            title,
            plot,
            date,
            fileName,
            fileUrl
        }
    }
    /** проверка наличия нового прикрепленного файла */
    (file instanceof File) && (await getFileFromInput())
    /** проверка и действия при наличии прикрепленного файла */
    !(file instanceof File) && taskFileName && taskFileUrl && (() => {
        editedTask = {
            title,
            plot,
            date,
            fileName: taskFileName,
            fileUrl: taskFileUrl
        }
    })()
    /** проверка и действия при отсутсвии прикрепленного файла */
    !(file instanceof File) && !taskFileName && !taskFileUrl && (() => {
            editedTask = {
                title,
                plot,
                date
            }
        })()
    try {
        await TaskDataService.editTask(id, editedTask)
        /** обновления текущего дела */
        const editData = async () => {
            const task = await TaskDataService.getTask(id)
            setTaskTitle(task.data().title)
            setTaskPlot(task.data().plot)
            setTaskDate(task.data().date)
            setTaskFileName(task.data().fileName)
            setTaskFileUrl(task.data().fileUrl)
        }
        editData()
        setEditing(false)
    } catch (err) {
         setMessage({error: true, msg: err.message})
    }       
}

export {addTodo, editTodo, getFileUrl, uploadTasks}