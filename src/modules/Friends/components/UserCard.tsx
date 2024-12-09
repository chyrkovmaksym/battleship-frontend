import { Button } from "@/components/ui/button";
import { User } from "@/features/friends/friendsApi";

interface Props {
  user: User;
  action: {
    title: string;
    handleClick: () => void;
  };
}

const UserCard = ({ user, action }: Props) => {
  return (
    <li
      key={user._id}
      className="border-b border-zinc-200 py-2 flex justify-between"
    >
      <div>
        <p className="font-semibold">
          {user.firstName} {user.lastName}
        </p>
        <p className="text-sm text-zinc-600">{user.email}</p>
      </div>
      <Button variant="link" onClick={action.handleClick}>
        {action.title}
      </Button>
    </li>
  );
};

export default UserCard;
