import pocketbase from ".";

export default async function oauth2(provider: string) {
  try {
    await pocketbase.collection("users").authWithOAuth2({ provider });
  } catch (e) {
    console.error(e);
  }
}
