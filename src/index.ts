import Button from "./Button";
import Modal from "./Modal";
import "./styles.scss";
export const name: string = "hambozo";

const app = document.getElementById("app")!;

const button = new Button({
  text: "test modal",
  styles: {
    height: "60px",
    background: "#f56",
    borderRadius: "5px",
    border: "none",
    outline: "none",
    cursor: "pointer",
  },
  selectors: {
    id: "open_modal",
  },
  onClick: (e) => {
    e.preventDefault();
    Modal.openModal("first_modal");
  },
});

const secondButton = new Button({
  text: "open modal two",
  styles: {
    height: "60px",
    background: "#056",
    borderRadius: "5px",
    border: "none",
    outline: "none",
    cursor: "pointer",
    width: "fit-content",
  },
  selectors: {
    id: "open_modal_second",
  },
  onClick: (e) => {
    e.preventDefault();
    Modal.openModal("second_modal");
  },
});

const modelTwo = new Modal({
  id: "second_modal",
  escClose: false,
  backdropClose: false,
  modalHeader: {
    closeButton: false,
    title: {
      value: "second modal title",
      tag: "h2",
      elementStyles: {
        textAlign: "center",
      },
    },
  },
  modalBody: {
    istabs: false,
    element: [
      {
        value: "body content",
        tag: "div",
      },
    ],
  },
  modalFooter: {
    buttons: [
      {
        text: "submit",
        styles: {
          height: "60px",
          background: "#096",
          color: "#fff",
          borderRadius: "5px",
          border: "none",
          outline: "none",
          cursor: "pointer",
        },
        selectors: {
          id: "close_second_modal",
        },
        onClick: (e) => {
          e.preventDefault();
          console.log("modal submitted");
        },
      },
      {
        text: "cancel",
        styles: {
          height: "60px",
          background: "#000",
          color: "#fff",
          borderRadius: "5px",
          border: "none",
          outline: "none",
          cursor: "pointer",
        },
        selectors: {
          id: "close_second_modal",
        },
        onClick: (e) => {
          e.preventDefault();
          Modal.closeModal("second_modal");
        },
      },
    ],
  },
});

const modal = new Modal({
  id: "first_modal",
  escClose: true,
  backdropClose: false,
  modalHeader: {
    closeButton: true,
  },
  modalBody: {
    istabs: true,
    tabs: [
      {
        header: "email",
        panelElements: [
          {
            name: "email",
            tag: "input",
            type: "email",
            placeholder: "email address",
            value: "",
            elementStyles: {
              padding: "1rem",
              border: "1px solid #00f6",
              borderRadius: "5px",
            },
          },
        ],
      },
      {
        header: "sms",
        panelElements: [
          {
            name: "sms",
            tag: "input",
            type: "text",
            placeholder: "phone number",
            value: "",
            elementStyles: {
              padding: "1rem",
              border: "1px solid #00f6",
              borderRadius: "5px",
            },
          },
        ],
      },
      {
        header: "test",
        panelElements: [
          {
            name: "test",
            tag: "p",
            value: "this is a test value",
            elementStyles: {
              padding: "1rem",
              border: "1px solid #ff6",
              borderRadius: "5px",
              color: "#333",
            },
          },
        ],
      },
    ],
    tabsStyles: {
      active: {
        color: "#333333",
        background: "#00ff79",
      },
      inactive: {
        color: "#f66",
        background: "#f4f4f4",
      },
    },
  },
  modalFooter: {
    buttons: [
      {
        text: "save",
        styles: {
          height: "60px",
          background: "#056",
          borderRadius: "5px",
          border: "none",
          outline: "none",
          cursor: "pointer",
        },
        selectors: {
          id: "submit_button",
        },
        onClick: (e) => {
          console.log("button submitted");
        },
      },
      {
        text: "edit",
        styles: {
          height: "60px",
          background: "#06f",
          borderRadius: "5px",
          border: "none",
          outline: "none",
          cursor: "pointer",
        },
        selectors: {
          id: "submit_button",
        },
        onClick: (e) => {
          console.log("edit done");
        },
      },
    ],
  },
  size: "sm",
});
app.appendChild(button.render());
app.appendChild(secondButton.render());
app.appendChild(modal.render());
app.appendChild(modelTwo.render());
modelTwo.modalActions();
modal.modalActions();
