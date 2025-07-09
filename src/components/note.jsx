import React, { useState } from 'react'
import Createnote from './createNote'
import './note.css'


const Note = () => {
    const [inputText, setInputText] = useState ("")
    const [note, setNotes] = useState ([])
    const saveHandler = () =>{
        setNotes((prevNote) => [
            ...prevNote,
            {
                text: inputText,
                id: Date.now()
            }
        ])
        setInputText(""); // Clear input after saving
    }
  return (
    <div className='notes'>
      <Createnote 
        inputText={inputText}
        setInputText={setInputText}
        saveHandler={saveHandler}
      />
      <div className='note-list'>
        {note.map((item) => (
          <div key={item.id} className='note-item'>
            {item.text}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Note;