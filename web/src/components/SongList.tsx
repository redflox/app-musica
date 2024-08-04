import { List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import Song from "../models/Song";
import { LibraryMusic } from "@mui/icons-material";
import ReactAudioPlayer from "react-audio-player";

type Props = { songs: Song[] };

const SongList = ({ songs }: Props) => {
    
    return <>
        <Typography variant="h3">Songs</Typography>
        <List>
            {songs.map((song) => (
                <ListItem key={song.id}>
                    <ListItemIcon>
                        <LibraryMusic />
                    </ListItemIcon>
                    <ListItemText primary={song.name} secondary={song.album} />
                    <ReactAudioPlayer src={song.s3Url} controls autoPlay={false} />
                </ListItem>
            ))}
        </List>
    </>;
};

export default SongList;
