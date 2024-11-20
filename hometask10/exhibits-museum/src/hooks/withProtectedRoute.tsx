"use client";
import React, { useEffect, useState } from "react"
import { RootState } from "@/store/store"
import { Box, CircularProgress } from "@mui/material"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"

const withProtectedRoute: React.FC = (WrappedComponent: React.FC) => {
    return (props : any) => {
        const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
        const [isLoading, setIsLoading] = useState<boolean>(true);
        const router = useRouter();

        useEffect(() => {
            if (!isAuthenticated) {
                router.push('/login');
            } else {
                setIsLoading(false);
            }
        }, [isAuthenticated, router])

        if (isLoading) {
           return (
                <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                    <CircularProgress />
                </Box>
            );
        }

        return <WrappedComponent {...props} />
    }
}

export default withProtectedRoute;