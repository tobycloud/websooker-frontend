import PocketBase from "pocketbase";

const POCKETBASE_URL = import.meta.env.VITE_POCKETBASE_URL;
console.log(POCKETBASE_URL);
const pocketbase = new PocketBase(POCKETBASE_URL);

export default pocketbase;
