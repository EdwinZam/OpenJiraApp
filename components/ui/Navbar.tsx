import { useContext } from 'react'
import {AppBar, Toolbar, IconButton, Typography, Link} from '@mui/material';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { UIContext } from '../../context/ui';
import NextLink from 'next/link';



export const Navbar = () => {

  const {openSideMenu} = useContext(UIContext)


  return (
    <AppBar position='sticky'>
        <Toolbar>
            <IconButton
                size='large'
                edge="start"
                onClick={openSideMenu}
            >
                <MenuOutlinedIcon />
            </IconButton>
            <NextLink href="/" passHref legacyBehavior>
              <Link underline='none' color="white">
                <Typography variant='h5'>OpenJira</Typography>
              </Link>
            </NextLink>
        </Toolbar>

    </AppBar>
  )
}
