interface IMovieListing {
  Title: string;
  Year: string;
  Poster: string;
  imdbID: string;
  Type: string;
}

export interface ISearchResponse {
  Search: IMovieListing[];
  totalResults: string;
  Response: string;
}
