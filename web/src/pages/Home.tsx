import { Grid } from "@mui/material";
import { Navigate } from "react-router-dom";
import ArtistList from "../components/ArtistList";
import NewArtist from "../components/NewArtist";

const Home = () => {

    if (!localStorage.getItem('access_token')) {
        Navigate({ to: '/login' });
    }

    return <Grid container>
        <Grid item xs={6} sx={{ padding: 1}}>
            <h2>Lista de artistas</h2>
            <ArtistList />
        </Grid>
        <Grid item xs={6} sx={{ padding: 1}}>
            <h2>Nuevo artista</h2>
            <NewArtist />
        </Grid>
    </Grid>
}

export default Home;