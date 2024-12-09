import {
  useSearchUsersQuery,
  useSendFriendRequestMutation,
} from "@/features/friends/friendsApi";
import { toast } from "@/hooks/use-toast";
import UserCard from "../UserCard";

interface Props {
  searchValue: string;
}

const AllUsersTab = ({ searchValue }: Props) => {
  const [sendFriendRequest] = useSendFriendRequestMutation();

  const { data: users, isLoading } = useSearchUsersQuery({
    searchTerm: searchValue,
  });

  const handleSendRequest = async (toUserId: string) => {
    try {
      await sendFriendRequest({ toUserId });
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
  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <ul>
      {users?.users.map((user) => (
        <UserCard
          user={user}
          action={{
            handleClick: () => handleSendRequest(user._id),
            title: "Add friend",
          }}
        />
      ))}
    </ul>
  );
};

export default AllUsersTab;
