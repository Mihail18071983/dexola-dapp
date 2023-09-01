import axios from "axios";

export const instance = axios.create({
  baseURL: "https://64e712f9b0fd9648b78f4ec8.mockapi.io",
});

export interface IData {
  name: string;
  avatar: string;
  level: string;
  totalGames: number;
  gamesWon: number;
  price: number;
  id: string;
}


export const getAll = async () => {
  try {
    const { data } = await instance.get<IData[]>("/nfts");
    return data;
  } catch (err) {
    console.log(err);
  }
};
