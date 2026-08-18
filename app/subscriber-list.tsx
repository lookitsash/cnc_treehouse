"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Snackbar from "@mui/material/Snackbar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutlined";
import { removeSubscriber } from "./actions";
import type { Subscriber } from "./lib/newsletter";

const joinedFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

const headCellSx = {
  py: 1.5,
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: "0.04em",
  textTransform: "uppercase" as const,
  color: "text.secondary",
  bgcolor: "#FBFCFB",
};

export default function SubscriberList({
  subscribers,
  justAdded,
}: {
  subscribers: Subscriber[];
  justAdded: boolean;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [target, setTarget] = useState<Subscriber | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(
    justAdded ? "Subscriber added." : null
  );

  useEffect(() => {
    if (justAdded) router.replace("/", { scroll: false });
  }, [justAdded, router]);

  function handleConfirm() {
    if (!target) return;

    const subscriber = target;
    setTarget(null);
    setError(null);

    startTransition(async () => {
      try {
        await removeSubscriber(subscriber.id);
        setToast(`${subscriber.name} was removed.`);
      } catch {
        setError("Could not remove the subscriber. Please try again.");
      }
    });
  }

  return (
    <>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Paper
        variant="outlined"
        sx={{ overflow: "hidden", opacity: isPending ? 0.6 : 1 }}
      >
        {subscribers.length === 0 ? (
          <Box sx={{ px: 3, py: { xs: 6, sm: 8 }, textAlign: "center" }}>
            <MailOutlineIcon sx={{ fontSize: 40, color: "text.disabled" }} />
            <Typography variant="subtitle1" sx={{ mt: 1.5 }}>
              No subscribers yet
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 0.5 }}>
              Add your first newsletter subscriber.
            </Typography>
            <Button
              href="/add"
              variant="contained"
              startIcon={<AddIcon />}
              sx={{ mt: 3 }}
            >
              Add subscriber
            </Button>
          </Box>
        ) : (
          <TableContainer>
            <Table sx={{ minWidth: 600 }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={headCellSx}>Name</TableCell>
                  <TableCell sx={headCellSx}>Email</TableCell>
                  <TableCell sx={headCellSx}>Joined</TableCell>
                  <TableCell sx={{ ...headCellSx, width: 88 }} align="right">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody
                sx={{ "& tr:last-of-type td": { borderBottom: "none" } }}
              >
                {subscribers.map((subscriber) => (
                  <TableRow
                    key={subscriber.id}
                    sx={{ "&:hover": { bgcolor: "#FAFBFA" } }}
                  >
                    <TableCell sx={{ py: 1.75, fontWeight: 500 }}>
                      {subscriber.name}
                    </TableCell>
                    <TableCell sx={{ py: 1.75, color: "text.secondary" }}>
                      {subscriber.email}
                    </TableCell>
                    <TableCell
                      sx={{
                        py: 1.75,
                        color: "text.secondary",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {joinedFormatter.format(new Date(subscriber.created_on))}
                    </TableCell>
                    <TableCell align="right" sx={{ py: 1.25 }}>
                      <IconButton
                        aria-label={`Delete ${subscriber.name}`}
                        disabled={isPending}
                        onClick={() => setTarget(subscriber)}
                        sx={{
                          p: 1.5,
                          color: "text.secondary",
                          "&:hover": { color: "error.main" },
                        }}
                      >
                        <DeleteOutlineIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      <Dialog
        open={target !== null}
        onClose={() => setTarget(null)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Remove subscriber?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove {target?.name} from the newsletter?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={() => setTarget(null)}
            sx={{ color: "text.secondary" }}
          >
            Cancel
          </Button>
          <Button onClick={handleConfirm} variant="contained" color="error">
            Remove
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={toast !== null}
        onClose={() => setToast(null)}
        autoHideDuration={4000}
        message={toast}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </>
  );
}
