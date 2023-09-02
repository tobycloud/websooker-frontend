import pocketbase from "../database";
import { WebSook } from "./models";

class API {
  private baseUrl: string;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public async getWebsook(path: string): Promise<WebSook> {
    const data = await (
      await fetch(`${this.baseUrl}/api/${path}`, {
        method: "GET",
        headers: {
          "X-API-Key": pocketbase.authStore.token,
        },
      })
    ).json();

    return new WebSook(data);
  }

  public async newWebsook(path: string = ""): Promise<WebSook> {
    const data = await (
      await fetch(`${this.baseUrl}/api/${path}`, {
        method: "POST",
        headers: {
          "X-API-Key": pocketbase.authStore.token,
        },
        body: JSON.stringify({
          path,
        }),
      })
    ).json();

    return new WebSook(data);
  }

  public async updateWebsook(websook: WebSook): Promise<WebSook> {
    const data = await (
      await fetch(websook.webhook, {
        method: "PATCH",
        headers: {
          "X-API-Key": pocketbase.authStore.token,
        },
        body: JSON.stringify(websook),
      })
    ).json();

    return new WebSook(data);
  }

  public async deleteWebsook(websook: WebSook): Promise<void> {
    await fetch(websook.webhook, {
      method: "DELETE",
      headers: {
        "X-API-Key": pocketbase.authStore.token,
      },
    });
  }
}

const api = new API(
  import.meta.env.VITE_BASE_WHS_URL || "https://whs.tobycm.systems"
);

export default api;
