import { Box } from "@mui/material";
import Paginator from "./Paginator";

interface PaginatorWrapperProps {
    page: number;
    lastPage: number;
    //onChange: (event: React.ChangeEvent<unknown>, newPage: number) => void;
  }
  
const PaginatorWrapper: React.FC<PaginatorWrapperProps> = ({ page, lastPage }) => {
    return lastPage > 1 ? (
        <Box mb={6} display="flex" justifyContent="center">
            <Paginator page={+page} lastPage={lastPage} navigationPath="/exhibits?page="/>
        </Box>
    ) : null;
};


export default PaginatorWrapper;