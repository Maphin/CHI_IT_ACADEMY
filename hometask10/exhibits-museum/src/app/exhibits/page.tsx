import Feed from "@/components/Feed";
import { ExhibitsAPI } from "@/api/exhibitsAPI";
import React from "react";
interface ExhibitsPageProps {
    searchParams: {
      page?: number;
      limit?: number;
    };
  }

const ExhibitsPage: React.FC<ExhibitsPageProps> = async ({ searchParams }) => {
    let { page=1, limit=10 } = await searchParams;

    try {
        const exhibitsData = await ExhibitsAPI.exhibits(page, limit);
        return (
            <Feed
              initialExhibits={exhibitsData.data}
              page={Number(exhibitsData.page)}
              lastPage={exhibitsData.lastPage}
              limit={limit}
              showToaster={true}
            />
          );
    } catch (err) {
        console.error("Failed to fetch exhibits:", err);
        return <div>Failed to load exhibits. Please try again later.</div>;
    }
};

export default ExhibitsPage;
