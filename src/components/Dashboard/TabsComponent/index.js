import React, { useState } from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { ThemeProvider, createTheme } from '@mui/material';
import './styles.css';
import Grid from '../Grid';
import List from '../List';

export default function TabsComponent({coins}) {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const style = {
    color: "var(--white)",
    width: "50vw",
    fontSize: "1.2rem",
    fontWeight: 600,
    fontFamily: "Inter",
    textTransform: "capitalize"
  };

  const theme = createTheme({
    palette: {
        primary: {
            main: "#3a80e9"
        },
    },
  });

  return (
    <div>
        <ThemeProvider theme={theme}>
            <TabContext value={value}>
                <TabList onChange={handleChange} variant="fullWidth">
                    <Tab
                    label="Grid" 
                    value="grid"
                    sx={style}/>
                    <Tab
                    label="List" 
                    value="list"
                    sx={style}/>
                </TabList>
            <TabPanel value="grid">
                <div className='grid-flex'>
                    {coins.map((coin, i)=>{
                        return (
                            <Grid coin={coin} key={i}></Grid>
                        );
                    })}
                </div>
            </TabPanel>
            <TabPanel value="list">
                <table className='list-table'>
                    {coins.map((coin, i)=>{
                        return (
                          <div>
                            <List coin={coin} key={i}></List>
                          </div>  
                        );
                    })}
                </table>
            </TabPanel>
            </TabContext>
      </ThemeProvider>
    </div>
  );
} 