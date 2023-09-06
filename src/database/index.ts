import PocketBase from "pocketbase";
import { POCKETBASE_URL } from "../constants";

const pocketbase = new PocketBase(POCKETBASE_URL);

export default pocketbase;
