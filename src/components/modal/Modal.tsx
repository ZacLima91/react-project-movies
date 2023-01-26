import { useEffect, useRef, useState } from "react";
import "./modal.scss";

type Props = {
  active: boolean;
  id: string;
  children: React.ReactNode;
};

type ModalProps = {
  children: React.ReactNode;
  active: boolean;
  id: string;
  onClose: () => unknown;
};

export function Modal(props: Props) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(props.active);
  }, [props.active]);

  return (
    <div  id={props.id} className={`modal ${active ? "active" : ""}`}>
      {props.children}
    </div>
  );
}

export function ModalContent(props: ModalProps) {
  const contentRef = useRef<HTMLDivElement>(null);



  return (
    <div ref={contentRef} className="modal__content">
      {props.children}
      <div className="modal__content__close">
        <i className="bx bx-x"></i>
      </div>
    </div>
  );
}
