import axios, { AxiosHeaders } from "axios";
import swal from "sweetalert";
import { Login, Movie } from "./types";

axios.defaults.baseURL = "https://api-movies-alpha.vercel.app/";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

axios.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    if (config.headers)
      (config.headers as AxiosHeaders).set("Authorization", `Bearer ${token}`);
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  function (config) {
    return config;
  },
  function (error) {
    if (error.response.status === 401) {
      if (localStorage.getItem("token")) localStorage.removeItem("token");
    }
  }
);

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

function handleSuccess(text: string, description: string) {
  swal({
    title: text,
    text: description,
    icon: "success",
    timer: 5000,
  });
}

export const api = {

  createMovie: async (movie: Movie)=>{
    try{
      const response = await axios.post(`/movies`, movie)
      handleSuccess("Sucesso!", "Filme Criado.");
    }catch (err: any) {
      handleError("Erro no servidor!", "Erro no servidor, tente novamente!");
    }
  },

  getMovies: async (): Promise<Movie[] | undefined> => {
    try {
      const response = await axios.get(`/movies`);
      return response.data;
    } catch (err: any) {
      handleError("Erro no servidor!", "Erro no servidor, tente novamente!");
    }
  },

  getMovieId: async (id: string | undefined): Promise<Movie | undefined> => {
    try {
      const response = await axios.get(`/movies/${id}`);
      return response.data;
    } catch (err: any) {
      handleError("Erro no servidor!", "Erro no servidor, tente n ovamente!");
    }
  },

  editMovie: async (id: string,movie: Movie)=> {
    try {
      await axios.patch("/movies/" +id, movie);
      handleSuccess("Sucesso!", "Filme editado.");
    } catch (err: any) {
      handleError("Erro no servidor!", "Erro no servidor, tente novamente!");
    }
  },

  deleteMovie: async (id: string | undefined): Promise<boolean | any> => {
    try {
      await axios.delete("/movies/" + id);
      handleSuccess("Sucesso!", "Filme deletado.");
    } catch (err: any) {
      handleError("Erro ao deletar filme", err.message);
    }
  },

  login: async ({ email, password }: Login) => {
    try {
      const response = await axios.post("/login", { email, password });
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("user", response.data.user)
      console.log(response.data);

      return response.data;
    } catch (err) {
      handleError("Erro", "Senha ou email incorreto!");
    }
  },

  logout: async () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
    } catch (err) {
      handleError("Erro", "Aconteceu algun erro, tente novamente");
    }
  },
};
