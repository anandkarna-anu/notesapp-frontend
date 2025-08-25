import { useState, useEffect } from 'react'
import Footer from './components/Footer'
import Note from './components/Note'
import Notification from './components/Notification'
import noteService from './services/notes'
import ColdStartBanner from './components/ColdStartBanner'
import PhoneBook from './components/PhoneBook' 
import personService from './services/persons' 

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [apiStatus, setApiStatus] = useState('loading');

  //state for phonebook
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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

  //useEffect for phonebook
   // --- 3. ADD EFFECT FOR FETCHING PERSONS ---
  // This effect runs only after the API status is 'success'
  useEffect(() => {
    if (apiStatus === 'success') {
      personService.getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
        })
        .catch(error => {
          console.error("Failed to fetch persons:", error)
          // Use the phonebook's own notification system
          setPhonebookMessage({ text: 'Failed to load phonebook data.', type: 'error' })
          setTimeout(() => setPhonebookMessage(null), 5000)
        })
    }
  }, [apiStatus]) // It depends on the apiStatus
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(p => p.name.toLowerCase() === newName.toLowerCase())

    if (existingPerson) {
      alert(`${newName} is already added to the phonebook`)
      return
    }

    const personObject = { name: newName, number: newNumber }

    personService.create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setPhonebookMessage({ text: `Added ${returnedPerson.name}`, type: 'success' })
        setTimeout(() => setPhonebookMessage(null), 5000)
      })
      .catch(error => {
        console.error(error.response.data)
        setPhonebookMessage({ text: error.response.data.error, type: 'error' })
        setTimeout(() => setPhonebookMessage(null), 5000)
      })
  }
  
  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          setPhonebookMessage({ text: `Deleted ${name}`, type: 'success' })
          setTimeout(() => setPhonebookMessage(null), 5000)
        })
        .catch(error => {
          setPhonebookMessage({ text: `Info for ${name} was already deleted`, type: 'error' })
          setPersons(persons.filter(p => p.id !== id))
          setTimeout(() => setPhonebookMessage(null), 5000)
        })
    }
  }

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
      <ColdStartBanner status={apiStatus} error={errorMessage} />
      {apiStatus === 'loading' && (
        <p>Initializing connection with the server...</p>
      )}
    </div>

    {/* Show content only when the API connection is successful */}
    {apiStatus === 'success' && (
      <div>
        {/* --- NOTES UI (UNCHANGED AS REQUESTED) --- */}
        <h1>Notes</h1>
        <Notification message={errorMessage} type="error" />
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
          <input value={newNote} onChange={handleNoteChange} placeholder="Write a new note..." />
          <button type="submit">save note</button>
        </form>

        <hr style={{ margin: '40px 0' }} /> {/* A separator for clarity */}

        {/* --- PHONEBOOK UI (NEWLY ADDED) --- */}
        <h1>Phonebook</h1>
        
        <h2>Add a new entry</h2>
        <form onSubmit={addPerson}>
          <div>
            name: <input value={newName} onChange={handleNameChange} required />
          </div>
          <div>
            number: <input value={newNumber} onChange={handleNumberChange} required />
          </div>
          <div>
            <button type="submit">add person</button>
          </div>
        </form>

        <h2>Numbers</h2>
        <ul>
          {persons.map(person => 
            <li key={person.id}>
              {person.name} {person.number} {' '}
              <button onClick={() => deletePerson(person.id, person.name)}>
                delete
              </button>
            </li>
          )}
        </ul>
      </div>
    )}
    
    <Footer />
  </div>
)
}

export default App
