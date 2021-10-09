import { ColorProperty } from "./cssTypes";

export interface ButtonOptionsType {
  text?: string;
  styles?: Partial<CSSStyleDeclaration>;
  selectors?: {
    classes?: string[];
    id?: string;
  };
}

export type ElementType = {
  value: string | number;
  name?: string;
  tag: string;
  elementStyles?: Partial<CSSStyleDeclaration>;
  type?: string;
  classes?: string[];
  id?: string;
};

type ContentType = {
  istabs: false;
  element: ElementType[];
};

type TabsConfigs = {
  istabs: true;
  tabs: {
    header: string;
    panel?: ElementType[] | ElementType;
  }[];
  tabsStyles?: {
    active: Partial<CSSStyleDeclaration>;
    inactive: Partial<CSSStyleDeclaration>;
  };
};

type ModalHeader = {
  title?: ElementType;
  closelButton?: ButtonOptionsType;
  titleStyles?: Partial<CSSStyleDeclaration>;
  withClose?: boolean;
};

type ModalFooter = {
  content?: ElementType;
  withClose?: boolean;
  closelButton?: ButtonOptionsType;
  button?: ButtonOptionsType;
  styles?: Partial<CSSStyleDeclaration>;
};

export interface ModalOptionsType {
  modalHeader?: ModalHeader;
  modalBody?: TabsConfigs | ContentType;
  modalFooter?: ModalFooter;
  isFormModal?: boolean;
  size?: "sm" | "md" | "lg";
  selectors?: {
    classes?: string[];
    id?: string;
  };
}
