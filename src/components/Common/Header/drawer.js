import { useState }from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

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
                <Link to='/'>
                    <p className='link'>Home</p>
                </Link>
                <Link to='/watchlist'>
                    <p className='link'>Watchlist</p>  
                </Link>
                <Link to='/compare'>
                    <p className='link'>Compare</p>
                </Link>
                <Link to='/dashboard'>
                    <p className='link'>Dashboard</p>
                </Link>
            </div>
        </SwipeableDrawer>
    </div>
  );
}
