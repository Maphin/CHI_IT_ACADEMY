import React from "react";
import { useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const HeroesTable = ({characters, paginationModel, totalCharacters, handleRowClick, handlePaginationChange}) => {
    const theme = useTheme();

    const columns = [
        {
          field: "image",
          headerName: "Image",
          width: 100,
          renderCell: (params) => (
            <img src={params.value} alt={params.row.name} width="50" height="50" />
          ),
        },
        { field: "id", headerName: "ID", width: 70 },
        { field: "name", headerName: "Name", width: 200 },
        { field: "status", headerName: "Status", width: 130 },
    ];

    return (
        <DataGrid 
                rows={characters}
                columns={columns}
                pageSizeOptions={[paginationModel.pageSize]}
                rowCount={totalCharacters}
                pagination
                paginationMode="server"
                paginationModel={paginationModel}
                onPaginationModelChange={handlePaginationChange}
                onRowClick={handleRowClick}
                sx={{
                    "& .MuiDataGrid-row:hover": {
                        backgroundColor: theme.palette.mode === 'dark' ? "#424242" : "#e0f7fa",
                        transition: "background-color 0.3s ease",
                    },
                    "& .MuiDataGrid-row:nth-of-type(odd)": {
                        backgroundColor: theme.palette.mode === 'dark' ? "#616161" : "#f5f5f5",
                    },
                    "& .MuiDataGrid-row:nth-of-type(even)": {
                        backgroundColor: theme.palette.mode === 'dark' ? "#757575" : "#ffffff",
                    },
                    "& .MuiDataGrid-cell": {
                        transition: "color 0.3s ease",
                    },
                    "& .MuiDataGrid-row:hover .MuiDataGrid-cell": {
                        color: theme.palette.mode === 'dark' ? "#fff" : "#00695c",
                    },
                }}
        />
    )
}

export default HeroesTable;