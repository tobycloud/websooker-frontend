const baseUrl =
  import.meta.env.VITE_BASE_WHS_URL || "https://whs.tobycm.systems";

export class WebSook {
  private path: {
    webhook: string;
    websocket: string;
  };

  constructor(path: { webhook: string; websocket: string }) {
    this.path = path;
  }

  public get webhook(): string {
    return `${baseUrl}/api/${this.path.webhook}`;
  }

  public get websocket(): string {
    return `${baseUrl}/ws/${this.path.websocket}`;
  }
}
