import React, { useCallback, useEffect, useState } from "react";
import CharacterCard from './CharacterCard';

const BASE_URL = 'https://rickandmortyapi.com/api/character';

const App = () => {
    const [characters, setCharacters] = useState([]);
    const [nextPageUrl, setNextPageUrl] = useState(null);
    const [prevPageUrl, setPrevPageUrl] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        fetchCharacters(BASE_URL);
    }, [fetchCharacters]);

    const fetchCharacters = useCallback(async (url) => {
        setLoading(true);
        try {
            const response = await fetch(url);
            const data = await response.json();
            const { results, info: { next, prev, pages } } = data;

            setCharacters(results);
            setNextPageUrl(next);
            setPrevPageUrl(prev);

            console.log(characters);

            const currentPage = next 
                ? parseInt(next.split('page=')[1]) - 1
                : pages;
            
            setCurrentPage(currentPage);
        } catch (error) {
            console.error('Error fetching characters:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    const handlePrevPage = () => {
        if (prevPageUrl) {
            fetchCharacters(prevPageUrl);
        }
    }
    const handleNextPage = () => {
        if (nextPageUrl) {
            fetchCharacters(nextPageUrl);
        }
    } 

    return (
        <div className="App">
          <div id="content">
            {!isLoading ?
            characters.map(character => (
                <CharacterCard key={character.id} character={character} />
            )) : (
                <p>Loading...</p>
              )}
          </div>
          <div className="actions">
            <button className="btn" onClick={handlePrevPage} disabled={!prevPageUrl}>
              Previous
            </button>
            <label id="currentPage">Page: {currentPage}</label>
            <button className="btn" onClick={handleNextPage} disabled={!nextPageUrl}>
              Next
            </button>
          </div>
        </div>
    );
}

export default App;