"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Snackbar } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useTheme } from "@emotion/react";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";
import axios from "@/utility/axiosConfig";
import { AuthContext } from "@/context/AuthContext";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://ankitdas98.com/">
        FireBird
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignIn() {
  const router = useRouter();
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const { setAuthState } = React.useContext(AuthContext);
  const mutation = useMutation((user) => axios.post("/user/login", user));
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = {
        email: data.get("email"),
        password: data.get("password"),
        appType: 'reddit'
      };
  
      mutation.mutate(user, {
        onSuccess: (data) => {
          setSnackbarMessage('User logged in successfully');
          setSnackbarOpen(true);
          setAuthState({
            token: data.data.token,
            data: data.data.data
        });
          router.push("/");
        },
        onError: (error) => {
          console.error(error);
          setSnackbarMessage(error.response.data.message);
          setSnackbarOpen(true);
          // handle error here
        }
      });
  };
  const handleClick = () => {
    router.push("/");
  };
  const handleClick2 = () => {
    router.push("/register");
  };

  const theme = useTheme();

  return (
    <Grid container component="main" sx={{ height: "calc(100vh - 64px)" }}>
      <CssBaseline />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        message={snackbarMessage}
        onClose={() => setSnackbarOpen(false)}
      />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
          backgroundRepeat: "no-repeat",
          backgroundColor: theme.palette.background.default,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
            cursor: "pointer",
          }}
          onClick={() => handleClick()}
        >
          <Typography
            variant="h2"
            sx={{
              color: "white",
              fontWeight: "bold",
              display: {
                xs: "none",
                sm: "block",
              },
            }}
          >
            Home
          </Typography>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        sx={{
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[800]
              : t.palette.grey[900],
        }}
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{
            color: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[800]
                : 'white',
          }}>
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              sx={{
                '& label.Mui-focused': {
                  color: 'white', // change the color of the label when focused
                },
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: 'white', // change the border color when focused
                  },
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              sx={{
                '& label.Mui-focused': {
                  color: 'white', // change the color of the label when focused
                },
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: 'white', // change the border color when focused
                  },
                },
              }}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="#" variant="body2" onClick={() => handleClick2()} sx={{
                  color: (t) =>
                    t.palette.mode === "light"
                      ? t.palette.grey[800]
                      : 'white',
                
                }}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
