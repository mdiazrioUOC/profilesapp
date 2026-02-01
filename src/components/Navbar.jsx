import { Fab, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { useNavigate } from "react-router-dom";

const Navbar = ({ navLink }) => {
    const navigate = useNavigate();

    return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg flex justify-around items-center py-3 px-4 border-t border-gray-200">
        <Button className="flex flex-col items-center text-gray-800" onClick={()=>navigate("/")}>
          <HomeOutlinedIcon sx={{ fontSize: 32 }} />
        </Button>
        {navLink ? 
        <div className="relative">
          <Fab
            color="primary"
            aria-label="add"
            onClick={() => {
                if (!navLink) return;
                typeof navLink === "string"
                  ? navigate(navLink)
                  : navigate(navLink.pathname, { state: navLink.state });
            }}
            sx={{
              bgcolor: '#000080',
              '&:hover': { bgcolor: '#000066' }
            }}
          >
            <AddIcon sx={{ fontSize: 32 }} />
          </Fab>
        </div> : <div/>
        }
        <Button className="flex flex-col items-center text-gray-800" onClick={()=>navigate("/settings")}>
          <SettingsOutlinedIcon sx={{ fontSize: 32 }} />
        </Button>
      </div>
    );
}

export default Navbar;