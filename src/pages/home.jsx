import React, { useState } from "react";

const Home = () => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState("");
    const charLimit = 300;

    const handleInputChange = (e) => {
        if (e.target.value.length <= charLimit) {
            setNewNote(e.target.value);
        }
    };

    const handleAddNote = () => {
        if (newNote.trim() !== "") {
            setNotes([...notes, { text: newNote, isEditing: false }]);
            setNewNote("");
        }
    };

    const handleEdit = (index) => {
        const updatedNotes = [...notes];
        updatedNotes[index].isEditing = true;
        setNotes(updatedNotes);
    };

    const handleSave = (index, text) => {
        const updatedNotes = [...notes];
        updatedNotes[index].text = text;
        updatedNotes[index].isEditing = false;
        setNotes(updatedNotes);
    };

    const handleDelete = (index) => {
        const updatedNotes = notes.filter((_, i) => i !== index);
        setNotes(updatedNotes);
    };

    return (
        <>
        <div className="header">
             <h1>Note App</h1>
        </div>
        <div className="main-body">
            <div className="note-input">
                <textarea
                    value={newNote}
                    onChange={handleInputChange}
                    placeholder="Write your note here..."
                />
                <p className="char">{charLimit - newNote.length}<span>Left</span></p>
                <button className="add-note" onClick={handleAddNote}>Add Note</button>
            </div>

            <div className="notes-container">
                {notes.map((note, index) => (
                    <div key={index} className="note-card">
                        {note.isEditing ? (
                            <textarea
                                value={note.text}
                                onChange={(e) => {
                                    const updatedNotes = [...notes];
                                    updatedNotes[index].text = e.target.value;
                                    setNotes(updatedNotes);
                                }}
                            />
                        ) : (
                            <p className="text-card">{note.text}</p>
                        )}
                        <div className="note-buttons">
                            {note.isEditing ? (
                                <button onClick={() => handleSave(index, note.text)}>Save</button>
                            ) : (
                                <button onClick={() => handleEdit(index)}>Edit</button>
                            )}
                            <button onClick={() => handleDelete(index)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </>
    );
};

export default Home;
