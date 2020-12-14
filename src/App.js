import { Component } from 'react';
// import { scroller } from "react-scroll";

import Clock from './components/Clock';
import Note from './components/Note';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noteData: localStorage.getItem("noteData") ? JSON.parse(localStorage.getItem("noteData")) : [],
    }
  }
  
  onNoteChange = (value, noteIndex) => {
    this.setState(currentState => {
      let noteData = currentState.noteData;
      noteData[noteIndex].note = value;
      return {
        noteData,
      };
    }, () => {
      // update note in local storage
      localStorage.setItem("noteData", JSON.stringify(this.state.noteData));
    })
  };

  onNoteTitleChange = (value, noteIndex) => {
    this.setState(currentState => {
      let noteData = currentState.noteData;
      noteData[noteIndex].noteTitle = value;
      return {
        noteData,
      };
    }, () => {
      // update note in local storage
      localStorage.setItem("noteData", JSON.stringify(this.state.noteData));
    })
  };

  createNewNote = () => {
    this.setState({ noteData: [...this.state.noteData, { title: '', note: '' }] }, () => {
      // update notes in local storage
      localStorage.setItem("noteData", JSON.stringify(this.state.noteData));
      // scroller.scrollTo(`note-${this.state.noteData.length - 1}`, {
      //   duration: 1,
      //   delay: 0,
      //   smooth: "easeInOutQuart",
      // });
    })
    // this.setState(currentState => {
    //   let noteData = currentState.noteData;
    //   noteData.push("");
    //   console.log(noteData);
    //   return {
    //     noteData,
    //   };
    // }, () => {
    //   console.log(this.state.noteData.length);
    //   // update notes in local storage
    //   localStorage.setItem("noteData", JSON.stringify(this.state.noteData));
    //   // scroller.scrollTo(`note-${this.state.noteData.length - 1}`, {
    //   //   duration: 1,
    //   //   delay: 0,
    //   //   smooth: "easeInOutQuart",
    //   // });
    // })
  }

  deleteNote = (noteIndex) => {
    let confirmed = window.confirm("Are you sure you want to delete this note?");
    if (confirmed) {
      this.setState(currentState => {
        let noteData = currentState.noteData;
        noteData.splice(noteIndex, 1);
        return {
          noteData,
        };
      }, () => {
        // update notes in local storage
        localStorage.setItem("noteData", JSON.stringify(this.state.noteData));
      });
    }
  }


  render () {
    const { noteData } = this.state;
    const { onNoteChange, onNoteTitleChange, createNewNote, deleteNote } = this;
    return (
      <div className="App">
        <header>
          <Clock />
        </header>
        <section className="section">
          {noteData.map((note, i) => (
            <div key={i} className="note-container">
              <Note
                noteIndex={i}
                note={note.note}
                noteTitle={note.noteTitle}
                onNoteChange={onNoteChange}
                onNoteTitleChange={onNoteTitleChange}
                deleteNote={deleteNote}
              />
            </div>
          ))}
        </section>
        <div className="new-note button" onClick={createNewNote}>
          <i className="fas fa-plus"></i>
        </div>
      </div>
    );
  }
}

export default App;
