import ProtectedRoute from "../../components/ProtectedRoute";

export const metadata = {
  title: "Management Portal",
};

export default function RootLayout({ children }) {
  return (
    <ProtectedRoute requiredRoles={["superadmin"]}>
        {children}
    </ProtectedRoute>
  );
}
