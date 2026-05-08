import RoomDashboard from "./components/RoomDashboard";

export const dynamic = "force-static";

export default function Page() {
  return <RoomDashboard initialStatus={null} initialError="" />;
}
