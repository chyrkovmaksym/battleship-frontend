import { Button } from "@/components/ui/button";
import { User } from "@/features/friends/friendsApi";

interface Props {
  user: User;
  actions?: {
    title: string;
    handleClick: () => void;
  }[];
  status?: "pending" | "accepted" | "rejected";
}

const UserCard = ({ user, actions, status }: Props) => {
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
      <div className="flex items-center space-x-2">
        {!!status && (
          <span
            className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
              status === "pending"
                ? "bg-yellow-400 text-black"
                : status === "accepted"
                ? "bg-green-400 text-black"
                : status === "rejected"
                ? "bg-red-400 text-black"
                : ""
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        )}
        {!!actions?.length &&
          actions.map((action) => (
            <Button
              key={action.title}
              variant="link"
              onClick={action.handleClick}
            >
              {action.title}
            </Button>
          ))}
      </div>
    </li>
  );
};

export default UserCard;
