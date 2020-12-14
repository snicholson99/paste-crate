import React, { Component } from "react";

import "./style.css";

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowingCopiedText: false,
    };
  }

  onCopyToClipboardClick = () => {
    navigator.clipboard.writeText(this.props.note);
    this.setState({ isShowingCopiedText: true }, () => {
      setTimeout(() => {
        this.setState({ isShowingCopiedText: false });
      }, 1500);
    });
  }

  render() {
    const { onCopyToClipboardClick } = this;
    const { note, onNoteChange, noteTitle, onNoteTitleChange, noteIndex, deleteNote } = this.props;
    const { isShowingCopiedText } = this.state;
    return (
      <div className="note">
        <input
          onChange={(e) => onNoteTitleChange(e.target.value, noteIndex)}
          value={noteTitle}
          placeholder="Title"
          autoComplete="off"
          className="note-title"
        />
        <textarea
          type="text"
          onChange={(e) => onNoteChange(e.target.value, noteIndex)}
          value={note}
          placeholder="Note"
          autoComplete="off"
          className={`note-input note-${noteIndex}`}
        />
        <div className="note-options-flex-container">
          <div id="note-copy-container" className="note-option-container" onClick={onCopyToClipboardClick}>
            <p className="note-label">{isShowingCopiedText ? "Copied!" : "Copy to Clipboard"}</p>
            <i className="note-icon fas fa-clipboard"></i>
          </div>
          {/* <div id="note-delete-container" className="note-option-container" onClick={() => deleteNote(noteIndex)}>
            <i className="note-icon fas fa-trash"></i>
          </div> */}
        </div>
      </div>
    );
  }
}

export default Note;