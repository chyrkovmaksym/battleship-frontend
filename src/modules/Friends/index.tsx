import React, { useState, useEffect } from "react";

import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import {
  useSearchUsersQuery,
  useSendFriendRequestMutation,
  useGetFriendRequestsQuery,
  useRespondToFriendRequestMutation,
  useGetFriendsQuery,
} from "@/features/friends/friendsApi";
import { toast } from "@/hooks/use-toast";
import UserCard from "./components/UserCard";

enum FriendsPageTabs {
  all = "all",
  friends = "friends",
  receivedRequests = "receivedRequests",
  sentRequests = "sentRequests",
}

const FriendsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<FriendsPageTabs>(
    FriendsPageTabs.all
  );
  const [sendFriendRequest] = useSendFriendRequestMutation();
  const [respondToFriendRequest] = useRespondToFriendRequestMutation();

  const { data: users, isLoading } = useSearchUsersQuery({
    searchTerm: debouncedSearchTerm,
  });

  const { data: receivedRequests, isLoading: isLoadingReceivedRequests } =
    useGetFriendRequestsQuery({
      type: "toUser",
    });

  const { data: sentRequests, isLoading: isLoadingSentRequests } =
    useGetFriendRequestsQuery({
      type: "fromUser",
    });

  const { data: myFriends, isLoading: isLoadingMyFriends } =
    useGetFriendsQuery();

  const handleSendRequest = async (toUserId: string) => {
    try {
      await sendFriendRequest({ toUserId }).unwrap();
      toast({
        title: "Friend request sent!",
      });
    } catch (error) {
      toast({
        title: "Error sending friend request",
        variant: "destructive",
      });
      console.error(error);
    }
  };

  const handleRespondFriendRequest = async (
    requestId: string,
    status: "accepted" | "rejected"
  ) => {
    try {
      await respondToFriendRequest({
        requestId,
        status,
      }).unwrap();
      toast({
        title: "Friend request accepted!",
      });
    } catch (error) {
      toast({
        title: "Error accepting friend request",
        variant: "destructive",
      });
      console.error(error);
    }
  };

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

  return (
    <MainLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Friends</h1>

        <div className="flex mb-4">
          <Button
            variant={activeTab === FriendsPageTabs.all ? "default" : "outline"}
            onClick={() => setActiveTab(FriendsPageTabs.all)}
          >
            All Users
          </Button>
          <Button
            variant={
              activeTab === FriendsPageTabs.friends ? "default" : "outline"
            }
            onClick={() => setActiveTab(FriendsPageTabs.friends)}
          >
            My Friends
          </Button>
          <Button
            variant={
              activeTab === FriendsPageTabs.receivedRequests
                ? "default"
                : "outline"
            }
            onClick={() => setActiveTab(FriendsPageTabs.receivedRequests)}
          >
            Received Requests
          </Button>
          <Button
            variant={
              activeTab === FriendsPageTabs.sentRequests ? "default" : "outline"
            }
            onClick={() => setActiveTab(FriendsPageTabs.sentRequests)}
          >
            Sent Requests
          </Button>
        </div>

        {activeTab === FriendsPageTabs.all && (
          <div>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <>
                <div className="flex items-center mb-4">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search..."
                    className="border border-zinc-300 rounded-md p-2 w-full"
                  />
                </div>
                <ul>
                  {users?.users.map((user) => (
                    <UserCard
                      key={user._id}
                      user={user}
                      actions={[
                        {
                          title: "Add to friends",
                          handleClick: () => handleSendRequest(user._id),
                        },
                      ]}
                    />
                  ))}
                </ul>
              </>
            )}
          </div>
        )}

        {activeTab === FriendsPageTabs.friends && (
          <div>
            {isLoadingMyFriends ? (
              <p>Loading friends list...</p>
            ) : (
              <ul>
                {myFriends?.map((friend) => (
                  <UserCard
                    key={friend._id}
                    user={{
                      _id: friend._id,
                      firstName: friend.firstName,
                      lastName: friend.lastName,
                      email: friend.email,
                    }}
                    actions={[
                      {
                        title: "Invite to game",
                        handleClick: () => console.log(friend._id),
                      },
                    ]}
                  />
                ))}
              </ul>
            )}
          </div>
        )}

        {activeTab === FriendsPageTabs.receivedRequests && (
          <div>
            {isLoadingReceivedRequests ? (
              <p>Loading received friend requests...</p>
            ) : (
              <ul>
                {receivedRequests?.requests.map((request) => (
                  <UserCard
                    key={request._id}
                    user={{
                      _id: request.fromUser,
                      firstName: request.sender.firstName,
                      lastName: request.sender.lastName,
                      email: request.sender.email,
                    }}
                    status={request.status}
                    actions={
                      request.status === "pending"
                        ? [
                            {
                              title: "Accept",
                              handleClick: () =>
                                handleRespondFriendRequest(
                                  request._id,
                                  "accepted"
                                ),
                            },
                            {
                              title: "Reject",
                              handleClick: () =>
                                handleRespondFriendRequest(
                                  request._id,
                                  "rejected"
                                ),
                            },
                          ]
                        : undefined
                    }
                  />
                ))}
              </ul>
            )}
          </div>
        )}

        {activeTab === FriendsPageTabs.sentRequests && (
          <div>
            {isLoadingSentRequests ? (
              <p>Loading sent friend requests...</p>
            ) : (
              <ul>
                {sentRequests?.requests.map((request) => (
                  <UserCard
                    key={request._id}
                    user={{
                      _id: request.toUser,
                      firstName: request.receiver.firstName,
                      lastName: request.receiver.lastName,
                      email: request.receiver.email,
                    }}
                    status={request.status}
                  />
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default FriendsPage;
