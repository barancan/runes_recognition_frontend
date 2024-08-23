import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  Button,
  CircularProgress,
  Pagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

function RuneList() {
  const [runes, setRunes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [runeToDelete, setRuneToDelete] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  const fetchRunes = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `http://localhost:8000/runes/?skip=${(page - 1) * 10}&limit=10`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      setRunes(response.data);
      setTotalPages(Math.ceil(response.headers["x-total-count"] / 10));
    } catch (error) {
      setError("Failed to fetch runes. Please try again.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRunes();
  }, [page, user.token]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/runes/${runeToDelete}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setDeleteDialogOpen(false);
      fetchRunes();
    } catch (error) {
      setError("Failed to delete rune. Please try again.");
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5">
        Your Runes
      </Typography>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {runes.map((rune) => (
          <ListItem key={rune.id}>
            <ListItemText
              primary={`Rune ${rune.id}`}
              secondary={`Linked URL: ${rune.linked_url}`}
            />
            <Button onClick={() => navigate(`/edit-rune/${rune.id}`)}>
              Edit
            </Button>
            <Button
              onClick={() => {
                setRuneToDelete(rune.id);
                setDeleteDialogOpen(true);
              }}
              color="error"
            >
              Delete
            </Button>
          </ListItem>
        ))}
      </List>
      <Pagination
        count={totalPages}
        page={page}
        onChange={(event, value) => setPage(value)}
        sx={{ mt: 2, mb: 2 }}
      />
      <Button
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={() => navigate("/create-rune")}
      >
        Create New Rune
      </Button>
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this rune?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default RuneList;
