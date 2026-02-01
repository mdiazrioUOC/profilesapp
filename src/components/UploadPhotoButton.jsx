import React, { useRef, useState, useEffect } from "react";
import { styled } from '@mui/material/styles';

import {
  Button,
  ImageList,
  ImageListItem,
  IconButton,
  CircularProgress
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import ClearIcon from '@mui/icons-material/Clear';
import { uploadData, getUrl, remove } from 'aws-amplify/storage';
import {useLocation, useNavigate } from 'react-router-dom';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function UploadMultiplePhotos({ setPhotos, uploadedPhotos = [] }) {
  const inputRef = useRef(null);
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const { state } = useLocation();

  // Cargar fotos existentes cuando el componente se monta
  useEffect(() => {
    const loadExistingPhotos = async () => {
      if (uploadedPhotos.length === 0) return;

      try {
        const photosWithUrls = await Promise.all(
          uploadedPhotos.map(async (key) => {
            const urlResult = await getUrl({
              path: key,
              options: {
                expiresIn: 3600 // 1 hora
              }
            });
            return {
              key: key,
              url: urlResult.url.toString(),
            };
          })
        );
        setImages(photosWithUrls);
      } catch (error) {
        console.error('Error al cargar fotos existentes:', error);
      }
    };

    loadExistingPhotos();
  }, [uploadedPhotos]);

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleChange = async (event) => {
    const files = Array.from(event.target.files);
    console.log(files)
    if (files.length === 0) return;

    setUploading(true);

    try {
      const uploadPromises = files.map(async (file) => {
        // Generar un nombre único para el archivo
        const timestamp = Date.now();
        const fileName = `${state.inspection.id}/${timestamp}-${file.name}`;
        const key = `incident-photos/${fileName}`;

        // Subir a S3
        await uploadData({
          path: key,
          data: file,
          options: {
            contentType: file.type,
          }
        }).result;

        // Obtener URL para preview
        const urlResult = await getUrl({
          path: key,
          options: {
            expiresIn: 3600 // 1 hora
          }
        });

        return {
          key: key,
          url: urlResult.url.toString(),
          file: file,
        };
      });

      const uploadedFiles = await Promise.all(uploadPromises);
      const newImages = [...images, ...uploadedFiles]

      // Actualizar estado local
      setImages(newImages);

      // Notificar al componente padre con las keys de S3
      if (setPhotos) {
        const photoKeys = newImages.map(f => f.key);
        setPhotos(null, photoKeys);
      }

    } catch (error) {
      console.error('Error al subir fotos:', error);
    } finally {
      setUploading(false);
      // Permite volver a subir la misma imagen
      event.target.value = null;
    }
  };

  const handleDelete = async (index) => {
    const image = images[index];

    try {
      // Eliminar de S3
      await remove({ path: image.key });

      const newImages = images.filter((_, i) => i !== index) 

      // Actualizar estado local
      setImages(newImages);

      // Notificar al componente padre
      if (setPhotos) {
        const photoKeys = newImages.map(f => f.key);
        setPhotos(null, newImages); // true indica que es una eliminación
      }

    } catch (error) {
      console.error('Error al eliminar foto:', error);
      alert('Error al eliminar la foto. Por favor, intenta de nuevo.');
    }
  };

  return (
    <div>
      <Button
        component="label"
        variant="outlined"
        startIcon={uploading ? <CircularProgress size={20} /> : <PhotoCameraIcon />}
        loading = {uploading}
        loadingPosition="end"
      >
        {uploading ? 'Subiendo...' : 'Subir fotos'}
         <VisuallyHiddenInput
          type="file"
          onChange={(event) => handleChange(event)}
          multiple
        />
      </Button>

      {images.length > 0 && (
        <ImageList cols={3} gap={8}  sx={{ mt: 2}} rowHeight={128}>
          {images.map((img, index) => (
            <ImageListItem
              key={index}
              sx={{ position: "relative" }}
            >
              <img
                src={img.url}
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
      )}
    </div>
  );
}
