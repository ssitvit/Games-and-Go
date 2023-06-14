import React,{useState,useEffect} from 'react';
import CreateBoard from '../Utils/CreateBoard';
import { revealed } from "../Utils/Reveal";
import Cell from './Cell';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Board() {
  const [grid,setGrid]=useState([]);
  const [nonMinecount,setNonMinecount]=useState(0);
  const [mineLocation,setmineLocation]=useState([]);
  const style={
    display : 'flex',
    flexDirection : 'row',
    width:'fit-content',
    color:'white',
    
}
  useEffect(()=>{
      
      freshBoard();
  },[]);
  const freshBoard = () => {
    const newBoard=CreateBoard(10,10,20);
    setNonMinecount(10*10-20);
    
    setmineLocation(newBoard.mineLocation);
    setGrid(newBoard.board);
}
 
  const updateFlag=(e,x,y)=>{
    e.preventDefault();
    
    let newGrid=JSON.parse(JSON.stringify(grid));
    newGrid[x][y].flagged=true;
    console.log(newGrid[x][y]);
    setGrid(newGrid);
}
const newfresh=()=>{
    freshBoard();
}
const revealcell=(x,y)=>{
    let newGrid=JSON.parse(JSON.stringify(grid));
    if(newGrid[x][y].value==="X"){
   alert(' Clicked on Mine ,Try Again', { position: "top-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
        for(let i=0;i<mineLocation.length;i++){
            newGrid[mineLocation[i][0]][mineLocation[i][1]].revealed=true;
        }
        setGrid(newGrid);
        setTimeout(newfresh,500);
   
    }
    if(nonMinecount===0){
      // eslint-disable-next-line
     alert('Wohoo!!,You won',{ position: "top-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
        setTimeout(newfresh,500);
    }
    else{
        let revealedboard=revealed(newGrid,x,y,nonMinecount);
        setGrid(revealedboard.arr);
        setNonMinecount(revealedboard.newNonMines);
    }
    
}
  return (
      <div className="parent">
    
          <div style={{color:"white",textAlign:"center",fontSize:"35px"}}>Non-Mines : {nonMinecount}</div>
          <div>
          {/* <ToastContainer></ToastContainer> */}
              {grid.map((singlerow,index1)=>{
                  return (
                    
                        <div style={style} key={index1}> 
                          {singlerow.map((singlecol,index2)=>{
                          return  <Cell details={singlecol} key={index2} updateFlag={updateFlag} revealcell={revealcell}/>
                          })}
                      </div> 
                      
                  )
              })}
          </div>
        
      </div>
  ) 

}
export default Board;

