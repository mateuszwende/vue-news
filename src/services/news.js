import axios from "axios";
import { categories } from "../constants";

const url = "https://content.guardianapis.com/search";

export const fetchNews = async (params) => {
  const res = await axios.get(url, {
    params: { "api-key": "test", ...params }
  });

  const { response } = res.data;

  return response.results;
};

export const fetchNewsByCategory = async (category) =>
  await fetchNews({ section: category || categories.join("|") });
