import React, { useState, useEffect } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import { useRequest } from "ahooks";
import { fetchCharacter } from "../api/api";

const HeroDetail = () => {
    const { id } = useParams();
    const [character, setCharacter] = useState(null);

    const { data, run, loading } = useRequest(() => fetchCharacter(id), {
        manual: true,
        onSuccess: (data) => {
            setCharacter(data);
        },
        onError: (error) => {
            console.log("Error fetching character:", error);
        }
    })

    useEffect(() => {
        run();
    }, [run, id]);

    if (loading) {
        return <CircularProgress />;
    }

    if (!character) {
        return <Typography>No character found.</Typography>;
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