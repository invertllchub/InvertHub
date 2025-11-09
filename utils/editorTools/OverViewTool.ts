import { BlockTool, BlockToolConstructorOptions } from "@editorjs/editorjs";

interface OverviewData {
  text: string;
}

export default class OverViewTool implements BlockTool {
  private data: OverviewData;
  private wrapper: HTMLDivElement | null;

  constructor({ data }: BlockToolConstructorOptions<OverviewData>) {
    this.data = data || { text: "" };
    this.wrapper = null;
  }

    static get toolbox() {
        return {
            title: "Overview",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2.18" ry="2.18"></rect><line x1="9" y1="9" x2="15" y2="9"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg>`,
        };
    }

  render(): HTMLElement {
    this.wrapper = document.createElement("div");
    this.wrapper.classList.add("overview-tool");

    const textarea = document.createElement("textarea");
    textarea.placeholder = "Enter overview text";
    textarea.value = this.data?.text ?? "";
    textarea.rows = 7,
    textarea.className = "border my-2 p-2 rounded w-full min-h-[100px]";

    this.wrapper.appendChild(textarea);

    return this.wrapper;
  }

  save(blockContent: HTMLElement): OverviewData {
    const textarea = blockContent.querySelector("textarea") as HTMLTextAreaElement;

    return {
      text: textarea?.value || "",
    };
  }
}
