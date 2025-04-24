import { ContactFormData } from "./contactContent";
import validator from "validator";

export class FormValidation {
  private contactFormData: ContactFormData;
  private errors: Record<string, string>;

  constructor(contactFormData: ContactFormData) {
    this.contactFormData = contactFormData;
    this.errors = {};
  }

  public validateContactForm() {
    this.errors = {};
    if (this.contactFormData.firstName === "") {
      this.errors.firstName = "Please provide a valid First Name.";
    }

    if (this.contactFormData.lastName === "") {
      this.errors.lastName = "Please provide a valid Last Name.";
    }

    if (!validator.isEmail(this.contactFormData.email)) {
      this.errors.email = "Please provide a valid Email.";
    }

    if (this.contactFormData.subject === "") {
      this.errors.subject = "Please provide a valid Subject.";
    }

    if (this.contactFormData.message === "") {
      this.errors.message = "Please provide a valid Message.";
    }

    return this.errors;
  }
}
