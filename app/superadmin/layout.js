import ProtectedRoute from "../../components/ProtectedRoute";
import Header from "./components/header";
import Sidebar from "./components/sidebar";

export const metadata = {
  title: "Management Portal",
};



export default function RootLayout({ children }) {
  return (
    <ProtectedRoute requiredRoles={["superadmin"]}>
      <div className="flex max-w-[1920px] mx-auto">
        <Sidebar />
        <div className="w-full">
        <Header />
          <div className="p-5">{children}</div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
