import { useParams } from "react-router-dom";
import Artist from "../models/Artist";
import ArtistsService from "../services/ArtistsService";
import { useEffect, useState } from "react";
import { Divider, Grid, Typography } from "@mui/material";
import SongList from "../components/SongList";
import NewSong from "../components/NewSong";

const ArtistDetail = () => {
  const [artist, setArtist] = useState<Artist | null>(null);

  const params = useParams();

  const fetchData = async () => {
    try {
      const response = await new ArtistsService().getById(params.artistId!);
      setArtist(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {artist && (
        <>
          <Typography variant="h2">{artist?.name}</Typography>
          <Divider sx={{ margin: "40px 0" }}></Divider>
          <Typography variant="body1">{artist?.bio}</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <SongList songs={artist.songs}/>
            </Grid>
            <Grid item xs={12} md={6}>
              <NewSong artistId={artist.id}/>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default ArtistDetail;
