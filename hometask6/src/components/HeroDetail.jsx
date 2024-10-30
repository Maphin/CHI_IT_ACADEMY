import React, { useState, useEffect } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";

const HeroDetail = () => {
    const { id } = useParams();
    const [character, setCharacter] = useState(null);

    useEffect(() => {
        const fetchCharacter = async () => {
            try {
                const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
                const data = await response.json();
                setCharacter(data);
            } catch (error) {
                console.error("Error fetching character:", error);
            }
        };

        fetchCharacter();
    }, [id]);

    if (!character) {
        return <CircularProgress />;
    }

    return (
        <Box sx={{ width: 300, padding: 2 }}>
            <img src={character.image} alt={character.name} style={{ width: '100%' }} />
            <Typography variant="h5">{character.name}</Typography>
            <Typography variant="body1">Status: {character.status}</Typography>
            <Typography variant="body1">Species: {character.species}</Typography>
        </Box>
    )
}

export default HeroDetail;