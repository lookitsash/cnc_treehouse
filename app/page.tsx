import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import AddIcon from "@mui/icons-material/Add";
import { getSubscribers, type Subscriber } from "./lib/newsletter";
import SubscriberList from "./subscriber-list";

export default async function SubscribersPage(props: PageProps<"/">) {
  const { added } = await props.searchParams;

  let subscribers: Subscriber[];

  try {
    subscribers = await getSubscribers();
  } catch {
    return <Alert severity="error">Could not load the subscriber list.</Alert>;
  }

  return (
    <>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{
          mb: 3,
          justifyContent: "space-between",
          alignItems: { xs: "stretch", sm: "flex-start" },
        }}
      >
        <Box>
          <Typography variant="h4" component="h1">
            Newsletter subscribers
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 0.5 }}>
            View and manage everyone currently subscribed to your list.
          </Typography>
        </Box>
        <Button
          href="/add"
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ flexShrink: 0, alignSelf: { xs: "flex-start", sm: "auto" } }}
        >
          Add subscriber
        </Button>
      </Stack>

      <SubscriberList subscribers={subscribers} justAdded={added === "1"} />
    </>
  );
}
