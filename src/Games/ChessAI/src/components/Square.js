import React from "react"

const Square = props => {
  const handleClick = () => {
    if (props.piece == null && !props.active) props.clickNothing()
    else props.handleClick(props.i, props.k)
  }
  return (
    <div
      onClick={handleClick}
      className="box"
      style={{
        boxShadow: `0 0 40px 1px ${
          props.active ? (props.piece ? "red" : "yellow") : "transparent"
        } inset`
      }}
    >
      {props.piece && (
        <img
          src={
            process.env.PUBLIC_URL +
            `/gfx/${props.piece.color}${props.piece.type}.png`
          }
          alt={`${props.piece.color} ${props.piece.type}`}
          style={{ margin: "auto", height: "80%" }}
        />
      )}
    </div>
  )
}

export default Square
