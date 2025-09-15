declare module "react-grid-layout" {
    import * as React from "react";
  
    export interface Layout {
      i: string;
      x: number;
      y: number;
      w: number;
      h: number;
      minW?: number;
      maxW?: number;
      minH?: number;
      maxH?: number;
      static?: boolean;
      isDraggable?: boolean;
      isResizable?: boolean;
      [key: string]: any;
    }
  
    export interface ReactGridLayoutProps {
      className?: string;
      style?: React.CSSProperties;
      layout?: Layout[];
      cols?: number;
      rowHeight?: number;
      width?: number;
      margin?: [number, number];
      containerPadding?: [number, number];
      isDraggable?: boolean;
      isResizable?: boolean;
      onLayoutChange?: (layout: Layout[]) => void;
      children?: React.ReactNode;
    }
  
    export default class ReactGridLayout extends React.Component<ReactGridLayoutProps> {}
  }
  