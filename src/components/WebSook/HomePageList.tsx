import { List, ListItem, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";
import { BASE_WEBSOOKER_URL } from "../../constants";
import pocketbase from "../../database";
import Websook from "../../database/websook";

async function updateWebsooksList(setWebsooks: (websooks: Websook[]) => void) {
  const websooks = await pocketbase.collection("websooks").getList(1, 50, {
    sort: "-created",
  });

  setWebsooks(
    websooks.items.map((item) => {
      return {
        id: {
          websook: item.websookId,
          websocket: item.websocketId,
        },
        owner: item.owner,
      };
    })
  );
}

export default function WebSookList() {
  const [websooks, setWebsooks] = useState<Websook[]>([]);

  useEffect(() => {
    updateWebsooksList(setWebsooks);

    pocketbase
      .collection("websooks")
      .subscribe("*", () => updateWebsooksList(setWebsooks));
  }, []);

  return (
    <List sx={{ maxHeight: "100%", overflow: "auto" }}>
      {websooks.map((websook) => (
        <ListItem key={websook.id.websook}>
          <ListItemText
            primary={`${BASE_WEBSOOKER_URL}/wh/${websook.id.websook}`}
            secondary={`${BASE_WEBSOOKER_URL}/ws/${websook.id.websocket}`}
          />
        </ListItem>
      ))}
    </List>
  );
}
