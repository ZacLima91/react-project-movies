import { MouseEventHandler } from "react";
import "./button.scss";
export function Button(props: {
  className: any;
  onClick: () => any;
  children: any;
}) {
  return (
    <button
      className={`btn ${props.className}`}
      onClick={props.onClick ? () => props.onClick() : undefined}
    >
      {props.children}
    </button>
  );
}

export const OutlineButton = (props: {
  className: any;
  onClick: MouseEventHandler<HTMLSpanElement>;
  children: any;
}) => {
  return (
    <button
      className={`btn ${props.className}`}
      onClick={props.onClick ? props.onClick : undefined}
    >
      {props.children}
    </button>
  );
};
