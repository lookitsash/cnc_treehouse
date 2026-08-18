"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import MailOutlineIcon from "@mui/icons-material/MailOutlined";

const links = [
  { href: "/", label: "Subscribers" },
  { href: "/add", label: "Add subscriber" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <AppBar position="static" sx={{ bgcolor: "#1C2B24" }}>
      <Toolbar
        disableGutters
        sx={{
          width: "100%",
          maxWidth: 1040,
          mx: "auto",
          px: { xs: 2, sm: 3 },
          gap: 2,
          minHeight: { xs: 60, sm: 64 },
        }}
      >
        <Box
          component={Link}
          href="/"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            flexGrow: 1,
            minWidth: 0,
            color: "inherit",
            textDecoration: "none",
          }}
        >
          <MailOutlineIcon
            fontSize="small"
            sx={{ color: "rgba(255, 255, 255, 0.7)" }}
          />
          <Typography variant="h6" component="span" noWrap>
            Treehouse Newsletter
          </Typography>
        </Box>

        <Stack direction="row" spacing={0.5}>
          {links.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Button
                key={link.href}
                href={link.href}
                size="small"
                sx={{
                  px: 1.5,
                  color: isActive ? "#FFFFFF" : "rgba(255, 255, 255, 0.66)",
                  bgcolor: isActive ? "rgba(255, 255, 255, 0.1)" : "transparent",
                  "&:hover": {
                    color: "#FFFFFF",
                    bgcolor: "rgba(255, 255, 255, 0.08)",
                  },
                }}
              >
                {link.label}
              </Button>
            );
          })}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
