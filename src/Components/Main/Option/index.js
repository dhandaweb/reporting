import React from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import env from '../../../environment.json';
import DeleteIcon from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import SettingIcon from '@material-ui/icons/Settings';

export default class Options extends React.Component {

  constructor(props) {
    super(props);
    this.updateOption = this.updateOption.bind(this);
    this.getOptions = this.getOptions.bind(this);
    this.deleteOption = this.deleteOption.bind(this);
    
    this.state = {
      list: [
      
        
       
        {
          title: "Ethnicity list",
          tableName: "ethnicityList",
          addText: "",
          options: []
        },
        {
          title: "Citizenship list",
          tableName: "citizenshipList",
          addText: "",
          options: []
        },
        {
          title: "Work status List",
          tableName: "workStatusList",
          addText: "",
          options: []
        },
        {
          title: "Offer status list",
          tableName: "offerStatusList",
          addText: "",
          options: []
        },
        {
          title: "Recruiters",
          tableName: "recruiterList",
          addText: "",
          options: []
        },
        {
          title: "Cre list",
          tableName: "creList",
          addText: "",
          options: []
        },
        {
          title: "Account managers",
          addText: "",
          tableName: "accountManagerList",
          options: []
        },
        {
          title: "Country managers",
          tableName: "countryManagerList",
          addText: "",
          options: []
        },
        {
          title: "Account directors",
          tableName: "accountDirectorList ",
          addText: "",
          options: []
        },
      ]
    };

    this.getOptions(0);

  }

  getOptions(i) {
    
    if(this.state.list[i] !== undefined){
    axios({
      method: 'post',
      url: env.endPointUrl + 'getOption',
      data: { tableName: this.state.list[i].tableName }
    })
      .then(response => {
        this.state.list[i].options = response.data;
        
        if(i < this.state.list.length-1) this.getOptions(i+1);
        else this.setState({ list: this.state.list });

      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }

  updateOption(item) {
    axios({
      method: 'post',
      url: env.endPointUrl + 'getOption',
      data: { tableName: item.tableName }
    })
      .then(response => {
        item.options = response.data;
        this.setState({ list: this.state.list })
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  handleSubmit(item) {

    axios({
      method: 'post',
      url: env.endPointUrl + 'addOption',
      data: {
        tableName: item.tableName,
        sortId: 0,
        label: item.addText
      }
    })
      .then(response => {
        item.addText="";
        this.updateOption(item);

      })
      .catch(function (error) {
        console.log(error);
      });
  }

  deleteOption(item,id){

      axios({
        method: 'post',
        url: env.endPointUrl + 'deleteOption',
        data: {tableName: item.tableName, id:id }
      })
        .then(response => {
          this.updateOption(item);
        })
        .catch(function (error) {
          console.log(error);
        })

  }

  updateOp(item,d){
    axios({
      method: 'post',
      url: env.endPointUrl + 'updateOption',
      data: {tableName: item.tableName, id:d.id, label:d.label }
    })
      .then(response => {
        this.updateOption(item);
      })
      .catch(function (error) {
        console.log(error);
      })
  }


  render() {

    var items = this.state.list.map((item,i) => {
      return <Grid item xl ={3} lg={3} md={3} sm={6} xs={12} key={i}>
        <Card >
          <CardContent>
            <Typography color="textSecondary" gutterBottom> {item.title}</Typography>

            <ValidatorForm
              ref="form"
              onSubmit={(e) => { this.handleSubmit(item) }}
              onError={errors => console.log(errors)}
            >
              <TextValidator
                fullWidth
                label="Add new"
                value={item.addText}
                validators={['required']}
                errorMessages={['value is required']}
                onChange={(e) => {
                  item.addText = e.target.value;
                  this.setState({ list: this.state.list })
                }}
                margin="normal">
              </TextValidator>

            </ValidatorForm>
            <List component="nav"> {
              item.options.length > 0 && 
              item.options.map(d => {
                return <div key={d.id}>
                      <ListItem>
                        {!d.isEditing &&
                          d.label} 

                        {d.isEditing &&
                          <ValidatorForm
                          className="formFullWidth"
                          ref="form"
                          onSubmit={(e) => {  d.isEditing = false;
                            this.updateOp(item,d); }}
                          onError={errors => console.log(errors)}
                          >
                          <TextValidator
                            fullWidth
                            value={d.label} 
                            validators={['required']}
                            errorMessages={['value is required']}
                            onChange={(e) => {
                              d.label = e.target.value;
                              this.setState({ list: this.state.list })
                            }}
                            margin="normal">
                          </TextValidator>
                          </ValidatorForm>
                        }

                        {!d.isEditing &&
                        <Edit className="editIcon" onClick={() => { 
                         d.isEditing = !d.isEditing;
                         this.setState({ list: this.state.list })
                        }}/>
                       }

                        <DeleteIcon className="trashIcon" onClick={(e) => { this.deleteOption(item,d.id)}}/>
                        </ListItem>
                      <Divider />
                </div>
              })
            }
            </List>
          </CardContent>
        </Card>
      </Grid>
    })

    return (<Grid container spacing={24} className="mainContent">
      <div className="subHeading">
          <SettingIcon className="dashboard"/>
          <Typography className="title" variant="subtitle1" noWrap> Candidate List</Typography>
        </div>
      {items}
      </Grid>);
  }

}
