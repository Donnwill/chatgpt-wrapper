"use client";

import { useRef, useState, useTransition } from "react";
import { Button } from "../ui/button";
import InputWidget from "./InputWidget";
import { FormValidation } from "./FormValidation";
import { sendEmail } from "@/actions/contact";
import { useToast } from "@/hooks/use-toast";

export type ContactFormData = {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
};

export default function ContactContent() {
  const { toast } = useToast();
  const [pending, startTransition] = useTransition();

  const [errors, setErrors] = useState<Record<string, string>>({});

  const formRef = useRef<HTMLFormElement | null>(null);

  function onHandleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const contactFormData = Object.fromEntries(
      formData.entries()
    ) as ContactFormData;

    const formValidation: FormValidation = new FormValidation(contactFormData);
    const errors = formValidation.validateContactForm();

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      startTransition(() => {
        sendEmail(contactFormData)
          .then(() => {
            const form = formRef.current;

            if (form) {
              form.reset();
            }
            toast({
              title: "Message sent successfully",
              description: "Your message is Successfully sent!",
            });
          })
          .catch((error) => {
            console.log(error);
            toast({
              title: "Error sending message",
              description:
                "Unfortunately your message was not sent, please try again later.",
            });
          });
      });
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={onHandleSubmit}
      className="flex flex-col gap-4 max-w-4xl mt-8"
    >
      <div className="flex flex-row gap-8">
        <div className="flex flex-col w-full gap-4">
          <InputWidget
            error={errors["firstName"]}
            label="First Name"
            name="firstName"
            placeholder={"John"}
          />
        </div>
        <div className="flex flex-col w-full gap-4">
          <InputWidget
            error={errors["lastName"]}
            label="Last Name"
            name="lastName"
            placeholder={"Snow"}
          />
        </div>
      </div>
      <InputWidget
        error={errors["email"]}
        label="Email"
        name="email"
        placeholder={"example@gmail.com"}
      />
      <InputWidget
        error={errors["subject"]}
        label="Subject"
        name="subject"
        placeholder={"About your portfolio"}
      />
      <InputWidget
        error={errors["message"]}
        label="Message"
        name="message"
        placeholder={"I love your Portfolio."}
      />
      <Button className="w-[20%]" disabled={pending} type="submit">
        {pending ? "SENDING" : "SUBMIT"}
      </Button>
    </form>
  );
}
