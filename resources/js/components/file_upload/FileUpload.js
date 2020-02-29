import React, { Component } from 'react';
import axios from 'axios';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Album from '../album/Album';
import { withStyles } from '@material-ui/core/styles';
import { amber } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import PublishIcon from '@material-ui/icons/Publish';
import { withSnackbar } from 'notistack';

class FileUploadComponent extends Component
{
    constructor(props) {
        super(props);
        this.state ={ 
            title: '',
            description: '',
            image: '',
            images:[],
            show: false
        }
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.fileUpload = this.fileUpload.bind(this)
        this.fileUpdate = this.fileUpdate.bind(this)
      }

      componentDidMount(){
        axios.get('api/images')
        .then(response => { 
            this.setState({ images : response.data });
        }).catch(error =>{
            console.log(error);
        });

      }

      onFormSubmit(e){
        e.preventDefault() 
        this.fileUpload(this.state.image);
      }

      onChange(e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
              return;
        this.createImage(files[0]);
      }

      handleChange(event) {
        const target = event.target;
        const value = target.type === "text" ? target.value : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
      }

      createImage(file) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.setState({
            image: e.target.result
          })
        };
        reader.readAsDataURL(file);
      }

      fileUpdate(e) {
        axios.get('api/images')
        .then(response => { 
            this.setState({ images : response.data });
        }).catch(error =>{
            console.log(error);
        });
      }

      fileUpload(image){
        const url = '/api/fileupload';
        const formData = {
            title: this.state.title, 
            description: this.state.description, 
            file: this.state.image,
        }
        event.preventDefault();
        event.target.reset();
        this.setState({
            title: '',
            description: '',
            image: ''
        });

        return  axios.post(url, formData)
                .then(response => {
                  axios.get('api/images')
                  .then(response => { 
                    this.setState({ images : response.data });
                    this.props.enqueueSnackbar('Successfully uploaded', { variant: 'success' });
                  }).catch(error =>{
                    console.log(error);
                    this.props.enqueueSnackbar('Something went wrong!', { variant: 'error' });
                  });
          });

      }
    render()
    {
      const { images, show } = this.state;

      const ColorButton = withStyles(theme => ({
        root: {
          color: theme.palette.getContrastText(amber[500]),
          backgroundColor: amber[500],
          '&:hover': {
            backgroundColor: amber[700],
          },
        },

      }))(Button);

      const AvatarColor = withStyles(theme => ({
        root: {
          color: amber[50],
          backgroundColor: amber[800],
          '&:hover': {
            backgroundColor: amber[300],
          },
        },
      }))(Avatar);

      return(
        <Grid container spacing={4}>
          <Grid item xs={12}>
           <Container maxWidth="md">
              <Button onClick={() => this.setState({ show: !show })}>
                <AvatarColor >
                  <PublishIcon />
                </AvatarColor>
              </Button>
            </Container>
          </Grid>
          <Grid item xs={12}>
            <Container maxWidth="xs">
                <CssBaseline />
                { show ?
                <div id="fileUpload">
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                        File Upload
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
                                    value={this.state.title}
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
                                    value={this.state.description}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField 
                                    type="file" 
                                    variant="outlined"  
                                    required
                                    fullWidth
                                    onChange={this.onChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <ColorButton 
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                >
                                    Upload
                                </ColorButton>
                            </Grid>
                        </Grid>
                    </form>
                </div> 
                : null }
            </Container>
          </Grid>
          <Grid item xs={12} >
            <Album 
            fileUpdate={this.fileUpdate}
            images={images} 
            />
          </Grid>
        </Grid>
      )
   }
}


export default withSnackbar(FileUploadComponent);