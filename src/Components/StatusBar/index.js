import React from 'react';
import { connect } from "react-redux";
import {setSnackBar} from "../../Redux/Actions";

import Snackbar from '@material-ui/core/Snackbar';



export class StatusBar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    
    }

    this.handleErrorClose = this.handleErrorClose.bind(this);
  
  }

  handleErrorClose(){
   this.props.setSnackBar({message:"",show:false});
  }

  render() {

    return (
          <Snackbar
              message={this.props.snackBar.message}
              open={this.props.snackBar.show}
              anchorOrigin={{
                horizontal:'center',
                vertical:'top'
              }}
              autoHideDuration={3000}
              onClose={this.handleErrorClose}
              >
            </Snackbar>
    );
  }
};



const mapStateToProps = state => {
  return { snackBar: state.snackBar };
};

const mapDispatchToProps = dispatch => {
  return {
    setSnackBar: (obj)=> dispatch(setSnackBar(obj))
  };
};



export default connect(mapStateToProps, mapDispatchToProps)(StatusBar);