import './App.css';
import './components/card.css';
import Red from './components/red.js'; 
import Blue from './components/blue.js';
import Green from './components/green.js';
import Yellow from './components/yellow.js';
import Orange from './components/orange.js';
import Purple from './components/purple.js';
import React, { useState } from "react";




var term=1;
var col;
var totalscore=0;




function score1(){
  col="yel";
  
}

function score2(){
  col="red";
  
}

function score3(){
  col="blu";
  
}

function score4(){
  col="ora";
  
}

function score5(){
  col="gre";
  
}

function score6(){
  col="pur";
  
}



function App() {

  const [Number,showscore]=useState("0");

  function Marks(){
  
    if (col==="yel" & term === 2){
      totalscore++;
      showscore(totalscore);
      
      
    }
    else if(col === "red" & term === 3){
      totalscore++;
      showscore(totalscore);
      
    }
    else if(col === "gre" & term === 4){
      totalscore++;
      showscore(totalscore);
      
    }
    else if(col === "yel" & term === 5){
      totalscore++;
      showscore(totalscore);
      
    }
    else if(col === "pur" & term === 6){
      totalscore++;
      showscore(totalscore);
      
    }
    else if(col === "red" & term === 7){
      totalscore++;
      showscore(totalscore);
      
    }
    else if(col === "ora" & term === 8){
      totalscore++;
      showscore(totalscore);
      
    }
    else if(col === "blu" & term === 9){
      totalscore++;
      showscore(totalscore);
      
    }
    else if(col === "gre" & term === 10){
      totalscore++;
      showscore(totalscore);
      
    }
    else if(col === "pur" & term === 11){
      totalscore++;
      showscore(totalscore);
      
      
    }
    else{
      totalscore--;
      showscore(totalscore);
      
    }
  
    
    if ( term === 11 & totalscore === 10){
      alert("Congrats!!\nYou Won \n\n Refresh the page to play again");
      

      
    }
    if (term === 11 & totalscore !== 10){
      alert("Oops!! \n You lost\n\nRefresh the page to play again");
      
    }
  
    
 
  
  }  

  const [style, setStyle] = useState("yellow");
      
  const changecolor = () => {
    console.log("you just clicked");
    if (term === 1){
      setStyle("red");
      term=2;
      
      
    }     
    else if(term === 2){
      setStyle("green");
      term=3;

    }
    else if(term === 3){
      setStyle("yellow");
      term=4;

    }

    else if(term === 4){
      setStyle("purple");
      term=5;

    }

    else if(term === 5){
      setStyle("red");
      term=6;

    }

    else if(term === 6){
      setStyle("orange");
      term=7;

    }

    else if(term === 7){
      setStyle("blue");
      term=8;
 
    }

    else if(term === 8){
      setStyle("green");
      term=9;

    }

    else if(term === 9){
      setStyle("purple");
      term=10;
 
    }

    else if(term === 10){
      setStyle("green");
      term=11;
    }
    
  }

  

  return (
    <div className="App">
    <div className='head'>Drag & Drop</div>
    <div className='instruction'>Drag the middle coloured card and drop to similar one...</div>
    <div className='sc'>Score: <div>{Number}</div></div>
    <table className='table'>
    <tr>
      <td></td>
      <td><div onDragOver={score1}><Yellow></Yellow></div></td>
      <td></td>
      <td><div onDragOver={score2}><Red></Red></div></td>
      <td></td>

    </tr>
    <tr className='vtab'></tr>
    <tr>
      <td><div onDragOver={score3}><Blue></Blue></div></td>
      <td></td>
      <td><div  className={style} draggable onDragLeave={changecolor} onDragEnd={Marks}> </div></td>
      <td></td>
      <td><div onDragOver={score4}><Orange></Orange></div></td>
    </tr>
    <tr className='vtab'>
      <td></td>
      <td></td>
      <td>Drag me</td>
    </tr>
    <tr>
      <td></td>
      <td><div onDragOver={score5}><Green></Green></div></td>
      <td></td>
      <td><div onDragOver={score6}><Purple></Purple></div></td>
      <td></td>
    </tr>
    </table> 
    </div>
  );
}

export default App;
