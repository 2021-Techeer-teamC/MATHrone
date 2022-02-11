import * as React from "react";
import PropTypes from "prop-types";
import { Toolbar, Box, AppBar, Grid, Container } from "@mui/material/";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LinkM from "@mui/material/Link";
import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { grey, teal } from '@mui/material/colors';
import "../Assets/styles/components.css"

const RegisterButton = styled(Button)(({ theme }) => ({
  width: '90px',
  borderRadius: '100px',
  color: theme.palette.getContrastText(grey[50]),
  backgroundColor: '#BCDCC4',
  '&:hover': {
    backgroundColor: teal[500],
  },
}));

const LoginButton = styled(Button)(({ theme }) => ({
  width: '70px',
  borderRadius: '100px',
  color: theme.palette.getContrastText(grey[900]),
  backgroundColor: '#315C72',
  '&:hover': {
    backgroundColor: teal[500],
  },
}));

function Header(props) {
  const { title } = props;

  return (
      <Box style={{ width: '100%' }} sx={{ flexGrow: 1 }}>
        <div style={{ width: '100%', backgroundColor: 'none', border: 'none' }} className="header">
          <div className="headerTitle">
            <Link to="/../" style={{ textDecoration: 'none', color: '#151515' }}>
              {title}<span style={{ color: '#BCDCC4' }}><strong>.</strong></span>
            </Link>
          </div>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: 'flex' } }}>
            <Grid container spacing={1}>
              <Grid item xs={6} md={7}>
                <Link to="/../SignUp" style={{ textDecoration: 'none' }}>
                  <RegisterButton>회원가입</RegisterButton>
                </Link>

              </Grid>
              <Grid item xs={6} md={5}>
                <Link to="/../SignIn" style={{ textDecoration: 'none' }}>
                  <LoginButton>로그인</LoginButton>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </div>
      </Box>
  );
}

Header.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;


