import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';

import MenuItem from '@material-ui/core/MenuItem';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';

import Personal from './Personal';
import Hiring from './Hiring';
import Financial from './Financial';
import Jobcycle from './Jobcycle';
import Office from './Office';

export default class Details extends React.Component {
 
  constructor(props) {
    super(props);

   
    this.state = {
      selectedDate: new Date('2014-08-18T21:11:54'),
      expanded: 'personal',
      gender:"male",
      title:null,
      city:"city1", 
      state:"state1",
      country:"country1",
    };
  }
 
 
  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };
 
  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };
 
 




  render() {


    return (

<div>
<ExpansionPanel expanded={this.state.expanded === 'personal'} onChange={this.handleChange('personal')}>
    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
      <Typography >Personal Data</Typography>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails>
      <Personal/>
    </ExpansionPanelDetails>
</ExpansionPanel>







<ExpansionPanel expanded={this.state.expanded === 'client'} onChange={this.handleChange('client')}>
<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
  <Typography >Client</Typography>
</ExpansionPanelSummary>
<ExpansionPanelDetails>
      <Hiring/>
</ExpansionPanelDetails>
</ExpansionPanel>

<ExpansionPanel expanded={this.state.expanded === 'Financial'} onChange={this.handleChange('Financial')}>
<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
  <Typography >Financial</Typography>
</ExpansionPanelSummary>
<ExpansionPanelDetails>
  <Financial/>
</ExpansionPanelDetails>
</ExpansionPanel>

<ExpansionPanel expanded={this.state.expanded === 'Jobcycle'} onChange={this.handleChange('Jobcycle')}>
<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
  <Typography >Jobcycle</Typography>
</ExpansionPanelSummary>
<ExpansionPanelDetails>
  <Jobcycle/>
</ExpansionPanelDetails>
</ExpansionPanel>






<ExpansionPanel expanded={this.state.expanded === 'Office'} onChange={this.handleChange('Office')}>
<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
  <Typography >Office</Typography>
</ExpansionPanelSummary>
<ExpansionPanelDetails>
 <Office/>
</ExpansionPanelDetails>
</ExpansionPanel>




</div> );
  }
};