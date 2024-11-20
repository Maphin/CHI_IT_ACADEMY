"use client";
import React from "react";
import CreateExhibitForm from "@/components/Posts/CreateExhibitForm";
import withProtectedRoute from "@/hooks/withProtectedRoute";

const CreatePost: React.FC = () => {
    return <CreateExhibitForm />
}

export default withProtectedRoute(CreatePost);