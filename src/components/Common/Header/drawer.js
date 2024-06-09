import { useState }from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';

export default function SwipeableTemporaryDrawer() {
  const [open, setOpen] = useState(false); 

  return (
    <div>
        <IconButton onClick={() => setOpen(true)}>
            <MenuIcon className='link'></MenuIcon>
        </IconButton>
        <SwipeableDrawer
            anchor={"right"}
            open={open}
            onClose={() => setOpen(false)}
        >
            <div className='drawer-div'>
                <a href=''>
                    <p className='link'>Home</p>
                </a>
                <a href=''>
                    <p className='link'>Watchlist</p>  
                </a>
                <a href=''>
                    <p className='link'>Compare</p>
                </a>
                <a href=''>
                    <p className='link'>Dashboard</p>
                </a>
            </div>
        </SwipeableDrawer>
    </div>
  );
}
