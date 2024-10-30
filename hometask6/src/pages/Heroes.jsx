import { Box, Drawer } from "@mui/material";
import React, { useEffect, useState, useCallback } from "react";
import HeroesTable from "../components/HeroesTable";
import { Outlet, useNavigate } from "react-router-dom";

const BASE_URL = "https://rickandmortyapi.com/api/character";

const Heroes = () => {
    const [characters, setCharacters] = useState([]);
    const [paginationUrls, setPaginationUrls] = useState({ next: null, prev: null });
    const [totalCharacters, setTotalCharacters] = useState(0);
    const [paginationModel, setPaginationModel] = useState({ pageSize: 20, page: 0 });
    const [selectedCharacterID, setSelectedCharacterID] = useState(null);
    const [direction, setDirection] = useState('next');
    const navigate = useNavigate();

    const fetchCharacters = useCallback(async (url = BASE_URL) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            const { results, info: { next, prev, count } } = data;

            setCharacters(results);
            setTotalCharacters(count);
            setPaginationUrls({next, prev});

        } catch (error) {
            console.error('Error fetching characters:', error);
        }
    }, []);

    useEffect(() => {
        fetchCharacters(BASE_URL);
    }, [fetchCharacters]);

    useEffect(() => {
        const url = direction === 'next' ? paginationUrls.next : paginationUrls.prev;
        if (url || paginationModel.page === 0) {
          fetchCharacters(paginationModel.page === 0 ? BASE_URL : url);
        }
      }, [paginationModel.page]);
    
    const handlePaginationChange = (newPaginationModel) => {
        const newPage = newPaginationModel.page;
        const newDirection = newPage > paginationModel.page ? 'next' : 'prev';
        
        setDirection(newDirection);
        setPaginationModel(newPaginationModel);
    };

    const handleRowClick = (params) => {
        const selectedCharacterId = params.row.id;
        setSelectedCharacterID(selectedCharacterId);
        navigate(`/heroes/${selectedCharacterId}`);
    }

    return (
        <Box sx={{ height: 600, width: "100%" }}>
            <HeroesTable 
                characters={characters} 
                paginationModel={paginationModel} 
                totalCharacters={totalCharacters} 
                handleRowClick={handleRowClick} 
                handlePaginationChange={handlePaginationChange}
            />
            <Drawer
                anchor="right"
                open={Boolean(selectedCharacterID)}
                onClose={() => setSelectedCharacterID(null)}
                sx={{ width: 300 }}
            >
                <Outlet />
            </Drawer>
        </Box>
    )
}

export default Heroes;