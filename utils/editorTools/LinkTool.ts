// utils/editorTools/LinkTool.ts
export default class LinkTool {
  data: { url?: string };
  input: HTMLInputElement | null;

  constructor({ data }: { data?: { url?: string } }) {
    this.data = data || {};
    this.input = null;
  }

  static get toolbox() {
    return {
      title: "Link",
      icon: "🔗",
    };
  }

  render() {
    const wrapper = document.createElement("div");

    this.input = document.createElement("input");
    this.input.type = "text";
    this.input.placeholder = "Enter URL (e.g. https://facebook.com)";
    this.input.value = this.data.url || "";
    this.input.className =
      "border rounded p-2 w-full outline-none focus:ring-2 focus:ring-blue-500";

    wrapper.appendChild(this.input);
    return wrapper;
  }

  save() {
    return {
      url: this.input?.value,
    };
  }
}
