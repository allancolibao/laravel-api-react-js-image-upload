import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import { amber } from '@material-ui/core/colors';
import ShowModal from './ShowModal';
import EditModal from './EditModal';
import { SnackbarProvider } from 'notistack';


class Album extends Component {
    constructor() {
        super();
        this.state ={ 
            open: false,
            setOpen: false,
            editOpen: false,
            editSetOpen: false,
            img: []
        }
        this.handleOpen = this.handleOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleEditOpen = this.handleEditOpen.bind(this)
        this.handleEditClose = this.handleEditClose.bind(this)
      }

    handleOpen(image) {
        this.setState({ 
            open : true, 
            setOpen : true, 
            img: image
        });
      };
    
    handleClose(e) {
        this.setState({ 
            open : false, 
            setOpen : false
        });
      };

    handleEditOpen(image) {
        this.setState({ 
            editOpen : true, 
            editSetOpen : true, 
            img: image
        });
      };
    
    handleEditClose(e) {
        this.setState({ 
            editOpen : false, 
            editSetOpen : false
        });
      };


render (){

    const { images } = this.props;

    const cardStyle = {
        card: {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
        },
        cardMedia: {
            paddingTop: '56.25%',
        }
      };

    const ViewButton = withStyles(theme => ({
        root: {
          color: theme.palette.getContrastText(amber[500]),
          backgroundColor: amber[500],
          '&:hover': {
            backgroundColor: amber[700],
          },
        },
      }))(Button);

    const EditButton = withStyles(theme => ({
        root: {
          color: theme.palette.getContrastText(amber[500]),
          '&:hover': {
            backgroundColor: amber[300],
          },
        },
      }))(Button);

    return (
        <React.Fragment>
            <CssBaseline />
            <main>
                <div >
                <Container maxWidth="sm">
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    Album 
                    </Typography>
                    <Typography variant="h5" align="center" color="textSecondary" paragraph>
                    See all the uploaded photos
                    </Typography>
                </Container>
                </div>
                <Container  maxWidth="md">
                    <Grid container spacing={4}>
                        {images.map(image => (
                        <Grid item key={image.id} xs={12} sm={6} md={4}>
                            <Card  style={cardStyle.card}>
                            <CardMedia style={cardStyle.cardMedia}
                                image={'/uploads/images/' + image.file_name}
                                title={image.title}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                {image.title}
                                </Typography>
                                <Typography>
                                {image.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <ViewButton 
                                    size="small"  
                                    onClick={ () => this.handleOpen([
                                        image.id, 
                                        image.title, 
                                        image.description, 
                                        image.file_name
                                        ])}
                                >
                                    View
                                </ViewButton>
                                <EditButton 
                                    size="small" 
                                    variant="outlined" 
                                    onClick={ () => this.handleEditOpen([
                                        image.id, 
                                        image.title, 
                                        image.description, 
                                        image.file_name
                                        ])}
                                >
                                    Edit
                                </EditButton>
                            </CardActions>
                            </Card>
                        </Grid>
                        ))}
                    </Grid>
                </Container>

                <ShowModal 
                    img={this.state.img} 
                    close={this.handleClose} 
                    open={this.state.open} 
                />
                <SnackbarProvider 
                    maxSnack={3} 
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}>
                <EditModal 
                    fileUpdate={this.props.fileUpdate}
                    images={images}
                    img={this.state.img} 
                    close={this.handleEditClose} 
                    open={this.state.editOpen} 
                />
                </SnackbarProvider>
            </main>
        </React.Fragment>
        );
    }
}


export default Album;
