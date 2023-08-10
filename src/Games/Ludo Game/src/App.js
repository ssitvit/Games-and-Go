import React from "react";
import FrontEnd from "./components/FrontEnd"
import Logo from "./Capture.PNG";

import Button from "./components/Button";
import Box from "./components/Box";
import Circle from "./components/circle"
var num = null;
var element;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      pawn: [
        {
          name: 0,
          color: "green",
          top: 50,
          left: 40,
          isOut: false,
          inHouse: true,
          onStar: false,
          startTop:50,
          startLeft:40
        },
        {
          name: 1,
          color: "green",
          top: 50,
          left: 140,
          isOut: false,
          inHouse: true,
          onStar: false,
          startTop:50,
          startLeft:140
        },
        {
          name: 2,
          color: "green",
          top: 150,
          left: 40,
          isOut: false,
          inHouse: true,
          onStar: false,
          startTop:150,
          startLeft:40
        },
        {
          name: 3,
          color: "green",
          top: 150,
          left: 140,
          isOut: false,
          inHouse: true,
          onStar: false,
          startTop:150,
          startLeft:140
        },
        {
          name: 4,
          color: "yellow",
          top: 50,
          left: 440,
          isOut: false,
          inHouse: true,
          onStar: false,
          startTop:50,
          startLeft:440
        },
        {
          name: 5,
          color: "yellow",
          top: 50,
          left: 550,
          isOut: false,
          inHouse: true,
          onStar: false,
          startTop:50,
          startLeft:550
        },
        {
          name: 6,
          color: "yellow",
          top: 150,
          left: 440,
          isOut: false,
          inHouse: true,
          onStar: false,
          startTop:150,
          startLeft:440
        },
        {
          name: 7,
          color: "yellow",
          top: 150,
          left: 550,
          isOut: false,
          inHouse: true,
          onStar: false,
          startTop:150,
          startLeft:550
        },
        {
          name: 8,
          color: "red",
          top: 450,
          left: 40,
          isOut: false,
          inHouse: true,
          onStar: false,

          startTop:450,
          startLeft:40
        },
        {
          name: 9,
          color: "red",
          top: 450,
          left: 140,
          isOut: false,
          inHouse: true,
          onStar: false,
          startTop:450,
          startLeft:140
        },
        {
          name: 10,
          color: "red",
          top: 550,
          left: 40,
          isOut: false,
          inHouse: true,
          onStar: false,
          startTop:550,
          startLeft:40
        },
        {
          name: 11,
          color: "red",
          top: 550,
          left: 140,
          isOut: false,
          inHouse: true,
          onStar: false,
          startTop:550,
          startLeft:140
        },
        {
          name: 12,
          color: "blue",
          top: 450,
          left: 440,
          isOut: false,
          inHouse: true,
          onStar: false,
          startTop:450,
          startLeft:440
        },
        {
          name: 13,
          color: "blue",
          top: 450,
          left: 550,
          isOut: false,
          inHouse: true,
          onStar: false,
          startTop:450,
          startLeft:550
        },
        {
          name: 14,
          color: "blue",
          top: 550,
          left: 440,
          isOut: false,
          inHouse: true,
          onStar: false,
          startTop:550,
          startLeft:440
        },
        {
          name: 15,
          color: "blue",
          top: 550,
          left: 550,
          isOut: false,
          inHouse: true,
          onStar: false,
          startTop:550,
          startLeft:550
        }
      ],
      pasa: null,
      PlayerArray: ["red", "green", "yellow", "blue"],
      index: 0,
      winner: null
    }
  }

  Dice = event => {
    num = Math.floor(Math.random()*6)+1
    this.setState({
      pasa: num
    });
    element = event.target; //Dice is disabled
    element.disabled = true;

  }
  movepaw = item => {


    var currentPlayer = this.state.PlayerArray[this.state.index];
    var pitna=0;
    var name = item.name;
    var color = item.color;
    var pasa = this.state.pasa;
    var inHouse = item.inHouse;
    var mappedTop, mappedLeft;
    var left = item.left;
    var top = item.top;
    if (color == "red") {
      mappedTop = 550;
      mappedLeft = 250;
    } else if (color == "green") {
      mappedTop = 250;
      mappedLeft = 50;
    } else if (color == "yellow") {
      mappedTop = 50;
      mappedLeft = 350;
    } else if (color == "blue") {
      mappedTop = 350;
      mappedLeft = 550;
    }
    var pawnNew;
    //For movement
    var newX, newY;
    if (currentPlayer == color) {
console.log("StartLeft is",this.state.pawn[name].startLeft);

      //Selected pawn belongs to correct player
      if ((pasa == 6 && inHouse)||(pasa==1 && inHouse)) {
      	element.disabled=false;
        newX = mappedLeft;
        newY = mappedTop;
         pawnNew = this.state.pawn;
      pawnNew[name] = {
        name: name,
        color: color,
        left: newX,
        top: newY,
        isOut: false,
        inHouse: false,   
        onStar: true,
        startLeft:this.state.pawn[name].startLeft,
        startTop:this.state.pawn[name].startTop
      };

      this.setState({
        pawn: pawnNew,

      });

      } else if (!inHouse) {


        var box_grid = document.getElementById("grid");
        var pasanum=this.state.pasa;
        while(pasanum--)
        {
          
        var leftpx=left.toString();
        leftpx=leftpx+"px";
        var toppx=top.toString();
        toppx=toppx+"px";
        var dir;
        for (var i = 0; i < box_grid.children.length; i++) {
        	if (
            box_grid.children[i].style.left == leftpx &&
            box_grid.children[i].style.top == toppx
          ) {
        		dir=box_grid.children[i].getAttribute("dir");
            var type=box_grid.children[i].getAttribute("type");

            if(type=="NS")
            {

               var turn=box_grid.children[i].getAttribute("turn");
               console.log("Turn is",turn);
            }


            break;
          }
        }
        if(turn=="red" && color=="red")
        {
          dir=0;
        }
        if(turn=="green" && color=="green")
        {
          dir=2;
        }
        if(turn=="yellow" && color=="yellow")
        {
          dir=4;
        }
        if(turn=="blue" && color=="blue")
        {
          dir=6;
        }
       	if (dir == 0) {
          newX = left;
          newY = top - 50;
        }
        if (dir == 1) {
          newX = left + 50;
          newY = top - 50;
        }
        if (dir == 2) {
          newX = left + 50;
          newY = top;
        }
        if (dir == 3) {
          newX = left + 50;
          newY = top + 50;
        }
        if (dir == 4) {
          newX = left;
          newY = top + 50;
        }
        if (dir == 5) {
          newX = left - 50;
          newY = top + 50;
        }
        if (dir == 6) {
          newX = left - 50;
          newY = top;
        }
        if (dir == 7) {
          newX = left - 50;
          newY = top - 50;
        }
     	 pawnNew = this.state.pawn;
      pawnNew[name] = {
        name: name,
        color: color,
        left: newX,
        top: newY,
        isOut: false,
        inHouse: false,
        onStar: true,
        startLeft:this.state.pawn[name].startLeft,
        startTop:this.state.pawn[name].startTop
      };

      this.setState({
        pawn: pawnNew,

      });
    left=newX;
    top=newY;

 }


        //console.log(box_grid.children[0].l0eft,left);
         
        for(var i=0;i<this.state.pawn.length;i++)
        {//Checking goti ka pitna

          if(this.state.pawn[i].left==left && this.state.pawn[i].top==top && this.state.pawn[i].color!=color)
          {
            //this.state.pawn[i] pit gayi
            pitna=1;
            var copy=this.state.pawn;
            copy[i]={name: name,
        color: this.state.pawn[i].color,
        left: this.state.pawn[i].startLeft,
        top: this.state.pawn[i].startTop,
        isOut: false,
        inHouse: true,
        onStar: true,
        startLeft:this.state.pawn[i].startLeft,
        startTop:this.state.pawn[i].startTop

            }
            this.setState({pawn:copy});
            break;
          }

        }
        
         }
         element.disabled=false;
         if(this.state.pasa!=6 && pitna==0)
         {
         this.setState(prevState => {
            return {
                index: (prevState.index + 1)%4
            }
        })
       }
        currentPlayer=this.state.PlayerArray[this.state.index];
        

  }

}






  render(){
  return (
        <div><Circle top="50px" left="40px" />
        <Circle top="50px" left="140px" />
        <Circle top="150px" left="40px" />
        <Circle top="150px" left="140px" />

        <Circle top="50px" left="440px" />
        <Circle top="50px" left="550px" />
        <Circle top="150px" left="440px" />
        <Circle top="150px" left="550px" />

        <Circle top="450px" left="40px" />
        <Circle top="450px" left="140px" />
        <Circle top="550px" left="40px" />
        <Circle top="550px" left="140px" />

        <Circle top="450px" left="440px" />
        <Circle top="450px" left="550px" />
        <Circle top="550px" left="440px" />
        <Circle top="550px" left="550px" />

        <Box height="250px" width="250px" color="red" top="400px" left="0px" />
        <Box height="250px" width="250px" color="green" top="0px" left="0px" />
        <Box
          height="250px"
          width="250px"
          color="blue"
          top="400px"
          left="400px"
        />
        <Box
          height="250px"
          width="250px"
          color="yellow"
          top="0px"
          left="400px"
        />

        <div id="grid">
          <Box
            height="50px"
            dir="2"
            width="50px"
            type="N"
            color="white"
            top="0px"
            left="250px"
          />
          <Box
            height="50px"
            dir="0"
            width="50px"
            type="N"
            color="white"
            top="50px"
            left="250px"
          />
          <Box
            height="50px"
            dir="0"
            width="50px"
            type="N"
            color="white"
            top="100px"
            left="250px"
          />
          <Box
            height="50px"
            dir="0"
            width="50px"
            type="N"
            color="white"
            top="150px"
            left="250px"
          />
          <Box
            height="50px"
            dir="0"
            width="50px"
            type="N"
            color="white"
            top="200px"
            left="250px"
          />
          <Box
            height="50px"
            dir="2"
            width="50px"
            type="NS"
            color="white"
            top="0px"
            left="300px"
            turn="yellow"
          />
          <Box
            height="50px"
            dir="4"
            width="50px"
            type="N"
            color="yellow"
            top="50px"
            left="300px"
          />
          <Box
            height="50px"
            dir="4"
            width="50px"
            type="N"
            color="yellow"
            top="100px"
            left="300px"
          />
          <Box
            height="50px"
            dir="4"
            width="50px"
            type="N"
            color="yellow"
            top="150px"
            left="300px"
          />
          <Box
            height="50px"
            dir="4"
            width="50px"
            type="N"
            color="yellow"
            top="200px"
            left="300px"
          />
          <Box
            height="50px"
            dir="4"
            width="50px"
            type="N"
            color="white"
            top="0px"
            left="350px"
          />
          <Box
            height="50px"
            dir="4"
            width="50px"
            type="S"
            color="yellow"
            top="50px"
            left="350px"
          />
          <Box
            height="50px"
            dir="4"
            width="50px"
            type="N"
            color="white"
            top="100px"
            left="350px"
          />
          <Box
            height="50px"
            dir="4"
            width="50px"
            type="N"
            color="white"
            top="150px"
            left="350px"
          />
          <Box
            height="50px"
            dir="3"
            width="50px"
            type="N"
            color="white"
            top="200px"
            left="350px"
          />

          <Box
            height="50px"
            dir="7"

            width="50px"
            type="N"
            color="white"
            top="400px"
            left="250px"
          />
          <Box
            height="50px"
            dir="0"
            width="50px"
            type="N"
            color="white"
            top="450px"
            left="250px"
          />
          <Box
            height="50px"
            dir="0"
            width="50px"
            type="N"
            color="white"
            top="500px"
            left="250px"
          />
          <Box
            height="50px"
            dir="0"
            width="50px"
            type="S"
            color="red"
            top="550px"
            left="250px"
          />
          <Box
            height="50px"
            dir="0"
            width="50px"
            type="N"
            color="white"
            top="600px"
            left="250px"
          />
          <Box
            height="50px"
            dir="0"
            width="50px"
            type="N"
            color="red"
            top="400px"
            left="300px"
          />
          <Box
            height="50px"
            dir="0"
            width="50px"
            type="N"
            color="red"
            top="450px"
            left="300px"
          />
          <Box
            height="50px"
            dir="0"
            width="50px"
            type="N"
            color="red"
            top="500px"
            left="300px"
          />
          <Box
            height="50px"
            dir="0"
            width="50px"
            type="N"
            color="red"
            top="550px"
            left="300px"
          />
          <Box
            height="50px"
            dir="6"
            width="50px"
            type="NS"
            color="white"
            top="600px"
            left="300px"
            turn="red"
          />
          <Box
            height="50px"
            dir="4"
            width="50px"
            type="N"
            color="white"
            top="400px"
            left="350px"
          />
          <Box
            height="50px"
            dir="4"
            width="50px"
            type="N"
            color="white"
            top="450px"
            left="350px"
          />
          <Box
            height="50px"
            dir="4"
            width="50px"
            type="N"
            color="white"
            top="500px"
            left="350px"
          />
          <Box
            height="50px"
            dir="4"
            width="50px"
            type="N"
            color="white"
            top="550px"
            left="350px"
          />
          <Box
            height="50px"
            dir="6"
            width="50px"
            type="N"
            color="white"
            top="600px"
            left="350px"
          />

          <Box
            height="50px"
            dir="0"
            type="N"
            width="50px"
            color="white"
            top="350px"
            left="0px"
          />
          <Box
            height="50px"
            dir="6"
            type="N"
            width="50px"
            color="white"
            top="350px"
            left="50px"
          />
          <Box
            height="50px"
            dir="6"
            type="N"
            width="50px"
            color="white"
            top="350px"
            left="100px"
          />
          <Box
            height="50px"
            dir="6"
            type="N"
            width="50px"
            color="white"
            top="350px"
            left="150px"
          />
          <Box
            height="50px"
            dir="6"
            type="N"
            width="50px"
            color="white"
            top="350px"
            left="200px"
          />
          <Box
            height="50px"
            dir="0"
            type="NS"
            width="50px"
            color="white"
            top="300px"
            left="0px"
            turn="green"
          />
          <Box
            height="50px"
            dir="2"
            type="N"
            width="50px"
            color="green"
            top="300px"
            left="50px"
          />
          <Box  height="50px" dir="2" type="N" width="50px" color="green" top="300px" left="100px"/>
          <Box
            height="50px"
            dir="2"
            type="N"
            width="50px"
            color="green"
            top="300px"
            left="150px"
          />
          <Box
            height="50px"
            dir="2"
            type="N"
            width="50px"
            color="green"
            top="300px"
            left="200px"
          />
          <Box
            height="50px"
            dir="2"
            type="N"
            width="50px"
            color="white"
            top="250px"
            left="0px"
          />
          <Box
            height="50px"
            dir="2"
            type="S"
            width="50px"
            color="green"
            top="250px"
            left="50px"
          />
          <Box
            height="50px"
            dir="2"
            type="N"
            width="50px"
            color="white"
            top="250px"
            left="100px"
          />
          <Box
            height="50px"
            dir="2"
            type="N"
            width="50px"
            color="white"
            top="250px"
            left="150px"
          />
          <Box
            height="50px"
            dir="1"
            type="N"
            width="50px"
            color="white"
            top="250px"
            left="200px"
          />

          <Box
            height="50px"
            dir="5"
            type="N"
            width="50px"
            color="white"
            top="350px"
            left="400px"
          />
          <Box
            height="50px"
            dir="6"
            type="N"
            width="50px"
            color="white"
            top="350px"
            left="450px"
          />
          <Box
            height="50px"
            dir="6"
            type="N"
            width="50px"
            color="white"
            top="350px"
            left="500px"
          />
          <Box
            height="50px"
            dir="6"
            type="S"
            width="50px"
            color="blue"
            top="350px"
            left="550px"
          />
          <Box
            height="50px"
            dir="6"
            type="N"
            width="50px"
            color="white"
            top="350px"
            left="600px"
          />
          <Box
            height="50px"
            dir="6"
            type="N"
            width="50px"
            color="blue"
            top="300px"
            left="400px"
          />
          <Box
            height="50px"
            dir="6"
            type="N"
            width="50px"
            color="blue"
            top="300px"
            left="450px"
          />
          <Box
            height="50px"
            dir="6"
            type="N"
            width="50px"
            color="blue"
            top="300px"
            left="500px"
          />
          <Box
            height="50px"
            dir="6"
            type="N"
            width="50px"
            color="blue"
            top="300px"
            left="550px"
          />
          <Box
            height="50px"
            dir="4"
            type="NS"
            width="50px"
            color="white"
            top="300px"
            left="600px"
            turn="blue"
          />
          <Box
            height="50px"
            dir="2"
            type="N"
            width="50px"
            color="white"
            top="250px"
            left="400px"
          />
          <Box
            height="50px"
            dir="2"
            type="N"
            width="50px"
            color="white"
            top="250px"
            left="450px"
          />
          <Box
            height="50px"
            dir="2"
            type="N"
            width="50px"
            color="white"
            top="250px"
            left="500px"
          />
          <Box
            height="50px"
            dir="2"
            type="N"
            width="50px"
            color="white"
            top="250px"
            left="550px"
          />
          <Box
            height="50px"
            dir="4"
            type="N"
            width="50px"
            color="white"
            top="250px"
            left="600px"
          />
        </div>


        {this.state.pawn.map((item, index) => {
          return (
            <div onClick={this.movepaw.bind(this, item)}>
              <Button state={item} key={index} />
            </div>
          );
        })}
        <button
          name="dice"
          onClick={this.Dice}
          style={{
            width: "50px",
            height: "50px",
            position: "absolute",
            top: "300px",
            left: "900px"
          }}
          >
          {this.state.pasa}
        </button>
        <img src={Logo} className="Logo" />
     
         </div>
         )

  }




}
export default App;
