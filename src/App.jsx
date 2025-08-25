import { useState, useEffect } from 'react'
import Footer from './components/Footer'
import Note from './components/Note'
import Notification from './components/Notification'
import noteService from './services/notes'
import ColdStartBanner from './components/ColdStartBanner'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [apiStatus, setApiStatus] = useState('loading');

  useEffect(() => {
    // This single effect handles both checking the API status and fetching data.
    noteService.getAll()
      .then(initialNotes => {
        console.log('Backend responded and notes fetched successfully!');
        setApiStatus('success');
        setNotes(Array.isArray(initialNotes) ? initialNotes : []);
      })
      .catch(error => {
        console.error('Failed to connect to the backend or fetch notes:', error);
        setApiStatus('error');
        setErrorMessage(error.message || 'Could not fetch notes from the server.');
        setNotes([]); // Ensure notes are empty on error
      });
  }, []); // Empty dependency array ensures this runs only once on mount.

  const addNote = event => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5
    }

    noteService.create(noteObject).then(returnedNote => {
      setNotes(notes.concat(returnedNote))
      setNewNote('')
    })
  }

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => (note.id !== id ? note : returnedNote)))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const handleNoteChange = event => {
    setNewNote(event.target.value)
  }

  const notesToShow = Array.isArray(notes) 
  ? (showAll ? notes : notes.filter(note => note.important))
  : []

  return (
    <div>
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      {/* 
        Pass the status and error message to the banner.
        The banner will now decide how to render itself based on these props.
      */}
      <ColdStartBanner status={apiStatus} error={errorMessage} />

      <h1>My Awesome App</h1>

      {/* Main content can be displayed once the backend is ready */}
      {apiStatus === 'success' && (
        <div>
          <h2>Application Ready!</h2>
          <p>You can now interact with the application.</p>
        </div>
      )}
      {apiStatus === 'loading' && (
        <p>Initializing connection with the server...</p>
      )}
    </div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App
