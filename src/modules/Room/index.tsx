import MainLayout from "@/layouts/MainLayout";
import RoomDetails from "@/components/RoomDetails";
import RoomManager from "@/components/RoomManager";

const RoomPage = () => {
  return (
    <MainLayout>
      <div className="max-w-md mx-auto mt-10">
        <RoomManager />
        <RoomDetails />
      </div>
    </MainLayout>
  );
};

export default RoomPage;
