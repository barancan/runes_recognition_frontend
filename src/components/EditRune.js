import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

function EditRune() {
  const [linkedUrl, setLinkedUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchRune = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/runes/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setLinkedUrl(response.data.linked_url);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch rune details. Please try again.");
        setLoading(false);
      }
    };
    fetchRune();
  }, [id, user.token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await axios.put(
        `http://localhost:8000/runes/${id}`,
        { linked_url: linkedUrl },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      navigate("/runes");
    } catch (error) {
      setError("Failed to update rune. Please try again.");
    }
  };

  if (loading) return <CircularProgress />;

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
        Edit Rune
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mt: 2, width: "100%" }}>
          {error}
        </Alert>
      )}
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="linkedUrl"
          label="Linked URL"
          name="linkedUrl"
          autoFocus
          value={linkedUrl}
          onChange={(e) => setLinkedUrl(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Update Rune
        </Button>
      </Box>
    </Box>
  );
}

export default EditRune;
