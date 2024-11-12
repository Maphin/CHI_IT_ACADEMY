import React from "react";
import { CircularProgress } from "@mui/material";
import { IExhibit } from "../../types/IExhibit";
import Exhibit from "./Exhibit";
import Message from "../common/Message";

interface ExhibitsProps {
    loading: boolean; 
    error: any; 
    exhibits: IExhibit[]; 
    onReload: () => void
}

const Exhibits: React.FC<ExhibitsProps> = ({ loading, error, exhibits, onReload }) => {
    if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto' }} />;
    if (error) return <Message text="Failed to load exhibits. Please try again." />;
    if (exhibits.length === 0) return <Message text="No exhibits found." />;
    return <>{exhibits.map((exhibit) => <Exhibit key={exhibit.id} exhibit={exhibit} loadExhibits={onReload} />)}</>;
};

export default Exhibits;