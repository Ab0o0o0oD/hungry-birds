
import { useAuth } from '@/AuthContext';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Avatar, Box, Button, FormControl, FormHelperText, IconButton, Input, InputAdornment, InputLabel } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.scss';

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = React.useState(false);
    const [error, setError] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = event.target.value;
        setEmail(value);
        setError(!event.target.validity.valid);
    }
    const handleLogin = () => {
        login({ email, password })
        if (localStorage.getItem('user')) {
            navigate('/dashboard');
        }
    }
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <div className={styles.loginWrapper}>
            <div className={styles.loginContainer}>
                <div className={styles.loginHeader}>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <h2>Logg inn</h2>
                </div>
                <Box>
                    <FormControl fullWidth sx={{ marginBottom: "3rem" }} variant="outlined">
                        <InputLabel htmlFor="email" sx={{ fontSize: 18, fontWeight: 'bold', bottom: "10px", transform: "translate(0, -5.5px) scale(0.75)" }}>
                            Email
                        </InputLabel>
                        <Input
                            id="email"
                            type="text"
                            sx={{ height: "2.5em", fontSize: "1.8rem" }}
                            value={email}
                            inputProps={{ pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$' }}
                            onChange={handleChange}
                            error={error}
                            aria-describedby="email-helper-text"
                        />
                        <FormHelperText sx={{ fontSize: "1.3rem", marginLeft: "0", color: "#d32f2f" }}>
                            {error ? 'Skriv riktig e-post' : ''}
                        </FormHelperText>
                    </FormControl>
                    <FormControl fullWidth variant="outlined" >
                        <InputLabel htmlFor="password" sx={{ fontSize: 18, fontWeight: 'bold', bottom: "10px", transform: "translate(0, -5.5px) scale(0.75)" }} className={styles.loginLabel}>
                            Password
                        </InputLabel>
                        <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            sx={{ height: "2.5em", fontSize: "1.8rem" }}
                            onChange={(e) => setPassword(e.target.value)}
                            // inputProps={{ pattern: '^[^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$' }}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? <VisibilityOff color='action' sx={{ height: "2em", width: "2em" }} /> : <Visibility color='secondary' sx={{ height: "2em", width: "2em" }} />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </Box>
                <Box className={styles.loginBtn}>
                    <Button
                        type="submit"
                        size="large"
                        onClick={handleLogin}
                        variant="contained"
                        sx={{ mt: 3, mb: 2, backgroundColor: "#9c27b0", fontSize: "1.6rem", textTransform: "capitalize" }}
                    >
                        Logg inn
                    </Button>
                </Box>
            </div>
        </div>
    )
}



export default Login;