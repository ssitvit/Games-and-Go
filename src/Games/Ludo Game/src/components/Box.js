import React from "react"
const Box=(props)=>{
	return(
		<div dir={props.dir} turn={props.turn} type={props.type} style={{border:"1px solid black",height:props.height,width:props.width,backgroundColor:props.color,left:props.left,top:props.top,position:"absolute",zIndex:0}}>

		</div>

		)
}
export default Box