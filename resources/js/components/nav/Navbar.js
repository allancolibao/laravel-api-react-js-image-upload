import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import amber from '@material-ui/core/colors/amber';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import PublishIcon from '@material-ui/icons/Publish';

class Navbar extends Component {
  
  render() {

    const useStyles = {
      root: {
        flexGrow: 1,
      },
      AppColor: {
        backgroundColor: amber['600'],
      },
      title: {
        flexGrow: 1,
        display: 'block',
      },
      upload: {
        position: 'relative',
        borderRadius: '5px',
      },
      button:{
        '&:focus': { 
          outline: 'none',
        }
      }
    };
    
    const AvatarColor = withStyles(theme => ({
      root: {
        color: amber[100],
        backgroundColor: amber[900],
        '&:hover': {
          backgroundColor: amber[800],
        }
      },
    }))(Avatar);

    const classes = useStyles;

    const { showForm } = this.props;

    return (
      <div style={classes.root}>
        <AppBar position="static" style={classes.AppColor}>
          <Container>
          <Toolbar>
            <Typography style={classes.title} variant="h6" noWrap>
              Manage your photos
            </Typography>
            <div style={classes.upload}>
              <Button 
                style={classes.button} 
                onClick={showForm}
              >
                  <AvatarColor >
                    <PublishIcon />
                  </AvatarColor>
                </Button>
            </div>
          </Toolbar>
          </Container>
        </AppBar>
      </div>
    );
  }
  
}

export default  Navbar;
