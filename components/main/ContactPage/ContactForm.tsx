import React from "react";
// Icons
import { FaPaperPlane } from "react-icons/fa";
// React-hook-form and validation with Zod
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactFormSchema } from "@/schemas/ContactFormSchema";
import { ContactFormFields } from "@/schemas/ContactFormSchema";
// Toast
import { showToast } from "@/components/toast/Toast";

function ContactForm() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormFields>({
    resolver: zodResolver(ContactFormSchema),
  });

  const onSubmit: SubmitHandler<ContactFormFields> = async (data) => {
    const toastId = showToast("loading", {
      message: "Sending message...",
    });

    const web3formsKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY!;

    try {
      const heading = "This message came from contact us form";
      const formData = new FormData();
      formData.append("access_key", web3formsKey);
      formData.append("Heading", heading);
      formData.append("Name", data.name);
      formData.append("Email", data.email);
      formData.append("What are you reaching out about?", data.reachingOut);
      formData.append("Message", data.message);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        showToast("success", {
          message: "The message has been sent successfully!",
          toastId,
        });
        reset();
      } else {
        showToast("error", {
          message: "Something went wrong. Please try again.",
          toastId,
        });
      }
    } catch (error) {
      console.error(error);
      showToast("error", {
        message: "Failed to send the message, please try again later.",
        toastId,
      });
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="name"
            className="block mb-2 font-medium text-gray-700"
          >
            Name *
          </label>
          <input
            type="text"
            id="name"
            {...register("name")}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-black focus:border-black transition-all"
            placeholder="Your name"
          />
          {errors.name && (
            <div className="text-red-600">{errors.name.message}</div>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block mb-2 font-medium text-gray-700"
          >
            Email *
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-black focus:border-black transition-all"
            placeholder="your.email@example.com"
          />
          {errors.email && (
            <div className="text-red-600">{errors.email.message}</div>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="subject"
          className="block mb-2 font-medium text-gray-700"
        >
          What are you reaching out about?
        </label>
        <select
          id="subject"
          {...register("reachingOut")}
          className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-1 focus:ring-black focus:border-black transition-all"
        >
          <option value="">Select an option</option>
          <option value="collaboration">Collaboration</option>
          <option value="career">Career Opportunity</option>
          <option value="partnership">Partnership</option>
          <option value="inquiry">General Inquiry</option>
          <option value="feedback">Feedback</option>
        </select>
        {errors.reachingOut && (
          <div className="text-red-600">{errors.reachingOut.message}</div>
        )}
      </div>

      <div>
        <label
          htmlFor="message"
          className="block mb-2 font-medium text-gray-700"
        >
          Message *
        </label>
        <textarea
          id="message"
          rows={5}
          {...register("message")}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-black focus:border-black transition-all"
          placeholder="Tell us about your project or inquiry..."
        ></textarea>
        {errors.message && (
          <div className="text-red-600">{errors.message.message}</div>
        )}
      </div>

      <div className="flex items-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center justify-center bg-black text-white py-3 px-8 rounded-lg hover:bg-gray-800 transition-colors duration-300 font-medium cursor-pointer"
        >
          {isSubmitting ? (
            "Sending message..."
          ) : (
            <>
              <FaPaperPlane className="mr-2" />
              Send Message
            </>
          )}
        </button>
        <p className="ml-4 text-gray-600 text-sm">* Required fields</p>
      </div>
    </form>
  );
}

export default React.memo(ContactForm);
