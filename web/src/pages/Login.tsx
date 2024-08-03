import {
  Button,
  FormControl,
  FormLabel,
  Stack,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import UserService from "../services/UsersServices";
import { useNavigate } from "react-router-dom";

interface LoginFormData {
  email: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit } = useForm<LoginFormData>();
  const navigate = useNavigate();
  const onSubmit = async (dataForm: LoginFormData) => {
    try {
      const { data } = await new UserService().login(dataForm);
      if (data.token) {
        localStorage.setItem("access_token", data.token);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      window.alert("Credenciales incorrectas");
    }
  };

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <FormControl sx={{ marginBotton: "1rem" }}>
            <FormLabel htmlFor="email">Correo</FormLabel>
            <TextField
              margin="dense"
              id="email"
              placeholder="correo"
              fullWidth
              size="small"
              {...register("email")}
            ></TextField>
          </FormControl>
          <FormControl sx={{ marginBotton: "1rem" }}>
            <FormLabel htmlFor="password">Contraseña</FormLabel>
            <TextField
              margin="dense"
              id="password"
              placeholder="contraseña"
              type="password"
              fullWidth
              size="small"
              {...register("password")}
            ></TextField>
          </FormControl>
        </Stack>
        <Button type="submit" variant="contained">
          Iniciar sesión
        </Button>
        <Button variant="contained" onClick={() => navigate("/register")}>
          Registrarse aquí
        </Button>
      </form>
    </>
  );
};

export default Login;
