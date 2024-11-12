import { Pagination } from "@mui/material";
import React from "react";

interface PaginatorProps {
    page: number
    lastPage: number
    handlePageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const Paginator: React.FC<PaginatorProps> = ({ page, lastPage, handlePageChange }) => {
    return (
        <>
            <Pagination
                count={lastPage}
                page={page}
                onChange={handlePageChange}
                color="primary"
            />
        </>
    )
}

export default Paginator;