import { ModalOptionsType, ElementType } from "./types/interfaces";
import { configResolver, elementStyler } from "./functions";
import Button from "./Button";
import Is from "@flk/supportive-is";

export default class Modal {
  constructor(options: ModalOptionsType | null) {
    if (options) {
      this.configOptions = configResolver<ModalOptionsType>(
        options,
        this.configOptions
      );
    }
  }

  private configOptions: ModalOptionsType = {
    modalHeader: {
      title: {
        value: "notify me",
        tag: "h2",
        elementStyles: {
          color: "#000",
          fontSize: "18px",
          fontWeight: "500",
        },
      },
    },
    modalBody: {
      istabs: true,
      tabs: [
        {
          header: "email",
          panel: {
            name: "email",
            tag: "input",
            type: "email",
            value: "",
            elementStyles: {
              padding: "1rem",
              border: "1px solid #00f6",
              borderRadius: "5px",
            },
          },
        },
        {
          header: "sms",
          panel: {
            name: "sms",
            tag: "input",
            type: "text",
            value: "",
            elementStyles: {
              padding: "1rem",
              border: "1px solid #00f6",
              borderRadius: "5px",
            },
          },
        },
      ],
      tabsStyles: {
        active: {
          color: "#333333",
          background: "#00ff79",
        },
        inactive: {
          color: "#000",
          background: "#f4f4f4",
        },
      },
    },
    size: "md",
  };

  private generateModalOverlay() {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    overlay.id = "modal_overlay";
    return overlay;
  }

  private generateModal() {
    const { configOptions } = this;
    let modal;
    if (configOptions.isFormModal) {
      modal = document.createElement("form");
      modal.id = "modalForm";
    } else {
      modal = document.createElement("div");
    }
    modal.className = "modal";
    return modal;
  }

  private generateModalHeader() {
    const { configOptions } = this;
    const wrapper = document.createElement("div");
    wrapper.classList.add("modal--header");
    let titleElement;
    if (configOptions.modalHeader && !Is.empty(configOptions.modalHeader)) {
      const { title } = configOptions.modalHeader;
      if (title && typeof title === "string") {
        titleElement = document.createElement("h2");
        titleElement.classList.add("modal--header__title");
        titleElement.innerText = title;
      } else {
        if (title!.elementStyles)
          titleElement = elementStyler(title!.tag)(title!.elementStyles);
        else titleElement = document.createElement(title!.tag);
        if (title!.classes) titleElement.className = title!.classes.join(" ");
        if (title!.id) titleElement.id = title!.id;
        if (title!.type) titleElement.setAttribute("type", title!.type);
        if (title!.name) titleElement.setAttribute("name", title!.name);
      }
      wrapper.appendChild(titleElement);
    }
    return wrapper;
  }

  private generateModalBody(children: HTMLElement[]) {
    const wrapper = document.createElement("div");
    children.forEach((element) => {
      wrapper.appendChild(element);
    });
    wrapper.classList.add("modal--body");
    return wrapper;
  }

  private generateTabsHeaders(
    headers: string[],
    tabsStyles: Partial<CSSStyleDeclaration> | null
  ) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("modal--tabs");
    if (tabsStyles) {
      headers.forEach((tab) => {
        const tabButton = elementStyler("button")(tabsStyles);
        tabButton.setAttribute("data-tab", tab);
        tabButton.setAttribute("type", "button");
        tabButton.innerText = tab;
        tabButton.classList.add("modal--tabs__button");
        wrapper.appendChild(tabButton);
      });
    }
    return wrapper;
  }

  private generateTabsPanels(
    tabs: { header: string; panelElements: ElementType[] }[]
  ) {
    let panels: HTMLElement[] = [];
    tabs.forEach((tab) => {
      tab.panelElements.forEach((element) => {
        let panel;
        if (element.elementStyles) {
          panel = elementStyler(element.tag)(element.elementStyles);
        } else {
          panel = document.createElement("div");
        }
        if (element.classes) panel.className = element.classes.join(" ");
        if (element.id) panel.id = element.id;
        panel.classList.add("modal--tab");
        if (element.type) panel.setAttribute("type", element.type);
        panel.setAttribute("data-tab", tab.header);
        panels.push(panel);
      });
    });
    return panels;
  }

  private generateSingleContent(content: ElementType[]) {
    let elements: HTMLElement[] = [];
    content.forEach((item) => {
      let element;
      if (item.elementStyles) {
        element = elementStyler(item.tag)(item.elementStyles);
      } else {
        element = document.createElement("div");
      }
      if (item.classes) element.className = item.classes.join(" ");
      if (item.id) element.id = item.id;
      if (item.type) element.setAttribute("type", item.type);
      elements.push(element);
    });
    return elements;
  }

  private generateFooter() {}

  // old code

  private generateModalTabsHeader() {
    const tabsWrapper = document.createElement("div");
    tabsWrapper.className = "modal--tabs";
    return tabsWrapper;
  }

  private generateModalTabsButtons(array: string[]) {
    let tabsButtons: any[] = [];
    array.map((content, index) => {
      const tabButton = document.createElement("button");
      tabButton.className = "modal--tabs__button";
      tabButton.setAttribute("data-tabButton", `${index + 1}`);
      tabButton.setAttribute("type", "button");
      tabButton.innerText = content;
      if (index === 0) {
        tabButton.classList.add("active");
      }
      tabsButtons.push(tabButton);
    });
    return tabsButtons;
  }

  private generateModalTabs(array: any[]) {
    let tabs: any[] = [];
    Array.from({ length: array.length }, (_, index) => {
      const tab = document.createElement("div");
      tab.className = "modal--tab";
      tab.setAttribute("data-tab", `${index + 1}`);
      if (index > 0) {
        tab.style.display = "none";
      } else {
        tab.style.display = "block";
      }
      tabs.push(tab);
    });
    return tabs;
  }

  private generateTabInput(name: string, type: string, placeholder: string) {
    const input = document.createElement("input");
    input.setAttribute("type", type);
    input.setAttribute("name", name);
    input.setAttribute("placeholder", placeholder);
    input.className = "modal--tab__input";
    return input;
  }

  private generateButton() {
    const button = document.createElement("button");
    button.className = "notify--button";
    button.id = "notify_utton";
    button.innerText = "notify me";
    return button;
  }

  render() {
    const Modal = this.generateModal();
    // generate tabs
    const Tabs = this.generateModalTabs(["Email", "SMS"]);
    Tabs[0].appendChild(
      this.generateTabInput("email", "email", "Email address")
    );
    Tabs[0].querySelector(".modal--tab__input").classList.add("active--input");
    Tabs[1].appendChild(this.generateTabInput("sms", "text", "phone number"));
    // generate tab header
    const tabsHeader = this.generateModalTabsHeader();
    const tabButtons = this.generateModalTabsButtons(["Email", "SMS"]);
    tabButtons.forEach((tabButton) => {
      tabsHeader.appendChild(tabButton);
    });
    // title
    const Overlay = this.generateModalOverlay();
    // if (this.configOptions.title) {
    //   const Title = this.generateModalTitle(this.configOptions.title);
    //   Modal.appendChild(Title);
    // }
    const SubmitButton = this.generateButton();
    Modal.appendChild(tabsHeader);
    Tabs.forEach((Tab) => {
      Modal.appendChild(Tab);
    });
    Modal.appendChild(SubmitButton);
    Overlay.appendChild(Modal);
    return Overlay;
  }
}
