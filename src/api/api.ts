import pocketbase from "../database";
import { APIWebSookData, WebSook } from "./models";

class API {
  private baseUrl: string;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private addAuth(headers: Headers): void {
    headers.append("Authorization", pocketbase.authStore.token);
  }

  public async getWebsook(path: string): Promise<WebSook> {
    const headers = new Headers();
    this.addAuth(headers);
    const response: APIWebSookData = await (
      await fetch(`${this.baseUrl}/api/${path}`, { method: "GET", headers })
    ).json();

    return new WebSook(response);
  }

  public async newWebsook(path: string = ""): Promise<WebSook> {
    const headers = new Headers();
    this.addAuth(headers);
    const response: APIWebSookData = await (
      await fetch(`${this.baseUrl}/api/${path}`, {
        method: "POST",
        headers,
        body: JSON.stringify({ path }),
      })
    ).json();

    return new WebSook(response);
  }

  public async updateWebsook(websook: WebSook): Promise<WebSook> {
    const headers = new Headers();
    this.addAuth(headers);
    const response: APIWebSookData = await (
      await fetch(`${this.baseUrl}/api/${websook.id.webhook}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify(websook),
      })
    ).json();

    return new WebSook(response);
  }

  public async deleteWebsook(websook: WebSook): Promise<void> {
    const headers = new Headers();
    this.addAuth(headers);
    await fetch(`${this.baseUrl}/api/${websook.id.webhook}`, {
      method: "DELETE",
      headers,
    });
  }
}

const api = new API(
  import.meta.env.VITE_BASE_WHS_URL || "https://whs.tobycm.systems"
);

export default api;
