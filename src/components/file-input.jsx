import React from 'react';

const FileInput = (props) => {
    const { fileName, id, setFile, setFileName } = props
    const onFileChange = async (e) => {
        /** получение ссылки на файл */
        const loadingFile = e.target.files[0]
        setFile(loadingFile)
        setFileName(loadingFile.name)
    }   
    return (
        <label htmlFor={id}>
            <input
                type='file'
                name='file'
                className='fileItem'
                id={id}
              onChange={e => {onFileChange(e)}} />
            <span className='button'>{ fileName }</span>
        </label>
    );
}

export {FileInput};
