import React from "react";

const Tile = ({ tile }) => {
  let classArray = ["tile"];
  classArray.push("tile" + tile.value);
  if (!tile.mergeInto) {
    classArray.push(`position_${tile.row}_${tile.column}`);
  }
  if (tile.mergeInto) {
    classArray.push("merged");
  }
  if (tile.isNew()) {
    classArray.push("new");
  }
  if (tile.hasMoved()) {
    classArray.push(`row_from_${tile.fromRow()}_to_${tile.toRow()}`);
    classArray.push(`column_from_${tile.fromColumn()}_to_${tile.toColumn()}`);
    classArray.push("isMoving");
  }
  let classes = classArray.join(" ");
  return <span className={classes}></span>;
};

export default Tile;
