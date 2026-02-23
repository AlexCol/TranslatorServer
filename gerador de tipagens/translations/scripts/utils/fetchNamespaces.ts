import { BASE_LANGUAGE, BASE_URL, ENV, SYSTEM } from "./../constants";
import axios from "axios";

export async function fetchNamespaces(): Promise<string[]> {
  const {
    data: { data },
  } = await axios.get<{ data: string[] }>(`${BASE_URL}/namespaces/${SYSTEM}/${ENV}/${BASE_LANGUAGE}`);
  return data;
}
