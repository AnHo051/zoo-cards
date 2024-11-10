import { ReactComponent as Tree1 } from "../../../images/banner/tree-1.svg";
import { ReactComponent as Tree2 } from "../../../images/banner/tree-2.svg";
import { ReactComponent as Tree3 } from "../../../images/banner/tree-3.svg";
import { ReactComponent as Grass1 } from "../../../images/banner/grass-1.svg";
import { ReactComponent as Grass2 } from "../../../images/banner/grass-2.svg";

import "./TreesDecor.css";

export default function TreesDecor() {
  return (
    <>
      <div className="trees-decor pointer-events-none select-none absolute bottom-[25vh] left-[22%] w-1/6">
        <Tree1 />
      </div>

      <div className="trees-decor pointer-events-none select-none absolute bottom-[18vh] -left-[3%] w-[30%]">
        <Tree2 />
      </div>

      <div className="trees-decor pointer-events-none select-none absolute bottom-[22vh] right-[3%] w-[30%]">
        <Tree3 />
      </div>

      <div className="trees-decor pointer-events-none select-none absolute bottom-[-5vh] left-[20%] w-[10%]">
        <Grass1 />
      </div>

      <div className="trees-decor pointer-events-none select-none absolute bottom-[-7vh] right-[2%] w-[20%]">
        <Grass2 />
      </div>
    </>
  );
}
