import { ButtonOptionsType } from "./types/interfaces";
import { elementStyler, configResolver } from "./functions";
import Is from "@flk/supportive-is";

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
    text: "Notify me",
    styles: {
      color: "#ffffff",
      fontSize: "1.5rem",
      fontWeight: "normal",
      background: "#0e1311",
      width: "100%",
      height: "50px",
    },
  };

  private generateButton() {
    const { configOptions } = this;
    const button = elementStyler("button")(configOptions.styles!);
    button.setAttribute("type", "button");
    if (configOptions.selectors && !Is.empty(configOptions.selectors)) {
      const { classes, id } = configOptions.selectors;
      if (classes) button.className = classes.join(" ");
      if (id) button.id = id;
    }
    button.innerText = configOptions["text"] as string;

    return button;
  }

  public render() {
    const { configOptions } = this;
    const { onClick } = configOptions;
    const Button = this.generateButton();
    if (onClick) Button.addEventListener("click", (event) => onClick(event));
    return Button;
  }
}
