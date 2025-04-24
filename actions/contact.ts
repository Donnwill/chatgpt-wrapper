"use server";

import { Resend } from "resend";
import { ContactFormData } from "@/components/contact/contactContent";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(contactFormData: ContactFormData) {
  try {
    const response = await resend.emails.send({
      from: `"${contactFormData.firstName} ${contactFormData.lastName}" <onboarding@resend.dev>`,
      to: "donn2610@gmail.com",
      subject: contactFormData.subject,
      text: contactFormData.message,
      replyTo: contactFormData.email,
      html: `<p>${contactFormData.message}</p>`,
    });
    if (response.error) {
      return {
        success: false,
        name: "Message unsuccessfully",
        message:
          "Unfortunately your message was not sent, please try again later.",
      };
    }
    console.log({ response });
    return {
      success: true,
      name: "Message sent successfully",
      message: "Your message is Successfully sent!",
    };
  } catch (error: any) {
    return {
      name: "Message unsuccessfully",
      message:
        "Unfortunately your message was not sent, please try again later.",
      error: error?.message || error.error,
    };
  }
}
