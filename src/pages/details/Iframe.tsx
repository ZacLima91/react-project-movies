import { useEffect, useRef } from "react";
import { Movie } from "../../api/types";

type Props = {
  item: Movie | undefined;
};

export const Iframe = (props: Props) => {
  const item = props.item;

  const iframeRef = useRef<null | any>(null);

  useEffect(() => {
    const height = (iframeRef.current.offsetWidth * 9) / 16 + "px";
    iframeRef.current.setAttribute("height", height);
  }, []);

  return (
    <div className="video">
      <div className="video__title">
        <h2>Trailer</h2>
      </div>
      <div className="iframe-content">
        <iframe src={item?.trailer} ref={iframeRef} title="video"></iframe>
      </div>
    </div>
  );
};
