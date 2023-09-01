import PocketBase from "pocketbase";

const POCKETBASE_URL =
  import.meta.env.POCKETBASE_URL || "https://whs-pocketbase.tobycm.systems";

const pocketbase = new PocketBase(POCKETBASE_URL);

export default pocketbase;
