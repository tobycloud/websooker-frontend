import { List, ListItem, ListItemText } from "@mui/material";
import { useState } from "react";
import Websook from "../../database/websook";

export default function WebSookList() {
  const [websooks, setWebsooks] = useState<Websook[]>([
    {
      id: {
        websook: "nvb9q837trf3n28h",
        websocket: "93nex72n8e9bqtfy7chdeb78c8rq8y8734hnov1f",
      },
      owner: "tobycm",
    },
    {
      id: {
        websook: "nvb9q837trf3n28h",
        websocket: "93nex72n8e9bqtfy7chdeb78c8rq8y8734hnov1f",
      },
      owner: "tobycm",
    },
    {
      id: {
        websook: "nvb9q837trf3n28h",
        websocket: "93nex72n8e9bqtfy7chdeb78c8rq8y8734hnov1f",
      },
      owner: "tobycm",
    },
  ]);

  return (
    <List>
      {websooks.map((websook) => (
        <ListItem>
          <ListItemText
            primary={`${import.meta.env.VITE_BASE_WEBSOOKER_URL}/wh/${
              websook.id.websook
            }`}
            secondary={`${import.meta.env.VITE_BASE_WEBSOOKER_URL}/ws/${
              websook.id.websocket
            }`}
          />
        </ListItem>
      ))}
    </List>
  );
}
