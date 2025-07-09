import React, { useState, useEffect } from "react";

const Home = () => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState("");
    const charLimit = 300;

    // ✅ Load notes on first load
    useEffect(() => {
        const savedNotes = localStorage.getItem("my-notes");
        if (savedNotes) {
            setNotes(JSON.parse(savedNotes));
        }
    }, []);

    // ✅ Save notes to localStorage every time notes change
    useEffect(() => {
        localStorage.setItem("my-notes", JSON.stringify(notes));
    }, [notes]);

    const handleInputChange = (e) => {
        if (e.target.value.length <= charLimit) {
            setNewNote(e.target.value);
        }
    };

    const handleAddNote = () => {
        if (newNote.trim() !== "") {
            const newNoteObj = {
                id: Date.now(),           // unique ID
                text: newNote.trim(),
                isEditing: false
            };
            const updated = [...notes, newNoteObj];
            setNotes(updated);
            setNewNote("");
        }
    };

    const handleEdit = (id) => {
        setNotes(notes.map(note =>
            note.id === id ? { ...note, isEditing: true } : note
        ));
    };

    const handleChange = (id, value) => {
        setNotes(notes.map(note =>
            note.id === id ? { ...note, text: value } : note
        ));
    };

    const handleSave = (id) => {
        setNotes(notes.map(note =>
            note.id === id ? { ...note, isEditing: false } : note
        ));
    };

    const handleDelete = (id) => {
        const updatedNotes = notes.filter(note => note.id !== id);
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
                    <p className="char">{charLimit - newNote.length} <span>Left</span></p>
                    <button className="add-note" onClick={handleAddNote}>Add Note</button>
                </div>

                <div className="notes-container">
                    {notes.map((note) => (
                        <div key={note.id} className="note-card">
                            {note.isEditing ? (
                                <textarea
                                    value={note.text}
                                    onChange={(e) => handleChange(note.id, e.target.value)}
                                />
                            ) : (
                                <p className="text-card">{note.text}</p>
                            )}
                            <div className="note-buttons">
                                {note.isEditing ? (
                                    <button onClick={() => handleSave(note.id)}>Save</button>
                                ) : (
                                    <button onClick={() => handleEdit(note.id)}>Edit</button>
                                )}
                                <button onClick={() => handleDelete(note.id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Home;
