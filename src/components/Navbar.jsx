import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from "react-router-dom";


const Navbar = ({ navLink }) => {
    const navigate = useNavigate();
    console.log(navLink)
    return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg flex justify-around items-center py-3 px-4 border-t border-gray-200">
        <button className="flex flex-col items-center text-gray-600">
          <HomeIcon sx={{ fontSize: 32 }} />
        </button>
        {navLink ? 
        <div className="relative">
          <Fab 
            color="primary" 
            aria-label="add"
            onClick={() => navigate(navLink)}
            sx={{ 
              bgcolor: '#000080',
              '&:hover': { bgcolor: '#000066' }
            }}
          >
            <AddIcon sx={{ fontSize: 32 }} />
          </Fab>
        </div> : <div/>
        }
        <button className="flex flex-col items-center text-gray-600">
          <SettingsIcon sx={{ fontSize: 32 }} />
        </button>
      </div>
    );
}

export default Navbar;