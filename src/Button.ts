import { ButtonOptionsType } from "./types/interfaces";
import { configResolver } from "./configResolver";

export default class Button {
  constructor(options: ButtonOptionsType | null) {
    if (options) {
      this.configOptions = configResolver<ButtonOptionsType>(
        options,
        this.configOptions
      );
    }
  }
  private configOptions: ButtonOptionsType = {
    type: "button",
    text: {
      value: "Notify me",
      color: "#ffffff",
      size: "1.5rem",
      weight: "normal",
    },

    background: "#0e1311",
    width: "100%",
    height: "50px",
    border: {
      width: 0,
    },
  };

  private generateButton() {
    const { configOptions } = this;
    const button = document.createElement("button");
    button.setAttribute("type", "button");
    button.className = "modal--button";
    button.id = "modalButton";
    button.innerText = configOptions["text"]!.value;
    // styling the button
    button.style.color = configOptions["text"]!.color as string;
    button.style.fontSize = configOptions["text"]!.size as string;
    button.style.fontWeight = configOptions["text"]!.weight as string;
    button.style.backgroundColor = configOptions.background as string;
    button.style.width = configOptions.width as string;
    button.style.height = configOptions.height as string;
    if (configOptions.border) {
      if (configOptions.border.width) {
        button.style.borderWidth = configOptions.border.width as string;
      }
      if (configOptions.border.color) {
        button.style.borderColor = configOptions.border.color as string;
      }
      if (configOptions.border.radius) {
        button.style.borderRadius = configOptions.border.radius as string;
      }
    }
    return button;
  }

  public render() {
    const Button = this.generateButton();
    return Button;
  }
}
