"use server";

import { ContactFormData } from "@/components/contact/contactContent";
import nodemailer from "nodemailer";

export async function sendEmail(contactFormData: ContactFormData) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${contactFormData.firstName} ${contactFormData.lastName}" ${contactFormData.email}`,
      to: process.env.GMAIL_USER,
      subject: contactFormData.subject,
      text: contactFormData.message,
      replyTo: contactFormData.email,
      html: `<p>${contactFormData.message}</p>`,
    });

    return { message: "Success" };
  } catch (error: any) {
    return {
      message: "Error during sending message.",
      error: error?.message || error.error,
    };
  }
}
