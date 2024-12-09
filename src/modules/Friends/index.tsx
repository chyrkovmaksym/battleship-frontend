import React, { useState, useEffect } from "react";

import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import AllUsersTab from "./components/AllUsersTab";

enum FriendsPageTabs {
  all = "all",
  friends = "friends",
}

const FriendsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<FriendsPageTabs>(
    FriendsPageTabs.friends
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const tabs: Record<FriendsPageTabs, React.ReactNode> = {
    [FriendsPageTabs.all]: <AllUsersTab searchValue={debouncedSearchTerm} />,
    [FriendsPageTabs.friends]: (
      <AllUsersTab searchValue={debouncedSearchTerm} />
    ),
  };

  return (
    <MainLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Friends</h1>
        <div className="flex items-center mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search..."
            className="border border-zinc-300 rounded-md p-2 w-full"
          />
        </div>

        <div className="flex mb-4">
          <Button
            variant={
              activeTab === FriendsPageTabs.friends ? "default" : "outline"
            }
            onClick={() => setActiveTab(FriendsPageTabs.friends)}
          >
            My Friends
          </Button>
          <Button
            variant={activeTab === FriendsPageTabs.all ? "default" : "outline"}
            onClick={() => setActiveTab(FriendsPageTabs.all)}
          >
            All Users
          </Button>
        </div>
        {tabs[activeTab]}
      </div>
    </MainLayout>
  );
};

export default FriendsPage;
