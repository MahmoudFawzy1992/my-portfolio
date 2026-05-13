// src/components/Contact/Contact.jsx
import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { FiPhone, FiMail, FiLinkedin, FiGithub, FiSend, FiCheck, FiAlertCircle } from 'react-icons/fi';
import SectionHeader from '../shared/SectionHeader';
const contactImg = '/assets/images/contact-me.webp';
import './Contact.css';

const EMAILJS_SERVICE  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_KEY      = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const INITIAL_FORM = { name: '', email: '', subject: '', message: '' };

function validate(form) {
  const errs = {};
  if (!form.name.trim())    errs.name    = 'Name is required';
  if (!form.email.trim())   errs.email   = 'Email is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errs.email = 'Enter a valid email address';
  if (!form.subject.trim()) errs.subject = 'Subject is required';
  if (!form.message.trim()) errs.message = 'Message is required';
  return errs;
}

export default function Contact() {
  const formRef                = useRef(null);
  const [form, setForm]        = useState(INITIAL_FORM);
  const [errors, setErrors]    = useState({});
  const [status, setStatus]    = useState('idle'); // idle | loading | success | error
  const [touched, setTouched]  = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, ...validate({ ...form, [name]: value }) }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, ...validate({ ...form, [name]: e.target.value }) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Anti-spam honeypot check
    const formData = new FormData(e.target);
    if (formData.get('_honey')) {
      console.log('Spam detected');
      setStatus('success'); // Silently fail for bots
      return;
    }

    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setTouched({ name: true, email: true, subject: true, message: true });
      return;
    }

    setStatus('loading');
    try {
      await emailjs.sendForm(EMAILJS_SERVICE, EMAILJS_TEMPLATE, formRef.current, { publicKey: EMAILJS_KEY });
      setStatus('success');
      setForm(INITIAL_FORM);
      setTouched({});
      setErrors({});
    } catch (err) {
      console.error('[EmailJS]', err);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="contact section" aria-labelledby="contact-heading">
      <div className="container">
        <SectionHeader subtitle="Get In Touch" title="Contact Me" />

        <div className="contact__inner">
          {/* ─── Info panel ─── */}
          <motion.aside
            className="contact__info"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="contact__profile">
            <div className="contact__profile-img-wrapper">
              <img
                src={contactImg}
                alt="Mahmoud Fawzy"
                className="contact__profile-img"
                width="120"
                height="120"
                loading="lazy"
                onLoad={(e) => e.currentTarget.classList.add('loaded')}
              />
            </div>
              <div>
                <h3 className="contact__profile-name">Mahmoud Fawzy</h3>
                <p className="contact__profile-role">Full-Stack Developer & AI Engineer</p>
              </div>
            </div>

            <p className="contact__availability">
              I am available for freelance work. Connect with me via phone or email below.
            </p>

            <ul className="contact__details">
              <li>
                <a href="tel:+201025883148" className="contact__detail-link">
                  <span className="contact__detail-label">Phone:</span>
                  <span>+20 102 588 3148</span>
                </a>
              </li>
              <li>
                <a href="mailto:mahmoud.fawzy1992.2@gmail.com" className="contact__detail-link">
                  <span className="contact__detail-label">Email:</span>
                  <span>mahmoud.fawzy1992.2@gmail.com</span>
                </a>
              </li>
            </ul>

            <div className="contact__socials-wrapper">
              <span className="contact__socials-title">Find me in</span>
              <div className="contact__socials">
                <a
                  href="https://www.linkedin.com/in/mahmoud-fawzy-a84215158/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact__social-link"
                  aria-label="LinkedIn"
                >
                  <FiLinkedin />
                </a>
                <a
                  href="https://github.com/MahmoudFawzy1992"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact__social-link"
                  aria-label="GitHub"
                >
                  <FiGithub />
                </a>
              </div>
            </div>
          </motion.aside>

          {/* ─── Form panel ─── */}
          <motion.div
            className="contact__form-wrapper"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="contact__form"
              noValidate
              aria-label="Contact form"
            >
              {/* Hidden honeypot anti-spam field */}
              <input type="text" name="_honey" style={{ display: 'none' }} tabIndex={-1} aria-hidden="true" />

              <div className="contact__row">
                <div className={`contact__field ${errors.name && touched.name ? 'contact__field--error' : ''}`}>
                  <label htmlFor="contact-name" className="contact__label">Full Name <span aria-hidden="true">*</span></label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="contact__input"
                    placeholder="John Doe"
                    autoComplete="name"
                    required
                    aria-required="true"
                    aria-describedby={errors.name && touched.name ? 'name-error' : undefined}
                  />
                  {errors.name && touched.name && (
                    <span id="name-error" className="contact__error" role="alert">{errors.name}</span>
                  )}
                </div>

                <div className={`contact__field ${errors.email && touched.email ? 'contact__field--error' : ''}`}>
                  <label htmlFor="contact-email" className="contact__label">Email Address <span aria-hidden="true">*</span></label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="contact__input"
                    placeholder="john@example.com"
                    autoComplete="email"
                    required
                    aria-required="true"
                    aria-describedby={errors.email && touched.email ? 'email-error' : undefined}
                  />
                  {errors.email && touched.email && (
                    <span id="email-error" className="contact__error" role="alert">{errors.email}</span>
                  )}
                </div>
              </div>

              <div className={`contact__field ${errors.subject && touched.subject ? 'contact__field--error' : ''}`}>
                <label htmlFor="contact-subject" className="contact__label">Subject <span aria-hidden="true">*</span></label>
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="contact__input"
                  placeholder="Project inquiry..."
                  required
                  aria-required="true"
                  aria-describedby={errors.subject && touched.subject ? 'subject-error' : undefined}
                />
                {errors.subject && touched.subject && (
                  <span id="subject-error" className="contact__error" role="alert">{errors.subject}</span>
                )}
              </div>

              <div className={`contact__field ${errors.message && touched.message ? 'contact__field--error' : ''}`}>
                <label htmlFor="contact-message" className="contact__label">Message <span aria-hidden="true">*</span></label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="contact__input contact__textarea"
                  placeholder="Tell me about your project..."
                  rows={6}
                  required
                  aria-required="true"
                  aria-describedby={errors.message && touched.message ? 'message-error' : undefined}
                />
                {errors.message && touched.message && (
                  <span id="message-error" className="contact__error" role="alert">{errors.message}</span>
                )}
              </div>

              {/* Status messages */}
              {status === 'success' && (
                <div className="contact__status contact__status--success" role="status" aria-live="polite">
                  <FiCheck /> Message sent successfully! I&rsquo;ll get back to you soon.
                </div>
              )}
              {status === 'error' && (
                <div className="contact__status contact__status--error" role="alert" aria-live="assertive">
                  <FiAlertCircle /> Something went wrong. Please try again or email me directly.
                </div>
              )}

              <button
                type="submit"
                className="contact__submit"
                disabled={status === 'loading'}
                aria-disabled={status === 'loading'}
              >
                {status === 'loading' ? (
                  <><span className="contact__spinner" aria-hidden="true" /> Sending…</>
                ) : (
                  <><FiSend aria-hidden="true" /> Send Message</>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
