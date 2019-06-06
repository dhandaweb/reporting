import React from 'react';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


export default class Users extends React.Component {
  
  constructor(props) {
    super(props);
      this.state = {
          userlist:[]
      };
    
      axios({
        method:'post',
        url:'http://localhost:8080/api/getuserList',
        data: {
          usergroup: 'DDVisual',
        }
      })
      .then(response => {
          console.log(response);
          this.setState({ userlist:response.data });
      })
      .catch(function (error) {
      console.log(error);
      });

    }

  render() {
    return ( <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User ID</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>User Group</TableCell>
                <TableCell>User Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {this.state.userlist.map((row,i)=>	{
               return <TableRow key={i}>
                  <TableCell component="th" scope="row">
                    {row.UserId}
                  </TableCell>
                  <TableCell >{row.FirstName}</TableCell>
                  <TableCell>{row.LastName}</TableCell>
                  <TableCell>{row.UserGroup}</TableCell>
                  <TableCell>{row.UserName}</TableCell>
                </TableRow>
              })}
            </TableBody>
          </Table>
        </Paper>
    );
  }
};