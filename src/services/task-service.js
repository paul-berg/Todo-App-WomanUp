import { db } from "../firebase-config";

import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'

/** получение ссылки на коллекцию tasks из БД */
const taskCollectionRef = collection(db, 'tasks')
/** имя коллекции из БД */
const collectionName = 'tasks'


/** создание класса с методами для работы с БД */
class TaskDataService {
    /** добавление задачи в БД 
     * @param {object} newTask - Новая задача
     * @returns {number} функция по добавлению новой задачи в коллекцию задач
    */
    addTask = (newTask) => {
        return addDoc(taskCollectionRef, newTask)
    }

    /** изменение задачи в БД 
     * @param {object} newTask - ссылки на сервис
     * @param {string} id - идентификатор задачи
     * @returns {number} функция по изменению задачи в коллекцию задач
    */
    editTask = (id, updatedTask) => {
        const taskDoc = doc(db, collectionName, id)
        return updateDoc(taskDoc, updatedTask)
    }

    /** удаление задачи из БД */
    deleteTask = (id) => {
        const taskDoc = doc(db, collectionName, id)
        return deleteDoc(taskDoc)
    }

    /** получение всех задач из БД */
    getAllTasks = () => {
        return getDocs(taskCollectionRef)
    }

    /** получение задачи из БД */
    getTask = (id) => {
        const taskDoc = doc(db, collectionName, id)
        return getDoc(taskDoc)
    }
}

export default new TaskDataService()