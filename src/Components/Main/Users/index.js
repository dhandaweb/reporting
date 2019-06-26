import React from 'react';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import env from '../../../environment.json';

export default class Users extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userlist: []
    };

    axios({
      method: 'post',
      url: env.endPointUrl + 'getuserList',
      data: {
        GroupId: localStorage.getItem('UserGroup'),
      }
    })
      .then(response => {
        this.setState({ userlist: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  render() {
    return (<Grid container spacing={24} className="mainContent">
      <div className="subHeading">
        <AccountCircle className="dashboard" />
        <Typography className="title" variant="subtitle1" noWrap> User list</Typography>
      </div>
     { this.state.userlist.length > 0 &&
      <Paper style={{ margin: 10, width: "100%" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>User Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.userlist.map((row, i) => {
              return <TableRow key={i}>
                <TableCell >{row.FirstName} {row.LastName}</TableCell>
                <TableCell >{row.role}</TableCell>
                <TableCell>{row.UserName}</TableCell>
              </TableRow>
            })}
          </TableBody>
        </Table>
      </Paper>
     }</Grid>
    );
  }
};
