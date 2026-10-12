import type { Metadata } from "next";
import RoomPage from "@/components/RoomPage";
import { businessRoom, guestRoom } from "@/content/rooms";

export const metadata: Metadata = {
  title: "Guest Room",
  description: guestRoom.description[0],
};

export default function GuestRoomPage() {
  return <RoomPage room={guestRoom} other={businessRoom} />;
}
