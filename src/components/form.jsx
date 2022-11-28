import React, { useContext } from 'react';
import dayjs from 'dayjs';
import { StateContext } from '../hoc/state-provider';
import { TextInput } from '../components/text-input';
import { FileInput } from '../components/file-input';

const Form = (props) => {
    /** деструктуризация объекта пропс */
    const { handleForm, title, plot, date, fileName, file, fileUrl ,
        setTitle, setPlot, setDate, setFile, setFileName, setMessage,
        taskTitle, taskPlot, taskDate, taskFileName, taskFileUrl, setTaskTitle, setTaskPlot, setTaskDate, setTaskFileName,
        setTaskFileUrl, setEditing, editing = false, id } = props
    const { setTodos } = useContext(StateContext)
    /** определение аргументов для передачи */
    const argsAdd = [setTodos, title, plot, date, file, fileName, setTitle,
        setPlot, setDate, setFile, setFileName, setMessage]
    const argsEdit = [title, plot, date, file, fileName, id, taskTitle,
        taskPlot, taskDate, taskFileName, taskFileUrl, setTaskTitle, setTaskPlot,
        setTaskDate, setTaskFileName, setTaskFileUrl, setEditing, setMessage]
    
    const args = editing ? argsEdit : argsAdd
    const doTask = editing ? 'Update' : 'Add'
    return (
        <>
            <form className='add-Task' onSubmit={e => handleForm( e, ...args)}>
                <TextInput name='title' value={title} text='title'
                    changeHandler={e => setTitle(e.target.value)} />    
                <TextInput name='plot' value={plot} text='description'
                    changeHandler={e => setPlot(e.target.value)} />    
                <TextInput name='date' value={date} text='deadline'
                    changeHandler={e => setDate(dayjs(e.target.value).format('YYYY-MM-DD'))} />    
                <div>
                    < FileInput fileName={fileName} id={id}
                        setFile={setFile} setFileName={setFileName} />
                 <input type='submit' className='button' value={`${doTask} task`}/>
                </div>              
            </form>
        </>
    );
}

export {Form};
