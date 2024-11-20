import { Pagination, PaginationItem } from "@mui/material";
import Link from "next/link";
import React from "react";

interface PaginatorProps {
    page: number;
    lastPage: number;
    navigationPath: string;
}

const Paginator: React.FC<PaginatorProps> = ({ page, lastPage, navigationPath }) => (
    <Pagination
        count={lastPage}
        page={page}
        color="primary"
        renderItem={(item) => (
            <PaginationItem
                {...item}
                component={Link}
                href={
                    item.type === "previous"
                        ? `${navigationPath}${page - 1}`
                        : item.type === "next"
                        ? `${navigationPath}${page + 1}`
                        : `${navigationPath}${item.page}`
                }
                disabled={
                    (item.type === "previous" && page === 1) ||
                    (item.type === "next" && page === lastPage)
                }
            />
        )}
    />
);

export default Paginator;
