import React, { useRef, useState } from "react";
import {
  Button,
  ImageList,
  ImageListItem,
  IconButton,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import ClearIcon from '@mui/icons-material/Clear';

export default function UploadMultiplePhotos() {
  const inputRef = useRef(null);
  const [images, setImages] = useState([]);

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleChange = (event) => {
    const files = Array.from(event.target.files);

    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages]);

    // Permite volver a subir la misma imagen
    event.target.value = null;
  };

  const handleDelete = (index) => {
    setImages((prev) => {
      URL.revokeObjectURL(prev[index].preview); // libera memoria
      return prev.filter((_, i) => i !== index);
    });
  };

  return (
    <div>
      <Button
        variant="outlined"
        startIcon={<PhotoCameraIcon />}
        onClick={handleClick}
      >
        Subir fotos
      </Button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        multiple
        hidden
        onChange={handleChange}
      />

      <ImageList cols={3} gap={8}>
        {images.map((img, index) => (
          <ImageListItem
            key={index}
            sx={{ position: "relative" }}
          >
            <img
              src={img.preview}
              alt={`foto-${index}`}
              loading="lazy"
              style={{ borderRadius: 8 }}
            />

            <IconButton
              size="small"
              color="primary"
              onClick={() => handleDelete(index)}
              sx={{
                position: "absolute",
                top: 4,
                right: 4,
                backgroundColor: "rgba(255,255,255,0.8)",
              }}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}
