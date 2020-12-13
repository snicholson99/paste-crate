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
    const { note, onNoteChange, noteIndex, deleteNote } = this.props;
    const { isShowingCopiedText } = this.state;
    return (
      <div className="note">
        <textarea
          type="text"
          onChange={(e) => onNoteChange(e.target.value, noteIndex)}
          value={note}
          placeholder="Note"
          autoComplete="off"
          className={`note-input note-${noteIndex}`}
          name={`note-${noteIndex}`}
        />
        <div className="note-options-flex-container">
          <div className="note-copy-container" onClick={onCopyToClipboardClick}>
            <p className="note-copy-label">{isShowingCopiedText ? "Copied!" : "Copy to Clipboard"}</p>
            <i className="note-copy-icon fas fa-clipboard"></i>
          </div>
          {/* <p onClick={() => deleteNote(noteIndex)}>Delete</p> */}
        </div>
        <div>
        </div>
      </div>
    );
  }
}

export default Note;