import React from 'react';

const ContactUs = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold">Contact Us</h1>
      <p className="mt-2">We&apos;d love to hear from you!</p>
      <h2 className="mt-4 text-xl font-semibold">Get in Touch</h2>
      <p>
        Email: contact@thecrmflow.com
        <br />
        Phone: +91-7389134179
     
      </p>
      <h2 className="mt-4 text-xl font-semibold">Business Hours</h2>
      <p>
        Monday - Friday: 9 AM - 5 PM
        <br />
        Saturday - Sunday: Closed
      </p>
      <h2 className="mt-4 text-xl font-semibold">Contact Form</h2>
      <form className="mt-4">
        <label className="block mb-2" htmlFor="name">Name:</label>
        <input className="border p-2 w-full mb-4" type="text" id="name" name="name" required />
        
        <label className="block mb-2" htmlFor="email">Email:</label>
        <input className="border p-2 w-full mb-4" type="email" id="email" name="email" required />
        
        <label className="block mb-2" htmlFor="message">Message:</label>
        <textarea className="border p-2 w-full mb-4" id="message" name="message" rows={4} required></textarea>
        
        <button className="bg-blue-500 text-white py-2 px-4 rounded" type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default ContactUs;
