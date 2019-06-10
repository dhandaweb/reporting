import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

import SendIcon from '@material-ui/icons/Send';
import GroupIcon from '@material-ui/icons/Group';
import AttachMoney from '@material-ui/icons/AttachMoney';
import Mood from '@material-ui/icons/Mood';


export default class IconCard extends React.Component {
 
 
constructor(props) {
    super(props);
    // this.state = {
    //     chartContainer:null
    //   };
  this.getIcon = this.getIcon.bind(this);
      this.chartId =  'Table' + Math.floor(Math.random() * 1000000000);
      this.chartContainer = null;

      
     

    }


componentDidMount() {
   
    window.addEventListener("resize", this.drawChart);
}

getIcon() {
  switch (this.props.data.icon) {
    case "send":
      return <SendIcon color={this.props.data.color} fontSize="large"/>;
    case "group":
        return <GroupIcon color={this.props.data.color} fontSize="large"/>;
    case "money":
        return <AttachMoney color={this.props.data.color} fontSize="large"/>;
    case "mood":
          return <Mood color={this.props.data.color} fontSize="large"/>;        
    default:
      return <SendIcon color={this.props.data.color} fontSize="large"/>;
  }
}

render() {
   
    return (
      <div id={this.chartId} className="iconCard">
        <Table>
          <TableBody>
              <TableRow>
                <TableCell>
                {this.getIcon()}
                </TableCell>
                <TableCell>
                  {/* <h3>{this.props.title}</h3> */}
                  <h2>{this.props.data.value}</h2>
                </TableCell>
              </TableRow>
          </TableBody>
          </Table>
      </div>
    );
  }
};