import React, { useEffect } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import {
  Typography,
  Divider,
  AppBar,
  Drawer,
  Toolbar,
  Container,
  ListItem,
  ListItemIcon,
  List,
  Alert,
  Snackbar
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SubjectOutlinedIcon from '@mui/icons-material/SubjectOutlined';
import SelectAllIcon from '@mui/icons-material/SelectAll';
import Categories from '../Categories';
import AddEditCategory from '../AddEditCategory';
import Subcategories from '../Subcategories';
import AddEditSubcategory from '../AddEditSubcategory';
import Products from '../Products';
import AddEditProduct from '../AddEditProduct';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { closeErrorMessage } from '../../../store/app/actions';
import useMediaQuery from "@mui/material/useMediaQuery";
import './index.sass';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const { isCreated, isDeleted, showError, errorMessage } = useSelector(
    ({ appReducer }) => appReducer
  );
  const isSmallerDevicesScreen = useMediaQuery('(max-width:576px)');
  
  useEffect(() => {
    if (isCreated || isDeleted) navigate(-1);
  }, [isCreated, isDeleted]);

  const closeMessage = () => dispatch(closeErrorMessage());

  return (
    <Container>
      <AppBar sx={{ zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ backgroundColor: theme.palette.background.darkBlue }}>
          <Link to="/admin/">
            <Typography variant="h5" color="white">
              Admin Dashboard
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" classes={{ paper: 'drawerPaper' }}>
        <List className="menuList">
          <Link to="/admin/categories">
            <ListItem button sx={{ py: 2 }}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <Typography variant="subtitle1" color="black">
                Категорії
              </Typography>
            </ListItem>
          </Link>
          <Link to="/admin/subcategories">
            <ListItem button sx={{ py: 2 }}>
              <ListItemIcon>
                <SubjectOutlinedIcon />
              </ListItemIcon>
              <Typography variant="subtitle1" color="black">
                Підкатегорії
              </Typography>
            </ListItem>
          </Link>
          <Link to="/admin/products">
            <ListItem button sx={{ py: 2 }}>
              <ListItemIcon>
                <SelectAllIcon />
              </ListItemIcon>
              <Typography variant="subtitle1" color="black">
                Одиниці товару
              </Typography>
            </ListItem>
          </Link>
        </List>
        {!isSmallerDevicesScreen && <Divider />}
        </Drawer>
      <div className="content">
        <Routes>
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/edit" element={<AddEditCategory />} />
          <Route path="/categories/add" element={<AddEditCategory />} />
          <Route path="/subcategories" element={<Subcategories />} />
          <Route path="/subcategories/edit" element={<AddEditSubcategory />} />
          <Route path="/subcategories/add" element={<AddEditSubcategory />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/edit" element={<AddEditProduct />} />
          <Route path="/products/add" element={<AddEditProduct />} />
        </Routes>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={showError}
          autoHideDuration={5000}
          onClose={closeMessage}
        >
          <Alert onClose={closeMessage} severity="error" sx={{ width: '100%' }}>
            {errorMessage}
          </Alert>
        </Snackbar>
      </div>
    </Container>
  );
};

export default Dashboard;
