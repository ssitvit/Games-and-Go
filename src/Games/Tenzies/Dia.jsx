import React from "react";

export default function App(props) {
const styles = {
        backgroundColor: props.isHeld ? "skyblue" : "white"
    }

    return(
    

<div className="die-face" style={styles}    onClick={props.holdDice} >
<h2 className="die-num">{props.value}</h2>
</div>

)

}