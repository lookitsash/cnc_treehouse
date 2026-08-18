"use client";

import { useActionState } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { addSubscriber } from "../actions";

export default function AddSubscriberPage() {
  const [error, formAction, isPending] = useActionState(addSubscriber, null);

  return (
    <Box sx={{ maxWidth: 560, mx: "auto" }}>
      <Button
        href="/"
        size="small"
        startIcon={<ArrowBackIcon fontSize="small" />}
        sx={{ ml: -1, mb: 1.5, color: "text.secondary" }}
      >
        Subscribers
      </Button>

      <Typography variant="h4" component="h1">
        Add subscriber
      </Typography>
      <Typography color="text.secondary" sx={{ mt: 0.5, mb: 3 }}>
        Add a new person to the Treehouse newsletter.
      </Typography>

      <Paper variant="outlined" sx={{ p: { xs: 2.5, sm: 4 } }}>
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box component="form" action={formAction}>
          <Stack spacing={2.5}>
            <TextField
              name="name"
              label="Name"
              autoComplete="name"
              required
              fullWidth
            />
            <TextField
              name="email"
              label="Email"
              type="email"
              autoComplete="email"
              required
              fullWidth
            />
          </Stack>

          <Stack
            direction={{ xs: "column-reverse", sm: "row" }}
            spacing={1.5}
            sx={{ mt: 4, justifyContent: "flex-end" }}
          >
            <Button
              href="/"
              sx={{ color: "text.secondary" }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              startIcon={<AddIcon />}
              disabled={isPending}
            >
              {isPending ? "Adding…" : "Add subscriber"}
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}
