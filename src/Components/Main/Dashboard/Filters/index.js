import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';



export default class Filters extends React.Component {
 
 
constructor(props) {
      super(props);
      this.state = {
        dropdownOpen: false
      };
      this.toggle = this.toggle.bind(this);
      this.changeFilter = this.changeFilter.bind(this);
}


componentDidMount() {
    
    window.addEventListener("resize", this.drawChart);
}

toggle() {
  this.setState(prevState => ({
    dropdownOpen: !prevState.dropdownOpen
  }));
}

changeFilter(item){
 item.isSelected = !item.isSelected;

 this.props.setFilter();
}

render() {
   
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} style={{float:'right'}}>
      <DropdownToggle caret>
        {this.props.data.title}
      </DropdownToggle>
      <DropdownMenu right>
      <FormControl component="fieldset" style={{padding:10}}>
         <FormHelperText>Check item to filter.</FormHelperText>
         <FormGroup>
          
         {this.props.data.data.map((item,i)=>{
            return <FormControlLabel key={i} checked={!item.isSelected} onChange={(e)=> { this.changeFilter(item)}} control={<Checkbox value={item.key}/>} label={item.key} />
         })}
          
        </FormGroup>

        
      </FormControl>
      </DropdownMenu>
    </Dropdown>
    );
  }
};