import React, { useState } from "react";
import "./style.css";

function Note({
  note,
  onNoteChange,
  noteTitle,
  onNoteTitleChange,
  noteIndex,
  deleteNote,
  tags,
  allAvailableTags,
  addTagToNote,
  removeTagFromNote,
}) {
  const [isShowingCopiedText, setIsShowingCopiedText] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);

  const onCopyToClipboardClick = () => {
    navigator.clipboard.writeText(note);
    setIsShowingCopiedText(true);
    setTimeout(() => {
      setIsShowingCopiedText(false);
    }, 1500);
  };

  const handleTagInputChange = (e) => {
    const value = e.target.value;
    let filteredSuggestions = [];

    if (value.trim()) {
      filteredSuggestions = allAvailableTags.filter(
        (tag) =>
          tag.toLowerCase().includes(value.toLowerCase()) &&
          !tags.includes(tag),
      );
    }

    setTagInput(value);
    setSuggestions(filteredSuggestions);
    setActiveSuggestionIndex(0);
  };

  const selectSuggestion = (tag) => {
    addTagToNote(tag, noteIndex);
    setTagInput("");
    setSuggestions([]);
    setActiveSuggestionIndex(0);
  };

  const handleTagKeyDown = (e) => {
    if (suggestions.length > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveSuggestionIndex((prev) => (prev + 1) % suggestions.length);
        return;
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveSuggestionIndex(
          (prev) => (prev - 1 + suggestions.length) % suggestions.length,
        );
        return;
      } else if (e.key === "Enter" || e.key === "Tab") {
        e.preventDefault();
        selectSuggestion(suggestions[activeSuggestionIndex]);
        return;
      }
    }

    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newTag = tagInput.replace(/,/g, "").trim();
      if (newTag) {
        addTagToNote(newTag, noteIndex);
        setTagInput("");
        setSuggestions([]);
      }
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      setSuggestions([]);
    }, 200);
  };

  return (
    <div className="note">
      <input
        onChange={(e) => onNoteTitleChange(e.target.value, noteIndex)}
        value={noteTitle || ""}
        placeholder="Title"
        autoComplete="off"
        className="note-title"
      />

      <div className="note-tags-section">
        <div className="autocomplete-wrapper">
          <input
            type="text"
            placeholder="Add tag..."
            value={tagInput}
            onChange={handleTagInputChange}
            onKeyDown={handleTagKeyDown}
            onBlur={handleBlur}
            className="note-tag-input"
          />
          {suggestions.length > 0 && (
            <ul className="suggestions-dropdown">
              {suggestions.map((suggestion, idx) => (
                <li
                  key={suggestion}
                  className={`suggestion-item ${idx === activeSuggestionIndex ? "active" : ""}`}
                  onMouseDown={() => selectSuggestion(suggestion)}
                >
                  #{suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="note-tags-list">
          {tags.map((tag) => (
            <span key={tag} className="note-tag">
              #{tag}
              <button
                type="button"
                className="remove-tag-btn"
                onClick={() => removeTagFromNote(tag, noteIndex)}
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      </div>

      <textarea
        onChange={(e) => onNoteChange(e.target.value, noteIndex)}
        value={note || ""}
        placeholder="Note"
        autoComplete="off"
        className={`note-input note-${noteIndex}`}
      />

      <div className="note-options-flex-container">
        <div
          id="note-copy-container"
          className="note-option-container"
          onClick={onCopyToClipboardClick}
        >
          <p className="note-label">
            {isShowingCopiedText ? "Copied!" : "Copy to Clipboard"}
          </p>
          <i className="note-icon fas fa-clipboard"></i>
        </div>
        <div
          id="note-delete-container"
          className="note-option-container"
          onClick={() => deleteNote(noteIndex)}
        >
          <i className="note-icon fas fa-trash"></i>
        </div>
      </div>
    </div>
  );
}

export default Note;
