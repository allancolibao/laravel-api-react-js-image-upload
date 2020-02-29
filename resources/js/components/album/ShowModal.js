import React, { Component } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Container from '@material-ui/core/Container';




class ShowModal extends Component {
   
render() {

    const useStyles = {
        modal: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        paper: {
          backgroundColor: 'transparent',
          border: 'none',
          boxShadow: '#00000063',
          padding: '0',
          outline: 'none'
        },
        img:{
            width:'99%',
        }
      };
        
    const { img, open, close } = this.props;

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
                    <img  
                        style={useStyles.img} 
                        src={'/uploads/images/' + img[3]}
                    >
                    </img>
                </Container>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
  
}


export default ShowModal;