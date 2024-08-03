export default interface Song {
    id: number;
    name: string;
    album: string;
    releaseDate: Date;
    genero: string;
    converImg: string;
    s3Id: string;
    s3Url: string;
    createdAt: string;
    updatedAt: string;
    artistId: number;
}