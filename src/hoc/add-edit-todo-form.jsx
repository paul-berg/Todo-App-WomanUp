import React, { useState } from "react"
import { Form } from "../components/form";

import { addTodo, editTodo } from "./state-provider";

/** создание HOC для разделения логики и отрисовки формы*/
const withData = (View, handleForm) => {
    return (props) => {
        const { taskTitle='', taskPlot = '', taskDate = '',
            taskFileName = 'Upload File'
        } = props
        const [title, setTitle] = useState(taskTitle)
        const [plot, setPlot] = useState(taskPlot)
        const [date, setDate] = useState(taskDate)
        const [file, setFile] = useState({})
        const [fileName, setFileName] = useState(taskFileName)
        const [message, setMessage] = useState({ error: false, msg: '' })
        const data = {
            title,
            plot,
            date,
            fileName,
            file,
            message,
        }
        const methods = {
            setTitle,
            setPlot,
            setDate,
            setFile,
            setFileName,
            setMessage,
        }
        return (
            <>
                <View {...props} handleForm={handleForm} {...data} {...methods} />
                {message.error && (
                    <div>
                        {message.msg}
                    </div>
                )}
          </>
        );
    }
}

const AddTaskForm = withData(Form, addTodo)
const EditTaskForm = withData(Form, editTodo)


export {
    AddTaskForm,
    EditTaskForm
}