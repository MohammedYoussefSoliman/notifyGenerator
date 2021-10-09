import Button from "./Button";
import "./styles.scss";
export const name: string = "hambozo";

const app = document.getElementById("app")!;

const button = new Button({
  text: "test title",
  styles: {
    height: "60px",
    background: "#f56",
    borderRadius: "5px",
    border: "none",
  },
});

app.appendChild(button.render());
