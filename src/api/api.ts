import pocketbase from "../database";
import { Websook } from "./models";

class API {
  private baseUrl: string;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public async getWebsook(path: string): Promise<Websook> {
    const data = (await (
      await fetch(`${this.baseUrl}/api/${path}`, {
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
      await fetch(`${this.baseUrl}/api/${path}`, {
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
      await fetch(`${this.baseUrl}/api/${websook.path.webhook}`, {
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
    await fetch(`${this.baseUrl}/api/${websook.path.webhook}`, {
      method: "DELETE",
      headers: {
        "X-API-Key": pocketbase.authStore.token,
      },
    });
  }
}

const api = new API(
  import.meta.env.BASE_WHS_URL || "https://whs.tobycm.systems"
);

export default api;
