import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Navbar from './nav/Navbar';
import FileUploadComponent from './file_upload/FileUpload';
import Footer from './footer/Footer';
import Container from '@material-ui/core/Container';
import { SnackbarProvider } from 'notistack';

class Main extends Component {

    constructor(props) {
        super(props);
        this.state ={ 
            show: false
        }
        this.showForm = this.showForm.bind(this)
      }

      showForm(event) {
        this.setState(prevState => ({
            show: !prevState.show
          }));
      }

    render() { 
        return ( 
            <React.Fragment>
                <Navbar showForm={this.showForm} />
                <Container  maxWidth="xl">
                    <SnackbarProvider 
                    maxSnack={3} 
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}>
                        <FileUploadComponent show={this.state.show} />
                    </SnackbarProvider>
                </Container>
                <Footer />
            </React.Fragment>
         );
    }
}
 
export default Main;

if (document.getElementById('app')) {
    ReactDOM.render(<Main />, document.getElementById('app'));
}
