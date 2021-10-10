import { ColorProperty } from "./cssTypes";

export interface ButtonOptionsType {
  text?: string;
  styles?: Partial<CSSStyleDeclaration>;
  selectors?: {
    classes?: string[];
    id?: string;
  };
  onClick?: (event: MouseEvent) => void;
}

export type ElementType = {
  value: string | number;
  tag: string;
  elementStyles?: Partial<CSSStyleDeclaration>;
  name?: string;
  type?: string;
  placeholder?: string;
  classes?: string[];
  id?: string;
};

export type ContentType = {
  istabs: false;
  element: ElementType[];
};

type TabsConfigs = {
  istabs: true;
  tabs: {
    header: string;
    panelElements: ElementType[];
  }[];
  tabsStyles?: {
    active: Partial<CSSStyleDeclaration>;
    inactive: Partial<CSSStyleDeclaration>;
  };
};

type ModalHeader = {
  title?: ElementType;
  closeButton?: boolean;
  titleStyles?: Partial<CSSStyleDeclaration>;
};

type ModalFooter = {
  content?: ElementType;
  buttons?: ButtonOptionsType[];
  styles?: Partial<CSSStyleDeclaration>;
};

export interface ModalOptionsType {
  id: string;
  escClose?: boolean;
  backdropClose?: boolean;
  modalHeader?: ModalHeader;
  modalBody: TabsConfigs | ContentType;
  modalFooter?: ModalFooter;
  isFormModal?: boolean;
  size?: "sm" | "md" | "lg";
  selectors?: {
    classes?: string[];
  };
}
