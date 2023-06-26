import { ReactNode } from "react";
import styles from "./Board.module.css";

type Props = {
  children: ReactNode;
};

export default function Board(props: Props) {
  return <div className={styles.board}>{props.children}</div>;
}
