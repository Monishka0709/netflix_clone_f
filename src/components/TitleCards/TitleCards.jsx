import React, { useState, useEffect } from 'react'
import './TitleCards.css'
import { AnimatePresence } from 'framer-motion';
import Modal from './Modal';


const TitleCards = ({props}) => {
    const [cardsData, setCardsData] = useState([]);
    
      const [selectedItem, setSelectedItem] = useState(null);
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
    const controller = new AbortController();

    fetch("https://api.imdbapi.dev/titles", {
      signal: controller.signal,
    })
      .then((response) => response.json())
      .then((data) => {
        setCardsData(data.titles || []);

        setLoading(false);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error(error);
        }
      });

    return () => controller.abort();
  }, []);

  return (
    <div className='titlecards'>
        <h2>{props.heading}</h2>
        <div className="card-list">
            <div className="cards-container">
        {loading ? (
          <p>Loading...</p>
        ) : (
          cardsData.map((card) => (
            <div key={card.id} className="card" onClick={() => setSelectedItem(card)}>
                <img loading='lazy' src={card.primaryImage.url} alt={card.primaryTitle} className='card-image'/>
                <p>{card.primaryTitle}</p>
                </div>
        )))}
            
        </div>
        </div>

        {/* ................................ */}
        <AnimatePresence>
        {selectedItem && (
          <Modal showId={selectedItem.id}  onClose={() => setSelectedItem(null)} />
        )}
      </AnimatePresence>
      
    </div>
  )
}

export default TitleCards 
