import {
  ModalOptionsType,
  ButtonOptionsType,
  ElementType,
  ContentType,
} from "./types/interfaces";
import { configResolver, elementStyler } from "./functions";
import { closeIcon } from "./assets/index";
import Button from "./Button";
import Is from "@flk/supportive-is";

export default class Modal {
  constructor(options: ModalOptionsType) {
    this.configOptions = configResolver<ModalOptionsType>(
      options,
      this.configOptions
    );
  }

  private configOptions: ModalOptionsType = {
    id: "default_modal",
    escClose: false,
    backdropClose: false,
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
          panelElements: [
            {
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
          ],
        },
        {
          header: "sms",
          panelElements: [
            {
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
    size: "md",
  };

  public modalActions() {
    const { configOptions } = this;
    const modal = document.getElementById(configOptions.id)!;
    if (configOptions.modalBody.istabs) {
      const { active, inactive } = configOptions.modalBody!.tabsStyles!;
      const tabButtons = modal.querySelectorAll(".modal--tabs__button");
      tabButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
          tabButtons.forEach((button) => {
            const btn = button as HTMLElement;
            btn.classList.remove("active");
            btn.style.color = inactive!.color!;
            btn.style.background = inactive!.background!;
          });
          const target = e.target as HTMLElement;
          target.classList.add("active");
          target.style.color = active!.color!;
          target.style.background = active!.background!;
        });
      });
    } else {
      return;
    }
  }

  static openModal(id: string) {
    const modalOverlay = document.getElementById(id)!;
    modalOverlay.style.display = "flex";
  }
  static closeModal(id: string) {
    const modalOverlay = document.getElementById(id)!;
    modalOverlay.style.display = "none";
  }

  private elementGenerator(content: ElementType) {
    const element = elementStyler(content!.tag)(content!.elementStyles!);
    element.innerText = `${content.value}`;
    if (content.type) element.setAttribute("type", content.type);
    if (content.placeholder)
      element.setAttribute("placeholder", content.placeholder);
    if (content.classes) element.className = content.classes.join(" ");
    if (content.id) element.id = content.id;
    return element;
  }

  private buttonGenerator(buttonOptions: ButtonOptionsType) {
    const buttonElement = new Button(buttonOptions);
    return buttonElement.render();
  }

  private generateModalOverlay() {
    const { configOptions } = this;
    const { escClose, backdropClose } = configOptions;
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    overlay.id = configOptions.id;
    if (escClose) {
      document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
          overlay.style.display = "none";
        }
      });
    }
    if (backdropClose) {
      document.addEventListener("click", function (event) {
        if (event.target === overlay) {
          overlay.style.display = "none";
        }
      });
    }
    return overlay;
  }

  private generateModal() {
    const { configOptions } = this;
    const { size, selectors } = configOptions;
    let modal: HTMLElement;
    if (configOptions.isFormModal) {
      modal = document.createElement("form");
      modal.id = "modalForm";
    } else {
      modal = document.createElement("div");
    }
    modal.className = "modal";
    if (size) {
      modal.classList.add(size);
    } else {
      modal.classList.add("sm");
    }
    if (selectors) {
      if (selectors.classes) {
        selectors.classes.forEach((cls) => {
          modal.classList.add(cls);
        });
      }
    }
    modal.id = modal.id + " " + configOptions.id;

    return modal;
  }

  private generateModalHeader() {
    const { configOptions, elementGenerator } = this;
    const wrapper = document.createElement("div");
    wrapper.classList.add("modal--header");
    let titleElement;
    if (configOptions.modalHeader && !Is.empty(configOptions.modalHeader)) {
      const { title, closeButton } = configOptions.modalHeader;
      if (title && typeof title === "string") {
        titleElement = document.createElement("h2");
        titleElement.classList.add("modal--header__title");
        titleElement.innerText = title;
      } else {
        titleElement = elementGenerator(title as ElementType);
        titleElement.style.flex = "1";
      }
      if (closeButton) {
        const Button = document.createElement("button");
        const image = document.createElement("img");
        image.setAttribute("src", closeIcon);
        Button.classList.add("modal--header__close__button");
        Button.id = "closeModal";
        Button.addEventListener("click", () => {
          const Modal = document.getElementById(configOptions.id)!;
          Modal.style.display = "none";
        });
        Button.appendChild(image);
        wrapper.appendChild(Button);
      }
      wrapper.appendChild(titleElement);
    }
    return wrapper;
  }

  private generateModalFooter() {
    const { configOptions, elementGenerator, buttonGenerator } = this;
    const wrapper = document.createElement("div");
    wrapper.classList.add("modal--footer");
    let contentElement;
    const buttonGroup = document.createElement("div");
    buttonGroup.classList.add("modal--footer__button__groups");

    let buttonElements: HTMLElement[] = [];
    if (configOptions.modalFooter && !Is.empty(configOptions.modalFooter)) {
      const { content, buttons } = configOptions.modalFooter;
      if (content && !Is.empty(content)) {
        contentElement = elementGenerator(content);
      }
      if (buttons && buttons.length) {
        buttons.forEach((btn) => {
          const buttonElement = buttonGenerator(btn);
          buttonElements.push(buttonElement);
        });
      }
    }
    if (contentElement) wrapper.appendChild(contentElement);

    if (buttonElements) {
      buttonElements.forEach((btn) => {
        buttonGroup.appendChild(btn);
      });
      wrapper.appendChild(buttonGroup);
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
        // toggle tabs event
        tabButton.addEventListener("click", () => {
          const panels = Array.from(
            document.getElementsByClassName(
              "modal--tab"
            ) as HTMLCollectionOf<HTMLElement>
          );
          panels.forEach((panel) => {
            if (panel.getAttribute("data-tab") === tabButton.dataset.tab) {
              console.log(panel);
              panel.style.display = "block";
            } else {
              panel.style.display = "none";
            }
          });
        });
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
        if (!element.type || element.type !== "input") {
          panel.innerText = `${element.value}`;
        }
        if (element.placeholder)
          panel.setAttribute("placeholder", element.placeholder);
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

  render() {
    const { configOptions, generateSingleContent } = this;
    const Modal = this.generateModal();
    const ModalHeader = configOptions.modalHeader
      ? this.generateModalHeader()
      : null;
    const ModalFooter = configOptions.modalFooter
      ? this.generateModalFooter()
      : null;
    let ModalBody: HTMLElement;
    if (configOptions.modalBody.istabs) {
      const { active, inactive } = configOptions.modalBody!.tabsStyles!;
      const headers = this.generateTabsHeaders(
        configOptions.modalBody.tabs.map((tab) => tab.header),
        configOptions.modalBody.tabsStyles!
      );
      headers.querySelectorAll(".modal--tabs__button").forEach((element) => {
        const header = element as HTMLElement;
        header.style.color = inactive.color!;
        header.style.background = inactive.background!;
      });
      const tabs = configOptions.modalBody.tabs;
      let panels = this.generateTabsPanels(tabs);
      const firstHeader = headers.querySelector(
        ".modal--tabs__button"
      )! as HTMLElement;
      firstHeader.style.color = active.color!;
      firstHeader.style.background = active.background!;
      ModalBody = this.generateModalBody(panels);
      ModalBody.appendChild(headers);
      panels.forEach((p, index) => {
        if (index === 0) {
          p!.style.display = "block";
        } else {
          p!.style.display = "none";
        }
        ModalBody.appendChild(p);
      });
    } else {
      const Content = configOptions.modalBody as ContentType;
      const elements = generateSingleContent(Content.element);
      ModalBody = this.generateModalBody(elements);
    }
    const Overlay = this.generateModalOverlay();
    if (ModalHeader) Modal.appendChild(ModalHeader);
    if (ModalBody) Modal.appendChild(ModalBody);
    if (ModalFooter) Modal.appendChild(ModalFooter);
    Overlay.appendChild(Modal);
    return Overlay;
  }
}
