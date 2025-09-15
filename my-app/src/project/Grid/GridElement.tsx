import GridLayout from "react-grid-layout";
import "./GridElement.scss";

function GridElement() {

  const layout = [
    { i: "a", x: 0, y: 0, w: 1, h: 2 },
    { i: "b", x: 1, y: 0, w: 1, h: 2 },
    { i: "c", x: 2, y: 0, w: 1, h: 2 },
    { i: "d", x: 0, y: 1, w: 1, h: 2 },
    { i: "e", x: 1, y: 1, w: 1, h: 2 },
    { i: "f", x: 2, y: 1, w: 1, h: 2 },
  ];

  return (
    <div className="grid-wrapper">
  <GridLayout
    className="layout"
    layout={layout}
    cols={3}
    rowHeight={30}
    width={document.body.clientWidth} // ширина экрана
  >
    <div className="aKub" key="a"></div>
    <div className="bKub" key="b"></div>
    <div className="cKub" key="c"></div>
    <div className="dKub" key="d"></div>
    <div className="eKub" key="e"></div>
    <div className="fKub" key="f"></div>
  </GridLayout>
</div>
  );
}

export default GridElement;
