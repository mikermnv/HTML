import React from "react";
import "./styles.css";

class Rooms extends React.Component {
  constructor(props) {
    super(props);
    console.log(
      "window.lab9models.roomsModel()",
      window.lab9models.roomsModel()
    );
    this.state={ substr : "",
                 filteredRooms: []
    };    
     this.handleChangeSubstr = (event) => this.handleChange(event);
  }
handleChange(event) {
    this.setState({ substr: event.target.value });
    const filteredRooms = window.lab9models.roomsModel().filter(room => {
        const roomName = room.toLowerCase();
        const searchSubstr = event.target.value.toLowerCase();
        if(event.target.value == ""){
            return;
        }
        return roomName.includes(searchSubstr);
      });

      filteredRooms.sort();
  
      this.setState({ filteredRooms: filteredRooms });
  } 

  render() {
    return (
	<div>
           <div className="state-search">
            {this.state.substr}
           {this.state.filteredRooms.length > 0 ? (
            <ul>
              {this.state.filteredRooms.map((room, index) => (
                <li key={index}>{room}</li>
              ))}
            </ul>
          ) : (
            <div>No matches found</div>
          )}
        </div>
           <div className="lab9-example-output"><span id='IInfo'></span></div> 
          <label htmlFor="substrId">Enter substring to search:</label>
          <input
            id="substrId"
            type="text"
            value={this.state.substr}
            onChange={this.handleChangeSubstr}
          />
              
    </div>
    );
  }
}

export default Rooms;
