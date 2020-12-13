import { Component } from 'react';
import { scroller } from "react-scroll";

import Clock from './components/Clock';
import Note from './components/Note';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noteList: localStorage.getItem("noteList") ? JSON.parse(localStorage.getItem("noteList")) : [],
    }
  }
  
  onNoteChange = (value, noteIndex) => {
    this.setState(currentState => {
      let noteList = currentState.noteList;
      noteList[noteIndex] = value;
      return {
        noteList,
      };
    }, () => {
      // update note in local storage
      localStorage.setItem("noteList", JSON.stringify(this.state.noteList));
    })
  };

  createNewNote = () => {
    this.setState({ noteList: [...this.state.noteList, ''] }, () => {
      // update notes in local storage
      localStorage.setItem("noteList", JSON.stringify(this.state.noteList));
      // scroller.scrollTo(`note-${this.state.noteList.length - 1}`, {
      //   duration: 1,
      //   delay: 0,
      //   smooth: "easeInOutQuart",
      // });
    })
    // this.setState(currentState => {
    //   let noteList = currentState.noteList;
    //   noteList.push("");
    //   console.log(noteList);
    //   return {
    //     noteList,
    //   };
    // }, () => {
    //   console.log(this.state.noteList.length);
    //   // update notes in local storage
    //   localStorage.setItem("noteList", JSON.stringify(this.state.noteList));
    //   // scroller.scrollTo(`note-${this.state.noteList.length - 1}`, {
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
        let noteList = currentState.noteList;
        noteList.splice(noteIndex);
        return {
          noteList,
        };
      }, () => {
        // update notes in local storage
        localStorage.setItem("noteList", JSON.stringify(this.state.noteList));
      });
    }
  }


  render () {
    const { noteList } = this.state;
    const { onNoteChange, createNewNote, deleteNote } = this;
    return (
      <div className="App">
        <header>
          <Clock />
        </header>
        <section className="section">
          {noteList.map((note, i) => (
            <div key={i} className="note-container">
              <Note
                noteIndex={i}
                note={note}
                onNoteChange={onNoteChange}
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
