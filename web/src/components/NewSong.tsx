import {
  Button,
  FormControl,
  FormLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import SongsService from "../services/SongsService";

interface SongFormData {
  name: string;
  album: string;
  genero: string;
  releaseDate: Date;
  coverImg: string;
  song: string;
}

const NewSong = ({artistId} : {artistId: number}) => {
  const { register, handleSubmit, reset } = useForm<SongFormData>();

  const onSubmit = async (data: SongFormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("album", data.album);
    formData.append("genero", data.genero);
    formData.append("releaseDate", data.releaseDate.toString());
    formData.append("coverImg", data.coverImg);
    formData.append("song", data.song[0]);
    formData.append("artistId", artistId.toString());
    try {
        const response = await new SongsService().create(formData);
        console.log(response);
        reset();
    }catch(error){
        console.error(error);
    }
  };

  return (
    <>
      <Typography variant="h3">New Song</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <FormControl sx={{ marginBottom: "10px" }}>
            <FormLabel htmlFor="name">Name</FormLabel>
            <TextField
              margin="dense"
              id="name"
              placeholder="name"
              fullWidth
              size="small"
              {...register("name")}
            ></TextField>
          </FormControl>
          <FormControl sx={{ marginBottom: "10px" }}>
            <FormLabel htmlFor="album">Album</FormLabel>
            <TextField
              margin="dense"
              id="album"
              placeholder="Album"
              fullWidth
              size="small"
              {...register("album")}
            ></TextField>
          </FormControl>
          <FormControl sx={{ marginBottom: "10px" }}>
            <FormLabel htmlFor="gender">Gender</FormLabel>
            <TextField
              margin="dense"
              id="gender"
              placeholder="Gender"
              fullWidth
              size="small"
              {...register("genero")}
            ></TextField>
          </FormControl>
          <FormControl sx={{ marginBottom: "10px" }}>
            <FormLabel htmlFor="coverImg">url cover</FormLabel>
            <TextField
              margin="dense"
              id="coverImg"
              placeholder="Cover image"
              fullWidth
              size="small"
              {...register("coverImg")}
            ></TextField>
          </FormControl>
          <FormControl sx={{ marginBottom: "10px" }}>
            <FormLabel htmlFor="relaseDate">Release date</FormLabel>
            <TextField
              margin="dense"
              id="relaseDate"
              type="date"
              fullWidth
              size="small"
              {...register("releaseDate")}
            ></TextField>
          </FormControl>
          <FormControl sx={{ marginBottom: "10px" }}>
            <FormLabel htmlFor="song">Song</FormLabel>
            <TextField
              type="file"
              margin="dense"
              id="song"
              fullWidth
              size="small"
              {...register("song")}
            ></TextField>
          </FormControl>
        </Stack>
        <Button variant="contained" type="submit">
          Upload
        </Button>
      </form>
    </>
  );
};

export default NewSong;
