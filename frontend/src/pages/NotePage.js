import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'

const NotePage = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [note, setNote] = useState(null)

    useEffect(() => {
        getNote()
    // eslint-disable-next-line
    },[id])

    const getNote = async () => {
        if (id === 'new') return
        let response = await fetch(`/api/notes/${id}/`)
        let data = await response.json()
        setNote(data)
    }

    const updateNote = async () => {
        await fetch(`/api/notes/${id}/`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(note)
        })
    }

    const deleteNote = async () => {
        await fetch(`/api/notes/${id}/`,{
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        navigate('/')
    }

    const createNote = async () => {
        await fetch(`/api/notes/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(note)
        })
        navigate('/')
    }

    const handleSubmit = () => {
        if (id !== 'new' && note.body === ''){
            deleteNote()
        } else if (id !== 'new') {
            updateNote()
        } else if (id === 'new' && note !== null) {
            createNote()
        }
        
        navigate('/')
    }

    const handleChange = (value) => {
        setNote((note) => ({ ...note, 'body':value }))
    }

    return (
        <div className="note">
            <div className="note-header">
                <h3>
                    <ArrowLeft onClick={handleSubmit}/>
                </h3>
                {id !== 'new' ? (
                    <button onClick={deleteNote}>DELETE</button>
                ) : (
                    <button onClick={createNote}>DONE</button>
                )}
            </div>
            <textarea onChange={(e) => {handleChange(e.target.value)}} value={note?.body}></textarea>
        </div>
    )
}

export default NotePage