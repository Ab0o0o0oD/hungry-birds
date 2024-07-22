import { useAuth } from "@/AuthContext";
import { Button } from "@mui/material";


const Dashboard = () => {
    const { logout } = useAuth()
    return (
        <div>
            <h1>Dashboard admin</h1>
            <Button variant="contained" size="medium" onClick={logout}>
                Logout
            </Button>
        </div>
    )
}


export default Dashboard;