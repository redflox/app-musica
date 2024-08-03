import { Button, FormControl, FormLabel, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import ArtistsService from "../services/ArtistsService";
import { usePub } from "../hooks/pubSubHook";

interface ArtistFormData {
  name: string;
  genero: string;
  bio: string;
  coverImg: string;
}

const NewArtist = () => {
  const { register, handleSubmit, reset } = useForm<ArtistFormData>();
  const publish = usePub();

  const onSubmit = async (dataNewArtist: ArtistFormData) => {
    try {
      const response = await new ArtistsService().create(dataNewArtist);
      console.log(response);
      publish("artist_created", dataNewArtist);
      reset();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <h2>New Artist</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <FormControl sx={{ marginButton: "10px" }}>
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
            <FormLabel htmlFor="genero">Gender</FormLabel>
            <TextField
              margin="dense"
              id="genero"
              placeholder="gender"
              fullWidth
              size="small"
              {...register("genero")}
            ></TextField>
          </FormControl>
          <FormControl sx={{ marginButton: "10px" }}>
            <FormLabel htmlFor="bio">Description</FormLabel>
            <TextField
              margin="dense"
              id="bio"
              placeholder="Description"
              fullWidth
              size="small"
              {...register("bio")}
            ></TextField>
          </FormControl>
          <FormControl sx={{ marginButton: "10px" }}>
            <FormLabel htmlFor="coverImg">Cover Image</FormLabel>
            <TextField
              margin="dense"
              id="coverImg"
              placeholder="cover image"
              fullWidth
              size="small"
              {...register("coverImg")}
            ></TextField>
          </FormControl>
        </Stack>
        <Button variant="contained" type="submit">
          Create
        </Button>
      </form>
    </>
  );
};

export default NewArtist;
