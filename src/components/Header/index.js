import Clock from "../Clock";
import "./style.css";

function Header({
  searchQuery,
  setSearchQuery,
  allUniqueTags,
  selectedTags,
  toggleTagFilter,
  tagCounts,
}) {
  return (
    <header>
      <div className="header-inner-container">
        <Clock />
        <div className="search-container">
          <input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        {allUniqueTags.length > 0 && (
          <div className="global-tags-filter">
            {allUniqueTags.map((tag) => (
              <button
                key={tag}
                className={`tag-btn ${selectedTags.includes(tag) ? "active" : ""}`}
                onClick={() => toggleTagFilter(tag)}
              >
                #{tag} <span className="tag-count">({tagCounts[tag]})</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
