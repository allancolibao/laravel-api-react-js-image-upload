import React, { Component } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { amber } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import { withSnackbar } from 'notistack';


class EditModal extends Component {

  constructor(props) {
    super(props);
    this.state ={ 
      id:'',
      title: '',
      description: ''
    }
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }


  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.img[0] !== prevState.id) {
      return {
        id: nextProps.img[0],
        title: nextProps.img[1],
        description: nextProps.img[2]
        };
    }
    return null;
  }

  componentDidUpdate(nextProps, prevState) {
    if (nextProps.img[0] !== prevState.id) {
      this.setState ({
        id: nextProps.img[0],
        title: nextProps.img[1],
        description: nextProps.img[2]
      });
    }
  }


  onFormSubmit(e){
    e.preventDefault() 
    this.updateContent(this.state.title , this.state.description);
  }


  handleChange(event) {
    const target = event.target;
    const value = target.type === "text" ? target.value : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  updateContent(image){
    const url = '/api/edit/' +this.props.img[0];
    const formData = {
        title: this.state.title,
        description: this.state.description, 
        
    }
    event.preventDefault();
    event.target.reset();

    return  axios.post(url, formData)
            .then(response => {
              this.props.fileUpdate();
              this.props.close();
              this.props.enqueueSnackbar('Successfully updated!', { variant: 'success' });
            }).catch(error =>{
              console.log(error);
              this.props.enqueueSnackbar('Something went wrong!', { variant: 'error' });
            });
  }
   
render() {

    const useStyles = {
        modal: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding:'1rem'
        },
        paper: {
          backgroundColor: '#fff',
          border: 'none',
          boxShadow: '#00000063',
          padding: '1rem',
          outline: 'none'
        },
        img:{
            width:'99%',
        }
      };
        
    const { open, close } = this.props;
    const { title, description } = this.state;

    const ColorButton = withStyles(theme => ({
      root: {
        color: theme.palette.getContrastText(amber[500]),
        backgroundColor: amber[500],
        '&:hover': {
          backgroundColor: amber[700],
        },
      },

    }))(Button);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        style={useStyles.modal}
        open={open}
        onClose={close}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div style={useStyles.paper}>
                <Container maxWidth='md'>
                    <Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom>
                        Edit Content
                    </Typography>
                    <form onSubmit={this.onFormSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField 
                                    id="title" 
                                    name="title" 
                                    label="Title" 
                                    variant="outlined" 
                                    required
                                    fullWidth
                                    value={title}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField 
                                    id="description" 
                                    name="description" 
                                    label="Description" 
                                    variant="outlined" 
                                    required
                                    fullWidth
                                    value={description}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <ColorButton 
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                >
                                   Update
                                </ColorButton>
                            </Grid>
                        </Grid>
                    </form>
                </Container>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
  
}


export default withSnackbar(EditModal);