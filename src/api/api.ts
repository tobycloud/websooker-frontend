import pocketbase from "../database";
import { Websook } from "./models";

class API {
  private baseUrl: string;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public async getWebsook(): Promise<Websook> {
    const data = (await (
      await fetch(`${this.baseUrl}`, {
        method: "GET",
        headers: {
          "X-API-Key": pocketbase.authStore.token,
        },
      })
    ).json()) as Websook;

    return data;
  }

  public async newWebsook(path: string = ""): Promise<Websook> {
    const data = (await (
      await fetch(`${this.baseUrl}${path}`, {
        method: "POST",
        headers: {
          "X-API-Key": pocketbase.authStore.token,
        },
        body: JSON.stringify({
          path,
        }),
      })
    ).json()) as Websook;

    return data;
  }

  public async updateWebsook(websook: Websook): Promise<Websook> {
    const data = (await (
      await fetch(`${this.baseUrl}${websook.path.webhook}`, {
        method: "PATCH",
        headers: {
          "X-API-Key": pocketbase.authStore.token,
        },
        body: JSON.stringify(websook),
      })
    ).json()) as Websook;

    return data;
  }

  public async deleteWebsook(websook: Websook): Promise<void> {
    await fetch(`${this.baseUrl}${websook.path.webhook}`, {
      method: "DELETE",
      headers: {
        "X-API-Key": pocketbase.authStore.token,
      },
    });
  }
}

const api = new API(
  import.meta.env.BACKEND_URL || "https://whs.tobycm.systems/api/"
);

export default api;
