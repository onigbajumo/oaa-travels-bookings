import ProtectedRoute from "../../components/ProtectedRoute";
import Header from "./component/header";
import Sidebar from "./component/sidebar";

export const metadata = {
  title: "Management Portal",
};

export default function RootLayout({ children }) {
  return (
    <ProtectedRoute requiredRoles={["superadmin"]}>
      <div className="flex">
        <Sidebar />
        <div className="w-full">
        <Header />
          <div className="p-5">{children}</div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
