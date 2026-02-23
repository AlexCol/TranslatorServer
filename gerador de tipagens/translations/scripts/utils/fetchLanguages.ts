import { BASE_URL, ENV, SYSTEM } from "./../constants";
import axios from "axios";

export async function fetchLanguages(): Promise<string[]> {
  const {
    data: { data },
  } = await axios.get<{ data: string[] }>(`${BASE_URL}/languages/${SYSTEM}/${ENV}`);
  console.log("Fetched languages:", data);
  return data;
}
