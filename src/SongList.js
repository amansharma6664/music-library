import React, { useState } from "react";

const songsData = [
  { title: "Numb", artist: "Linkin Park", album: "Meteora" },
  { title: "Fix You", artist: "Coldplay", album: "X&Y" },
  { title: "Chandelier", artist: "Sia", album: "1000 Forms of Fear" },
  { title: "Another Love", artist: "Tom Odell", album: "Long Way Down" },
  { title: "Viva La Vida", artist: "Coldplay", album: "Viva la Vida or Death and All His Friends" },
  { title: "Crawling", artist: "Linkin Park", album: "Hybrid Theory" },
  { title: "Cheap Thrills", artist: "Sia", album: "This Is Acting" },
  { title: "Grow Old with Me", artist: "Tom Odell", album: "Long Way Down" },
  { title: "In the End", artist: "Linkin Park", album: "Hybrid Theory" },
  { title: "Paradise", artist: "Coldplay", album: "Mylo Xyloto" }
]; 


const SongList = ({ role }) => {
  const [songs, setSongs] = useState(songsData);
  const [filterText, setFilterText] = useState("");
  const [sortField, setSortField] = useState("");
  const [groupBy, setGroupBy] = useState("");
  const [newSong, setNewSong] = useState({ title: "", artist: "", album: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleDelete = (title) => {
    if (role === "admin") {
      setSongs((prev) => prev.filter((song) => song.title !== title));
    }
  };

  const handleAddSong = () => {
    if (!newSong.title.trim() || !newSong.artist.trim() || !newSong.album.trim()) {
      setError("⚠️ Please fill in all fields.");
      setSuccess("");
      return;
    }

    setSongs((prev) => [...prev, newSong]);
    setNewSong({ title: "", artist: "", album: "" });
    setError("");
    setSuccess("✅ Song added successfully!");

    // Reset filters so the new song is visible
    setFilterText("");
    setSortField("");
    setGroupBy("");

    // Auto-hide success message
    setTimeout(() => setSuccess(""), 3000);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filtered = songs.filter((song) =>
    song.title.toLowerCase().includes(filterText.toLowerCase()) ||
    song.artist.toLowerCase().includes(filterText.toLowerCase()) ||
    song.album.toLowerCase().includes(filterText.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) =>
    sortField ? a[sortField].localeCompare(b[sortField]) : 0
  );

  const grouped = groupBy
    ? sorted.reduce((acc, song) => {
        const key = song[groupBy];
        if (!acc[key]) acc[key] = [];
        acc[key].push(song);
        return acc;
      }, {})
    : { All: sorted };

  return (
    <div style={{ backgroundColor: "#0d0d0d", color: "#f0f0f0", minHeight: "100vh", padding: "40px", fontFamily: "'Segoe UI', sans-serif" }}>
      <h2 style={{ fontSize: "28px", borderBottom: "2px solid #444", paddingBottom: "10px", marginBottom: "25px", textAlign: "center" }}>
        🎵 Music Library
      </h2>

       {/* ADMIN ONLY: ADD SONG  */}
      {role === "admin" && (
        <div style={{ marginBottom: "30px", border: "1px solid #333", padding: "20px", borderRadius: "8px" }}>
          <h3 style={{ marginBottom: "15px" }}>➕ Add New Song</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", marginBottom: "10px" }}>
            <input
              placeholder="Title"
              value={newSong.title}
              onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
              style={inputStyle}
            />
            <input
              placeholder="Artist"
              value={newSong.artist}
              onChange={(e) => setNewSong({ ...newSong, artist: e.target.value })}
              style={inputStyle}
            />
            <input
              placeholder="Album"
              value={newSong.album}
              onChange={(e) => setNewSong({ ...newSong, album: e.target.value })}
              style={inputStyle}
            />
            <button onClick={handleAddSong} style={addBtnStyle}>Add Song</button>
          </div>
          {error && <p style={{ color: "#ff4d4d", marginTop: "10px" }}>{error}</p>}
          {success && <p style={{ color: "#4caf50", marginTop: "10px" }}>{success}</p>}
        </div>
      )}

      {/* FILTER / SORT / GROUP */}
      <div style={{ marginBottom: "25px", display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="Search by title, artist, album..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          style={inputStyle}
        />
        <div>
          <label style={{ marginRight: "10px" }}>Sort By:</label>
          <select value={sortField} onChange={(e) => setSortField(e.target.value)} style={selectStyle}>
            <option value="">None</option>
            <option value="title">Title</option>
            <option value="artist">Artist</option>
            <option value="album">Album</option>
          </select>
        </div>
        <div>
          <label style={{ marginRight: "10px" }}>Group By:</label>
          <select value={groupBy} onChange={(e) => setGroupBy(e.target.value)} style={selectStyle}>
            <option value="">None</option>
            <option value="artist">Artist</option>
            <option value="album">Album</option>
          </select>
        </div>
      </div>

      {/* RENDER SONGS */}
      {Object.entries(grouped).map(([group, songs]) => (
        <div key={group} style={{ marginBottom: "30px" }}>
          {groupBy && (
            <h3 style={{ color: "#bbb", fontSize: "20px", borderBottom: "1px solid #333", paddingBottom: "5px" }}>
              {groupBy.toUpperCase()}: {group}
            </h3>
          )}
          <ul style={{ listStyle: "none", paddingLeft: 0 }}>
            {songs.map((song, index) => (
              <li
                key={index}
                style={{
                  background: "#1a1a1a",
                  marginBottom: "12px",
                  padding: "15px",
                  borderRadius: "8px",
                  border: "1px solid #333",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <span>
                  <b>{song.title}</b> by {song.artist} — <i>{song.album}</i>
                </span>
                {role === "admin" && (
                  <button
                    onClick={() => handleDelete(song.title)}
                    style={deleteBtnStyle}
                    onMouseOver={(e) => hoverIn(e)}
                    onMouseOut={(e) => hoverOut(e)}
                  >
                    Delete
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

// 🔘 Styling
const inputStyle = {
  padding: "10px",
  background: "#1a1a1a",
  color: "#fff",
  border: "1px solid #666",
  borderRadius: "6px",
  width: "200px"
};

const selectStyle = {
  background: "#1a1a1a",
  color: "#fff",
  border: "1px solid #666",
  padding: "8px",
  borderRadius: "6px"
};

const addBtnStyle = {
  padding: "10px 15px",
  background: "transparent",
  border: "1px solid #fff",
  color: "#fff",
  borderRadius: "6px",
  cursor: "pointer",
  transition: "0.2s"
};

const deleteBtnStyle = {
  ...addBtnStyle,
  fontSize: "14px"
};

const hoverIn = (e) => {
  e.target.style.backgroundColor = "#fff";
  e.target.style.color = "#000";
};

const hoverOut = (e) => {
  e.target.style.backgroundColor = "transparent";
  e.target.style.color = "#fff";
};

export default SongList;
