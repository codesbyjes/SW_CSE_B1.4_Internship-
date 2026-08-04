import { useRef } from "react";
import emailjs from "@emailjs/browser";
import "./ContactForm.css";

function ContactForm() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_m7yhp4b",
        "template_52bjx9k",
        form.current,
        {
          publicKey: "a9LwHdIvpru5yB5hJ",
        }
      )
      .then(
        () => {
          alert("Message sent successfully! 🎉");
          form.current.reset();
        },
        (error) => {
          console.log("EmailJS Error:", error);
          alert("Failed to send message.");
        }
      );
  };

  return (
    <form ref={form} onSubmit={sendEmail} className="contact-form">

      <div className="form-field">
        <label>Name</label>
        <input
          type="text"
          name="user_name"
          placeholder="Enter your name"
          required
        />
      </div>

      <div className="form-field">
        <label>Email</label>
        <input
          type="email"
          name="user_email"
          placeholder="Enter your email"
          required
        />
      </div>

      <div className="form-field">
        <label>Message</label>
        <textarea
          name="message"
          placeholder="Write your message..."
          rows="5"
          required
        ></textarea>
      </div>

      <button type="submit" className="btn">
        Send Message
      </button>

    </form>
  );
}

export default ContactForm;