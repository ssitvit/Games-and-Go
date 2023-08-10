import React from "react"
const Circle=(props)=>{
	return(
		<div style={{width:"50px",height:"50px",borderRadius:"25px",top:props.top,left:props.left,border:"1px solid black",zIndex:100,position:"absolute",backgroundColor:"white"}}></div>
		)
}
export default Circle