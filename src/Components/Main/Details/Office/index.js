import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';

import MenuItem from '@material-ui/core/MenuItem';

import Grid from '@material-ui/core/Grid';

export default class Office extends React.Component {
 
  constructor(props) {
    super(props);
   
    this.state = {
      selectedDate: new Date('2014-08-18T21:11:54'),
      expanded: 'panel1',
      gender:"male",
      title:null,
      city:"city1", 
      state:"state1",
      country:"country1",
    };
  }



  render() {

  

    return (<div>
     
</div> );
  }
};

