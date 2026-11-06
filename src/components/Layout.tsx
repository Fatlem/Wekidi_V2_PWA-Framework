import { Outlet } from "react-router-dom";
import BottomNav from "./BottomNav";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
