import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const Header = ({title, goBack, signOut}) => {
  const navigate = useNavigate();
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white px-4 py-3 flex items-start justify-between z-50">
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-start gap-1">
          <img
              src="/src/assets/permar-logo.png"
              alt="Permar Almacenaje"
              className="h-7 w-auto"
            />
          {goBack && (
            <button
              onClick={() => navigate(-1)}
              className="cursor-pointer p-1 hover:bg-gray-100 rounded"
            >
              <ArrowLeft size={20} className="text-black" />
            </button>
          )}
        </div>
      </div>

      <p className="font-roboto font-semibold text-xl text-center text-navy-900 absolute left-1/2 transform -translate-x-1/2">
        {title}
      </p>
      <button
        onClick={() => setOpenLogoutModal(true)}
        className="cursor-pointer p-1  bg-white hover:bg-gray-100">
        <LogoutIcon size={20} className="text-black" />
      </button>

      <Dialog
        open={openLogoutModal}
        onClose={() => setOpenLogoutModal(false)}
        aria-labelledby="logout-dialog-title"
      >
        <DialogTitle id="logout-dialog-title">
          Confirmar cierre de sesión
        </DialogTitle>
        <DialogContent>
          ¿Estás seguro de que deseas cerrar sesión?
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenLogoutModal(false)}
            color="primary"
            variant="contained"
          >
            Cancelar
          </Button>
          <Button
            onClick={() => {
              setOpenLogoutModal(false);
              signOut();
            }}
            color="primary"
            variant="outlined"
          >
            Cerrar sesión
          </Button>
        </DialogActions>
      </Dialog>
    </header>
  );
};

export default Header;