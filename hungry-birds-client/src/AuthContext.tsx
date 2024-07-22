import Cookies from 'js-cookie';
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingDots from "./components/loading/LoadingDots";

type User = {
    email: string,
    password?: string
}

const AuthContext = createContext({
    isAuthenticated: false,
    user: {},
    login: ({ email = "", password = "" }: User) => { },
    logout: () => { }
})



const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User>({ email: "", password: "" });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
    useEffect(() => {
        // TODO fix save the session of login user. 
        // Replace user with token

        const savedUser = Cookies.get('auth.session-token');
        // TODO check the valide token
        if (savedUser) {
            setUser(JSON.parse(savedUser));
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, [isAuthenticated]);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard')
        }
    }, [isAuthenticated, navigate]);

    if (loading) {
        return <LoadingDots />;
    }
    // TODO Create auth for admin
    const login = ({ email, password }: User) => {
        console.log("email", email, password)
        if (email === "user@email.com" && password === "pass") {
            const userData: User = { email };
            setUser(userData);
            setIsAuthenticated(true);
            // TODO Save the token on cookie with expire date. 
            Cookies.set("auth.session-token", JSON.stringify(userData), { expires: 1 })

        } else {
            // TODO handle not auth. 
            alert("Invalid email or password")
        }
    }
    const logout = () => {
        setIsAuthenticated(false);
        Cookies.remove('auth.session-token');
        setUser({ email: "", password: "" });
        navigate('/login'); // Redirect to login
    };


    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider

export const useAuth = () => useContext(AuthContext)