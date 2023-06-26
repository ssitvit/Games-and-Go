import { ReactNode } from "react";
import styles from "./Piece.module.css";

type Props = {
  color: string;
  border: string;
  children: ReactNode;
};

export default function Piece(props: Props) {
  return (
    <div
      className={styles.piece}
      style={{
        background: props.color !== "White" ? "black" : "#f8f7f3",
        border: props.border,
        color: props.color === "White" ? "black" : "#f8f7f3",
      }}
      {...props}
    />
  );
}
