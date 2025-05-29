import { useState, useEffect } from 'react';

function NoteForm({ addNote }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      addNote(text);
      setText('');
    }
  };

  return (
    <div className="row">
      <form className="col s12" onSubmit={handleSubmit}>
        <div className="input-field">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            id="note-input"
            placeholder="Введіть нотатку"
          />
        </div>
        <button type="submit" className="btn waves-effect waves-light">
          Додати
        </button>
      </form>
    </div>
  );
}

function NoteItem({ id, text, completed, toggleComplete, deleteNote }) {
  return (
    <li className="collection-item">
      <div className="note-container">
        <span className="delete-btn" onClick={() => deleteNote(id)}>
          X
        </span>
        <span className={completed ? 'completed note-text' : 'note-text'}>
          {text}
        </span>
        <label className="checkbox-container">
          <input
            type="checkbox"
            checked={completed}
            onChange={() => toggleComplete(id)}
          />
          <span></span>
        </label>
      </div>
    </li>
  );
}

function App() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (text) => {
    const newNote = {
      id: Date.now(),
      text,
      completed: false,
    };
    setNotes([...notes, newNote]);
  };

  const toggleComplete = (id) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, completed: !note.completed } : note
      )
    );
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div className="container">
      <h3 className="center-align">Список Нотаток</h3>
      <NoteForm addNote={addNote} />
      <ul className="collection">
        {notes.map((note) => (
          <NoteItem
            key={note.id}
            id={note.id}
            text={note.text}
            completed={note.completed}
            toggleComplete={toggleComplete}
            deleteNote={deleteNote}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;