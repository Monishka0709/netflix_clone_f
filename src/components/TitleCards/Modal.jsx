import React, { useEffect, useState } from "react";
import { color, motion } from "framer-motion";
import "./Modal.css";

const Modal = ({ showId, onClose }) => {
    console.log("Show ID in Modal:", showId); 
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`https://api.imdbapi.dev/titles/${showId}`, {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        setShow(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== "AbortError") console.error(err);
      });

      fetch(`https://api.imdbapi.dev/titles/${showId}/episodes`, {
      signal: controller.signal,
    })      
    .then((res) => res.json())
    .then((data) => {
        
      })

    return () => controller.abort();
  }, [showId]);

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modalVariants = {
    hidden: { y: "-100vh", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 120, damping: 25 },
    },
    exit: { y: "-100vh", opacity: 0 },
  };
  const backdropStyle = {
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(0,0,0,0.7)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalStyle = {
  backgroundColor: "#141414",
  color: "#fff",
  width: "70%",
  maxHeight: "80vh",
  maxWidth: "900px",
  borderRadius: "10px",
  overflowY: "auto",
};

const bannerStyle = {
  position: "relative",
};

const bannerImage = {
  width: "100%",
  height: "400px",
  objectFit: "cover",
};

const closeBtn = {
  position: "absolute",
  top: "10px",
  right: "10px",
  background: "rgba(0,0,0,0.6)",
  border: "none",
  color: "#fff",
  fontSize: "20px",
  cursor: "pointer",
};

const contentStyle = {
  padding: "20px",
  color: "#fff",
};

const overviewStyle = {
  lineHeight: "1.6",
  marginTop: "10px",
};


  if (loading) {
    return null;
  }

  return (
    <motion.div
      className="modal-backdrop"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={onClose}
      style={backdropStyle}
    >
      <motion.div
        className="modal"
        variants={modalVariants}
        onClick={(e) => e.stopPropagation()}
        style={modalStyle}
      >
        {/* Banner Image */}

        
        <div style={bannerStyle}>
          <img
            src={show?.primaryImage?.url}
            alt={show?.titleText?.text}
            style={bannerImage}
          />
          <button onClick={onClose} style={closeBtn}>✕</button>
        </div>

        <div style={contentStyle}>
          <h2>{show.primaryTitle}</h2>

          <p style={{ color: "#999" }}>
            {show.startYear} • ⭐ {show.rating.aggregateRating || "N/A"}{show.voteCount || 0} votes
          </p>
          {show.interests?.length > 0 && (
  <div className="modal-section">
    <h3>Genres</h3>
    <div className="genre-tags">
      {show.interests.map((genre) => (
        <span key={genre.id} className="genre-tag">
          {genre.name}
        </span>
      ))}
    </div>
  </div>
)}

          <p style={{ color: "#999" }}>
            {show.plot} 
          </p>
          <div className="modal-meta">
  <span>
    <strong>Country:</strong>{" "}
    {show.originCountries?.map(c => c.name).join(", ")}
  </span>

  <span>
    <strong>Language:</strong>{" "}
    {show.spokenLanguages?.map(l => l.name).join(", ")}
  </span>
</div>




{/* CAST */}

{show.stars?.length > 0 && (
  <div className="modal-section">
    <h3>Starring</h3>
    <div className="people-row">
      {show.stars.map((star) => (
        <div key={star.id} className="person-card">
          {star.primaryImage?.url && (
            <img
              src={star.primaryImage.url}
              alt={star.displayName}
              loading="lazy"
            />
          )}
          <p>{star.displayName}</p>
        </div>
      ))}
    </div>
  </div>
)}

          


          {/* DIRECTORS SECTION */}
          {show.directors?.length > 0 && (
  <div className="modal-section">
    <h3>Directors</h3>
    <div className="people-row">
      {show.directors.map((director) => (
        <div key={director.id} className="person-card">
          {director.primaryImage?.url && (
            <img
              src={director.primaryImage.url}
              alt={director.displayName}
              loading="lazy"
            />
          )}
          <p>{director.displayName}</p>
        </div>
      ))}
    </div>
  </div>
)}


        </div>
      </motion.div>
    </motion.div>
  );
};

export default Modal;
