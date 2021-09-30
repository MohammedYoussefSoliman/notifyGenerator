import Button from "./Button";
import "./styles.scss";
export const name: string = "hambozo";
const app = document.getElementById("app")!;

const button = new Button({
  text: { value: "hambozo" },
  border: { radius: "10px" },
  background: "#965",
  height: "60px",
});

app.appendChild(button.render());
