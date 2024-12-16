import MainLayout from "@/layouts/MainLayout";
import RoomDetails from "@/modules/Room/components/RoomDetails";
import RoomManager from "@/modules/Room/components/RoomManager";

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
