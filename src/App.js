import { useState, useEffect, useMemo } from "react";
import Header from "./components/Header";
import Note from "./components/Note";
import "./App.css";

function App() {
  const [noteData, setNoteData] = useState(() => {
    const saved = localStorage.getItem("noteData");
    return saved ? JSON.parse(saved) : [];
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    localStorage.setItem("noteData", JSON.stringify(noteData));
  }, [noteData]);

  const { allUniqueTags, tagCounts } = useMemo(() => {
    const counts = {};
    noteData.forEach((note) => {
      (note.tags || []).forEach((tag) => {
        counts[tag] = (counts[tag] || 0) + 1;
      });
    });
    return {
      allUniqueTags: Object.keys(counts),
      tagCounts: counts,
    };
  }, [noteData]);

  const filteredNotes = useMemo(() => {
    return noteData.filter((note) => {
      const noteTags = note.tags || [];
      const matchesTags = selectedTags.every((tag) => noteTags.includes(tag));

      const title = note.noteTitle || "";
      const content = note.note || "";
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        title.toLowerCase().includes(query) ||
        content.toLowerCase().includes(query);

      return matchesTags && matchesSearch;
    });
  }, [noteData, searchQuery, selectedTags]);

  const onNoteChange = (value, noteIndex) => {
    setNoteData((prev) => {
      const updated = [...prev];
      updated[noteIndex] = { ...updated[noteIndex], note: value };
      return updated;
    });
  };

  const onNoteTitleChange = (value, noteIndex) => {
    setNoteData((prev) => {
      const updated = [...prev];
      updated[noteIndex] = { ...updated[noteIndex], noteTitle: value };
      return updated;
    });
  };

  const addTagToNote = (tag, noteIndex) => {
    const cleanTag = tag.trim().toLowerCase();
    if (!cleanTag) return;

    setNoteData((prev) => {
      const updated = [...prev];
      const currentTags = updated[noteIndex].tags || [];
      if (!currentTags.includes(cleanTag)) {
        updated[noteIndex] = {
          ...updated[noteIndex],
          tags: [...currentTags, cleanTag],
        };
      }
      return updated;
    });
  };

  const removeTagFromNote = (tagToRemove, noteIndex) => {
    setNoteData((prev) => {
      const updated = [...prev];
      const currentTags = updated[noteIndex].tags || [];
      updated[noteIndex] = {
        ...updated[noteIndex],
        tags: currentTags.filter((tag) => tag !== tagToRemove),
      };
      return updated;
    });
  };

  const createNewNote = () => {
    setNoteData((prev) => [...prev, { noteTitle: "", note: "", tags: [] }]);
  };

  const deleteNote = (noteIndex) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this note?",
    );
    if (confirmed) {
      setNoteData((prev) => prev.filter((_, idx) => idx !== noteIndex));
    }
  };

  const toggleTagFilter = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  return (
    <div className="App">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        allUniqueTags={allUniqueTags}
        selectedTags={selectedTags}
        toggleTagFilter={toggleTagFilter}
        tagCounts={tagCounts}
      />

      <section className="section">
        {[...filteredNotes].reverse().map((note) => {
          const originalIndex = noteData.indexOf(note);
          return (
            <div key={originalIndex} className="note-container">
              <Note
                noteIndex={originalIndex}
                note={note.note}
                noteTitle={note.noteTitle}
                tags={note.tags || []}
                allAvailableTags={allUniqueTags}
                onNoteChange={onNoteChange}
                onNoteTitleChange={onNoteTitleChange}
                deleteNote={deleteNote}
                addTagToNote={addTagToNote}
                removeTagFromNote={removeTagFromNote}
              />
            </div>
          );
        })}
      </section>
      <div className="new-note button" onClick={createNewNote}>
        <i className="fas fa-plus"></i>
      </div>
    </div>
  );
}

export default App;
