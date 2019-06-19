

const initialState =  {show:false,message:""};

export default function(state = initialState, action) {
 
  switch (action.type) {
    case "SET_SNACKBAR": 
    return  {show:action.set.show,message:action.set.message};

    default:
      return state;
  }
  
}
