import {useAdmin} from "@/contexts/AdminContext.tsx";
import AdminDashboard from "@/components/admin/AdminDashboard.tsx";
import AdminLogin from "@/components/admin/AdminLogin.tsx";

const Admin = () => {
    const { user, loading } = useAdmin();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return user ? <AdminDashboard /> : <AdminLogin />;
};

export default Admin;