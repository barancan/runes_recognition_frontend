import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateRune() {
  const [linkedUrl, setLinkedUrl] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("linked_url", linkedUrl);
    formData.append("file", file);

    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:8000/runes/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/runes");
    } catch (error) {
      console.error("Failed to create rune:", error);
      // Handle error (e.g., show error message to user)
    }
  };

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
        Create New Rune
      </Typography>
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
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="raised-button-file"
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <label htmlFor="raised-button-file">
          <Button variant="contained" component="span" sx={{ mt: 2, mb: 2 }}>
            Upload Rune Image
          </Button>
        </label>
        {file && <Typography variant="body2">{file.name}</Typography>}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Create Rune
        </Button>
      </Box>
    </Box>
  );
}

export default CreateRune;
