const baseUrl =
  import.meta.env.VITE_BASE_WHS_URL || "https://whs.tobycm.systems";

export interface APIWebSookData {
  id: {
    webhook: string;
    websocket: string;
  };
  owner: string;
}

export class WebSook {
  public id: {
    webhook: string;
    websocket: string;
  };
  public readonly owner: string;

  constructor(raw: APIWebSookData) {
    this.id = raw.id;
    this.owner = raw.owner;
  }

  public get webhook(): string {
    return `${baseUrl}/api/${this.id.webhook}`;
  }

  public get websocket(): string {
    return `${baseUrl}/ws/${this.id.websocket}`;
  }
}
