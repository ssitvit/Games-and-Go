import React from "react"
const Button=(props)=>{
	return(
      <button style={{height:"50px",width:"50px",borderRadius:"25px",left:props.state.left,top:props.state.top,position:"absolute",backgroundColor:props.state.color,zIndex:500}}></button>
		)
}
export default Button