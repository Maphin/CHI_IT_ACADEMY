import { Box, Drawer } from "@mui/material";
import React, { useEffect, useState } from "react";
import HeroesTable from "../components/HeroesTable";
import { Outlet, useNavigate } from "react-router-dom";
import { useRequest } from 'ahooks';
import { fetchCharacters } from "../api/api";

const Heroes = () => {
    const [characters, setCharacters] = useState([]);
    const [paginationUrls, setPaginationUrls] = useState({ next: null, prev: null });
    const [totalCharacters, setTotalCharacters] = useState(0);
    const [paginationModel, setPaginationModel] = useState({ pageSize: 20, page: 0 });
    const [selectedCharacterID, setSelectedCharacterID] = useState(null);
    const navigate = useNavigate();

    const { run, loading, error } = useRequest(fetchCharacters, {
        manual: true,
        onSuccess: (data) => {
            const { results, info: { next, prev, count } } = data;
            setCharacters(results);
            setTotalCharacters(count);
            setPaginationUrls({next, prev});
        },
        onError: (error) => {
            console.error('Error fetching characters:', error);
        }
    })

    useEffect(() => {
        run();
    }, [run]);
    
    const handlePaginationChange = (newPaginationModel) => {
        const newPage = newPaginationModel.page;
        const newDirection = newPage > paginationModel.page ? 'next' : 'prev';
        
        setPaginationModel(newPaginationModel);

        const url = newDirection === 'next' ? paginationUrls.next : paginationUrls.prev;
        run(url);
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
                loading={loading}
                error={error}
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