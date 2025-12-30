import { BlockTool, BlockToolConstructorOptions } from "@editorjs/editorjs";

interface SubHeaderData {
  text: string;
}

export default class SubHeaderTool implements BlockTool {
  private data: SubHeaderData;
  private wrapper: HTMLHeadingElement | null;

  constructor({ data }: BlockToolConstructorOptions<SubHeaderData>) {
    this.data = data || { text: "" };
    this.wrapper = null;
  }

  static get toolbox() {
    return {
      title: "Subheader",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="10" x2="16" y2="10"></line><line x1="4" y1="14" x2="16" y2="14"></line></svg>`,
    };
  }

  render(): HTMLElement {
    this.wrapper = document.createElement("p");
    this.wrapper.contentEditable = "true";
    this.wrapper.className = "subheader-tool border-l-4 border-blue-500 pl-3 my-2 text-xl font-semibold";
    this.wrapper.innerText = this.data?.text || "";
    this.wrapper.style.outline = "none"; 

    return this.wrapper;
  }

  save(blockContent: HTMLElement): SubHeaderData {
    return {
      text: blockContent.innerText || "",
    };
  }
}
