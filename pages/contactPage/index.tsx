import React, { useState } from "react";

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    subject: "",
    email: "",
    body: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    subject: "",
    email: "",
    body: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = { fullName: "", subject: "", email: "", body: "" };
    if (formData.fullName.length < 3) newErrors.fullName = "Full name must be at least 3 characters.";
    if (formData.subject.length < 3) newErrors.subject = "Subject must be at least 3 characters.";
    if (!formData.email.includes("@") || !formData.email.includes(".")) newErrors.email = "Invalid email format.";
    if (formData.body.length < 3) newErrors.body = "Message must be at least 3 characters.";

    setErrors(newErrors);
    return Object.values(newErrors).every((err) => err === "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      alert("Your message has been sent!");
      setFormData({ fullName: "", subject: "", email: "", body: "" });
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Contact Us</h2>
      <form onSubmit={handleSubmit} className="p-4 shadow-sm bg-light rounded">
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            name="fullName"
            className="form-control"
            value={formData.fullName}
            onChange={handleChange}
          />
          {errors.fullName && <p className="text-danger">{errors.fullName}</p>}
        </div>

        <div className="mb-3">
          <label className="form-label">Subject</label>
          <input
            type="text"
            name="subject"
            className="form-control"
            value={formData.subject}
            onChange={handleChange}
          />
          {errors.subject && <p className="text-danger">{errors.subject}</p>}
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="text-danger">{errors.email}</p>}
        </div>

        <div className="mb-3">
          <label className="form-label">Message</label>
          <textarea
            name="body"
            className="form-control"
            value={formData.body}
            onChange={handleChange}
          />
          {errors.body && <p className="text-danger">{errors.body}</p>}
        </div>

        <button type="submit" className="btn btn-primary w-100">Send Message</button>
      </form>
    </div>
  );
};

export default ContactPage;
