import { createContext, ReactNode, useContext, useState } from "react";



const AuthContext = createContext({
    isAuthenticated: false,
    login: () => { },
    logout: () => { }
})

export const useAuth = () => useContext(AuthContext)

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    // TODO Create auth for admin
    const login = () => setIsAuthenticated(true)
    const logout = () => setIsAuthenticated(false)


    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider