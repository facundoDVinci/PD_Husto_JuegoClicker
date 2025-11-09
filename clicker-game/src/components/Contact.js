import React, { useState } from "react";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      alert("Por favor completa todos los campos.");
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="container text-center text-light mt-5">
        <h2>¡Gracias por contactarte, {form.name}!</h2>
        <p>Te responderemos pronto a <strong>{form.email}</strong>.</p>
      </div>
    );
  }

  return (
    <div className="container text-light mt-5">
      <h1>Contacto</h1>
      <p className="mt-3">¿Tenés alguna consulta o sugerencia? Escribinos!</p>

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={form.name}
            onChange={handleChange}
            placeholder="Tu nombre"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Correo electrónico</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={form.email}
            onChange={handleChange}
            placeholder="tucorreo@ejemplo.com"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Mensaje</label>
          <textarea
            name="message"
            className="form-control"
            value={form.message}
            onChange={handleChange}
            rows="4"
            placeholder="Escribí tu mensaje..."
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary">
          Enviar
        </button>
      </form>
    </div>
  );
}

export default Contact;
