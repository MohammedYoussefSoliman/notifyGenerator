import {
  FontSizeProperty,
  ColorProperty,
  BackgroundProperty,
  FontWeightProperty,
  WidthProperty,
  HeightProperty,
  BorderWidthProperty,
  BorderRadiusProperty,
} from "./cssTypes";

export interface ButtonOptionsType {
  type?: "button" | "anchor";
  text?: {
    value: string;
    color?: ColorProperty;
    size?: FontSizeProperty<number | string>;
    weight?: FontWeightProperty;
  };
  background?: BackgroundProperty<number | string>;
  width?: WidthProperty<number | string>;
  height?: HeightProperty<number | string>;
  border?: {
    width?: BorderWidthProperty<number | string>;
    color?: ColorProperty;
    radius?: BorderRadiusProperty<number | string>;
  };
}

export interface ModalOptionsType {
  title?: {
    text: string;
    color?: ColorProperty;
    size?: FontSizeProperty<number | string>;
    weight?: FontWeightProperty;
  } | null;
  tabs?: {
    color?: ColorProperty;
    background?: ColorProperty;
    activeColor?: ColorProperty;
    activeBackground?: ColorProperty;
  };
  Button?: ButtonOptionsType;
  size?: "sm" | "md" | "lg";
}
