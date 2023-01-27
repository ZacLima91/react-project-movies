import axios, { AxiosInstance } from "axios";
import swal from "sweetalert";
import { IAxios, Login, Movie } from "./types";

axios.defaults.baseURL = "https://api-movies-g3b3tyk6o-zaclima91.vercel.app";
axios.defaults.headers.post["Content-Type"] = "application/json";

const defaultUrl = "https://api-movies-g3b3tyk6o-zaclima91.vercel.app";

const instance: AxiosInstance & IAxios = axios.create()

instance.interceptors.request.use(
  (config)=>{
    const token = localStorage.getItem('token')
    if(token){
      config.headers.Authorization = `Bearer ${token}`
    }
    return config;
  },
  (error)=>{
    return Promise.reject(error)
  }
)

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

  login: async ({email, password}: Login)=>{
    try{
      const response = await axios.post("/login", {email, password})
      console.log(response.data)
      localStorage.setItem('token', response.data.token)
      localStorage.setItem("user", JSON.stringify(response.data.user))

      return response.data
    }catch(err){
      console.log(err)
    }
  }
};
