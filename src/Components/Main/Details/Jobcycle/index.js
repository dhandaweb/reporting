import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';

import MenuItem from '@material-ui/core/MenuItem';

import Grid from '@material-ui/core/Grid';

export default class Jobcycle extends React.Component {
 
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

    const titleList = [
      {
        value: 'Mr.',
        label: 'Mr.',
      },
      {
        value: 'Mrs.',
        label: 'Mrs.',
      },
      {
        value: 'Dr.',
        label: 'Dr.',
      }
    ];

    const genders = [
      {
        value: 'male',
        label: 'Male',
      },
      {
        value: 'female',
        label: 'Female',
      }
    ];

    const cities = [
      {
        value: 'city1',
        label: 'City1',
      },
      {
        value: 'city2',
        label: 'City2',
      }
    ];

    const state = [
      {
        value: 'state1',
        label: 'state1',
      },
      {
        value: 'state2',
        label: 'state3',
      }
    ];
    const country = [
      {
        value: 'country1',
        label: 'country1',
      },
      {
        value: 'country2',
        label: 'country2',
      }
    ];

    return (<div>
</div> );
  }
};

