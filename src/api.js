import axios from "axios";

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3/"
    , params: {
        api_key: "39a55128d46ad2cb9a99830763fbec2d",
        language: "en-US"
    }
});

api.get("tv/popular");

export default api;