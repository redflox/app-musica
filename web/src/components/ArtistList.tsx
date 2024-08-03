import { useEffect, useState } from "react";
import ArtistsService from "../services/ArtistsService";
import Artist from "../models/Artist";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSub } from "../hooks/pubSubHook";

const ArtistList = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  useSub("artist_created", () => {
    fetchData();
  });

  const fetchData = async () => {
    try {
      const response = await new ArtistsService().getAll();
      setArtists(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h2>Artists</h2>
      {artists.map((artists: Artist) => (
        <Card sx={{ marginBottom: 2 }} key={artists.id}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {artists.name}
            </Typography>
            <Typography variant="body2">{artists.bio}</Typography>
          </CardContent>
          <CardActions>
            <Link to={`/artists/${artists.id}`}>
              <Button size="small">View more</Button>
            </Link>
          </CardActions>
        </Card>
      ))}
    </>
  );
};

export default ArtistList;
