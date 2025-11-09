import { uploadToCloudinary } from "@/utils/CloudinaryUpload";

interface VideoData {
  url: string;
}

export default class VideoTool {
  data: VideoData | null;
  wrapper: HTMLDivElement | null;

  constructor({ data }: { data: VideoData }) {
    this.data = data || null;
    this.wrapper = null;
  }

  static get toolbox() {
    return {
      title: "Video",
      icon: "🎥",
    };
  }

  render() {
    this.wrapper = document.createElement("div");
    this.wrapper.className = "p-4 border rounded bg-gray-50";

    if (this.data?.url) {
      const video = document.createElement("video");
      video.src = this.data.url;
      video.controls = true;
      video.style.width = "100%";
      video.style.borderRadius = "8px";
      this.wrapper.appendChild(video);
      return this.wrapper;
    }

    const button = document.createElement("button");
    button.innerText = "Upload Video";
    button.className = "px-4 py-2 bg-blue-600 text-white rounded";

    const input = document.createElement("input");
    input.type = "file";
    input.accept = "video/*";
    input.style.display = "none";

    button.addEventListener("click", () => input.click());

    input.addEventListener("change", async (e: Event) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file) {
        const url = await uploadToCloudinary(file);
        this.data = { url };
        this.wrapper!.innerHTML = "";

        const video = document.createElement("video");
        video.src = url;
        video.controls = true;
        video.style.width = "100%";
        video.style.borderRadius = "8px";
        this.wrapper!.appendChild(video);
      }
    });

    this.wrapper.appendChild(button);
    this.wrapper.appendChild(input);

    return this.wrapper;
  }

  save() {
    return this.data;
  }
}
