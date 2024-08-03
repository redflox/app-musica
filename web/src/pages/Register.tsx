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

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

const Register = () => {
  const { register, handleSubmit } = useForm<RegisterFormData>();
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await new UserService().register(data);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <FormControl sx={{ marginBottom: "1rem" }}>
            <FormLabel htmlFor="name">Nombre</FormLabel>
            <TextField
              margin="dense"
              id="name"
              placeholder="nombre"
              fullWidth
              size="small"
              {...register("name")}
            ></TextField>
          </FormControl>
          <FormControl sx={{ marginBottom: "1rem" }}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              margin="dense"
              id="email"
              placeholder="email"
              fullWidth
              size="small"
              {...register("email")}
            ></TextField>
          </FormControl>
          <FormControl sx={{ marginBottom: "1rem" }}>
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
        <Button variant="contained" type="submit">
          Registrarse
        </Button>
      </form>
    </>
  );
};

export default Register;
