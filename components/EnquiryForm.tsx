"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { SITE_EMAIL } from "@/lib/site";

const SERVICE_OPTIONS = [
  { value: "Website & Web App Development", label: "Website & web app development" },
  { value: "Linux Server Setup & VPS Hardening", label: "Linux server setup & VPS hardening" },
  { value: "Domain Registration & DNS Guidance", label: "Domain registration & DNS guidance" },
  { value: "Business Automation & Scripting", label: "Business automation & scripting" },
  { value: "Ongoing Technical Maintenance", label: "Ongoing technical maintenance" },
  { value: "General Technical Consultation", label: "General technical consultation" },
];

const TIMELINE_OPTIONS = [
  { value: "Flexible / Exploring", label: "Flexible / exploring" },
  { value: "Within 1 month", label: "Within 1 month" },
  { value: "1 to 3 months", label: "1 to 3 months" },
  { value: "Ongoing Maintenance", label: "Ongoing monthly maintenance" },
];

type EnquiryData = {
  name: string;
  email: string;
  org: string;
  service: string;
  timeline: string;
  details: string;
};

type FormStatus = {
  tone: "success" | "error";
  content: ReactNode;
};

function formatEnquiryText(data: EnquiryData): string {
  return [
    "==========================================",
    "PROJECT ENQUIRY FOR YUGYA (hello@yugya.com)",
    "==========================================",
    `Full Name:    ${data.name}`,
    `Email:        ${data.email}`,
    `Organization: ${data.org || "Not specified"}`,
    `Service:      ${data.service}`,
    `Timeline:     ${data.timeline || "Flexible"}`,
    "------------------------------------------",
    "PROJECT REQUIREMENTS & DESCRIPTION:",
    data.details,
    "==========================================",
  ].join("\n");
}

export default function EnquiryForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const detailsRef = useRef<HTMLTextAreaElement>(null);
  const serviceRef = useRef<HTMLSelectElement>(null);

  // Only the description is stateful because the character counter reads it.
  const [details, setDetails] = useState("");
  const [status, setStatus] = useState<FormStatus | null>(null);

  // Preselect a service from links such as /contact/?service=vps. This only
  // touches the DOM, so the select stays uncontrolled and no render is forced.
  useEffect(() => {
    const select = serviceRef.current;
    const serviceParam = new URLSearchParams(window.location.search).get("service");
    if (!select || !serviceParam) return;

    const match = Array.from(select.options).find((option) =>
      option.value.toLowerCase().includes(serviceParam.toLowerCase())
    );
    if (match) select.value = match.value;
  }, []);

  const detailLength = details.trim().length;

  const readForm = (): EnquiryData => {
    const data = formRef.current ? new FormData(formRef.current) : null;
    const value = (key: string) => String(data?.get(key) ?? "").trim();

    return {
      name: value("name"),
      email: value("email"),
      org: value("organization"),
      service: value("service") || "Not selected",
      timeline: value("timeline") || "Not specified",
      details: value("details"),
    };
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!event.currentTarget.reportValidity()) return;

    const data = readForm();

    if (data.details.length < 25) {
      setStatus({
        tone: "error",
        content:
          "Please provide a few more sentences describing your requirements so we can understand your project scope.",
      });
      detailsRef.current?.focus();
      return;
    }

    const subject = encodeURIComponent(`Project Enquiry: ${data.service} — ${data.name}`);
    const body = encodeURIComponent(formatEnquiryText(data));
    const mailtoUrl = `mailto:${SITE_EMAIL}?subject=${subject}&body=${body}`;

    setStatus({
      tone: "success",
      content: (
        <>
          <strong>Email draft opened.</strong> This form does not submit to a remote server. Your
          email application has opened with your details prepared.
          <br />
          <strong>
            Please review and click Send in your email application to deliver it to{" "}
            <code>{SITE_EMAIL}</code>.
          </strong>
          <br />
          If your email application did not open automatically, click{" "}
          <a href={mailtoUrl}>this direct email link</a> or use the{" "}
          <strong>Copy formatted enquiry</strong> button to paste your message into webmail.
        </>
      ),
    });

    window.location.href = mailtoUrl;
  };

  const handleCopy = async () => {
    const data = readForm();

    if (!data.name || !data.email || !data.details) {
      setStatus({
        tone: "error",
        content:
          "Please complete the name, email, and project description fields before copying.",
      });
      return;
    }

    const formatted = formatEnquiryText(data);

    try {
      await navigator.clipboard.writeText(formatted);
      setStatus({
        tone: "success",
        content: (
          <>
            <strong>Enquiry copied to clipboard.</strong> Paste it directly into your email
            application and send it to <code>{SITE_EMAIL}</code>.
          </>
        ),
      });
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = formatted;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();

      try {
        document.execCommand("copy");
        setStatus({
          tone: "success",
          content: (
            <>
              <strong>Enquiry copied to clipboard.</strong> Paste it directly into your email
              program and send to <code>{SITE_EMAIL}</code>.
            </>
          ),
        });
      } catch {
        setStatus({
          tone: "error",
          content: "Unable to copy automatically. Please write directly to hello@yugya.com.",
        });
      }

      document.body.removeChild(textarea);
    }
  };

  return (
    <form id="enquiryForm" ref={formRef} noValidate onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="clientName">
            Full name <span className="required">*</span>
          </label>
          <input
            type="text"
            id="clientName"
            name="name"
            autoComplete="name"
            placeholder="Your name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="clientEmail">
            Email address <span className="required">*</span>
          </label>
          <input
            type="email"
            id="clientEmail"
            name="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="clientOrg">
            Organization / school <span className="hint">(optional)</span>
          </label>
          <input
            type="text"
            id="clientOrg"
            name="organization"
            autoComplete="organization"
            placeholder="e.g. organization or school name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="timelineGoal">
            Timeline target <span className="hint">(optional)</span>
          </label>
          <select id="timelineGoal" name="timeline" defaultValue="Flexible / Exploring">
            {TIMELINE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="serviceCategory">
          Service interested in <span className="required">*</span>
        </label>
        <select
          ref={serviceRef}
          id="serviceCategory"
          name="service"
          required
          defaultValue=""
        >
          <option value="" disabled>
            Select a service scope…
          </option>
          {SERVICE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="projectDetails">
          Project requirements &amp; description <span className="required">*</span>
        </label>
        <textarea
          id="projectDetails"
          name="details"
          ref={detailsRef}
          placeholder="Describe what you want to build, any existing systems in place, and your target requirements…"
          required
          value={details}
          onChange={(event) => setDetails(event.target.value)}
        />
        <div className="char-counter">
          <span
            id="charCount"
            style={{
              color: detailLength >= 30 ? "var(--color-accent)" : "var(--color-muted)",
            }}
          >
            {detailLength} / 30 characters (recommended min: 30)
          </span>
          <span>Specific descriptions help us review scope faster</span>
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" id="submitFormBtn">
          Open in email client <span className="arrow" aria-hidden="true">↗</span>
        </button>
        <button type="button" className="btn btn-secondary" id="copyEnquiryBtn" onClick={handleCopy}>
          Copy formatted enquiry
        </button>
      </div>

      <div
        className={`form-status${status ? ` ${status.tone} show` : ""}`}
        id="formStatus"
        role="status"
        aria-live="polite"
      >
        {status?.content}
      </div>
    </form>
  );
}
