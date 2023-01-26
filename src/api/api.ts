import axios from "axios";
import swal from "sweetalert";
import { Movie } from "./types";

axios.defaults.baseURL = "https://api-movies-g3b3tyk6o-zaclima91.vercel.app";
axios.defaults.headers.post["Content-Type"] = "application/json";

const defaultUrl = "https://api-movies-g3b3tyk6o-zaclima91.vercel.app";

function handleError(text: string, description: string) {
  swal({
    title: text,
    text: description,
    icon: "warming",
    timer: 5000,
  });
}

export const category = {
  movie: "movie",
  tv: "tv",
};

export const api = {
  getMovies: async (): Promise<Movie[] | undefined> => {
    try {
      const response = await axios.get(`${defaultUrl}/movies`);
      return response.data;
    } catch (err: any) {
      handleError("Erro no servidor!", "Erro no servidor, tente novamente!");
    }
  },

  getMovieId: async (id: string | undefined): Promise<Movie | undefined> => {
    try {
      const response = await axios.get(`${defaultUrl}/movies/${id}`);
      return response.data;
    } catch (err: any) {
      handleError("Erro no servidor!", "Erro no servidor, tente novamente!");
    }
  },
};
