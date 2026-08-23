"use client";

import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import type { FormEvent, ReactNode } from "react";

import { siteContent } from "@/lib/site-content";

const OTHER_SERVICE_ID = "other";

const CONTACT_SERVICES = [
  { id: "branding-site", title: "אתר תדמית" },
  { id: "landing-page", title: "דף נחיתה" },
  { id: "online-store", title: "חנות אונליין" },
  { id: "consultation", title: "שיחת התאמה" },
] as const;

type FormFields = {
  name: string;
  email: string;
  phone: string;
  serviceId: string;
  serviceOtherDetail: string;
};

const initialFields: FormFields = {
  name: "",
  email: "",
  phone: "",
  serviceId: "",
  serviceOtherDetail: "",
};

function getServiceTitle(serviceId: string, serviceOtherDetail: string): string {
  if (serviceId === OTHER_SERVICE_ID) {
    const detail = serviceOtherDetail.trim();
    return detail ? `אחר — ${detail}` : "אחר";
  }

  return (
    CONTACT_SERVICES.find((service) => service.id === serviceId)?.title ??
    serviceId
  );
}

function WhatsAppIcon({ className = "" }: { className?: string }): ReactNode {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function ContactForm({ compact = false }: { compact?: boolean }): ReactNode {
  const [fields, setFields] = useState<FormFields>(initialFields);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setError(null);

    const name = fields.name.trim();
    const email = fields.email.trim();
    const phone = fields.phone.trim();
    const serviceId = fields.serviceId.trim();
    const serviceOtherDetail = fields.serviceOtherDetail.trim();

    if (!name || !email || !phone || !serviceId) {
      setError("נא למלא את כל השדות");
      return;
    }

    if (serviceId === OTHER_SERVICE_ID && !serviceOtherDetail) {
      setError("נא לפרט את השירות שמעניין אתכם");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(siteContent.formspree.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          service: getServiceTitle(serviceId, serviceOtherDetail),
          serviceId,
          serviceOtherDetail:
            serviceId === OTHER_SERVICE_ID ? serviceOtherDetail : undefined,
        }),
      });

      if (!response.ok) {
        throw new Error("Formspree request failed");
      }

      setFields(initialFields);
      setIsSubmitted(true);
    } catch {
      setError("לא הצלחנו לשלוח את הטופס. נסו שוב או שלחו הודעה בוואטסאפ.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField =
    (key: keyof FormFields) =>
    (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ): void => {
      setFields((current) => ({ ...current, [key]: event.target.value }));
      if (error) setError(null);
    };

  const inputClassName = compact
    ? "focus-ring w-full rounded-xl border border-[#D7E2EA]/20 bg-[#D7E2EA]/5 px-4 py-2.5 text-sm text-[#D7E2EA] placeholder:text-[#D7E2EA]/35 outline-none transition-colors focus:border-[#D7E2EA]/45 lg:rounded-2xl lg:px-5 lg:py-3 lg:text-base"
    : "focus-ring w-full rounded-2xl border border-[#D7E2EA]/20 bg-[#D7E2EA]/5 px-5 py-3.5 text-base text-[#D7E2EA] placeholder:text-[#D7E2EA]/35 outline-none transition-colors focus:border-[#D7E2EA]/45";

  const selectClassName = `${inputClassName} cursor-pointer appearance-none bg-[length:1rem] bg-[position:left_1rem_center] bg-no-repeat pr-5 pl-10 [background-image:url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%2216%22%20height=%2216%22%20viewBox=%220%200%2024%2024%22%20fill=%22none%22%20stroke=%22%23D7E2EA%22%20stroke-width=%222%22%20stroke-linecap=%22round%22%20stroke-linejoin=%22round%22%3E%3Cpath%20d=%22m6%209%206%206%206-6%22/%3E%3C/svg%3E')]`;

  const ctaButtonClassName = `focus-ring inline-flex flex-1 items-center justify-center gap-2 rounded-full font-medium tracking-widest text-white uppercase outline-2 outline-offset-[-3px] outline-white transition-transform hover:scale-[1.03] ${
    compact
      ? "px-6 py-2.5 text-[11px] sm:px-7 sm:py-3 sm:text-xs lg:px-8 lg:py-3 lg:text-sm"
      : "px-8 py-3 text-xs sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base"
  }`;

  return (
    <form
      onSubmit={handleSubmit}
      className={`w-full text-start ${compact ? "mx-0 mt-0 max-w-none" : "mx-auto mt-12 max-w-xl"}`}
      noValidate
    >
      {isSubmitted ? (
        <div
          className={`rounded-2xl border border-[#D7E2EA]/20 bg-[#D7E2EA]/5 text-center ${
            compact ? "px-4 py-8 lg:px-6 lg:py-10" : "px-6 py-10"
          }`}
          role="status"
        >
          <p className="text-lg font-medium text-[#D7E2EA]">תודה, קיבלנו את הפנייה.</p>
          <p className="mt-2 text-sm leading-relaxed text-[#D7E2EA]/65">
            נחזור אליכם בהקדם. לפניות דחופות — אפשר גם בוואטסאפ.
          </p>
        </div>
      ) : (
        <>
      <div className={`flex flex-col ${compact ? "gap-3 lg:gap-4" : "gap-5"}`}>
        <label className={`flex flex-col ${compact ? "gap-1.5 lg:gap-2" : "gap-2"}`}>
          <span
            className={`font-medium tracking-wide text-[#D7E2EA]/70 ${compact ? "text-xs lg:text-sm" : "text-sm"}`}
          >
            שם
          </span>
          <input
            type="text"
            name="name"
            autoComplete="name"
            value={fields.name}
            onChange={updateField("name")}
            placeholder="השם שלך"
            className={inputClassName}
          />
        </label>

        <label className={`flex flex-col ${compact ? "gap-1.5 lg:gap-2" : "gap-2"}`}>
          <span
            className={`font-medium tracking-wide text-[#D7E2EA]/70 ${compact ? "text-xs lg:text-sm" : "text-sm"}`}
          >
            מייל
          </span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            value={fields.email}
            onChange={updateField("email")}
            placeholder="name@example.com"
            className={inputClassName}
            dir="ltr"
          />
        </label>

        <label className={`flex flex-col ${compact ? "gap-1.5 lg:gap-2" : "gap-2"}`}>
          <span
            className={`font-medium tracking-wide text-[#D7E2EA]/70 ${compact ? "text-xs lg:text-sm" : "text-sm"}`}
          >
            טלפון
          </span>
          <input
            type="tel"
            name="phone"
            autoComplete="tel"
            value={fields.phone}
            onChange={updateField("phone")}
            placeholder="052-000-0000"
            className={inputClassName}
            dir="ltr"
          />
        </label>

        <label className={`flex flex-col ${compact ? "gap-1.5 lg:gap-2" : "gap-2"}`}>
          <span
            className={`font-medium tracking-wide text-[#D7E2EA]/70 ${compact ? "text-xs lg:text-sm" : "text-sm"}`}
          >
            איזה שירות מעניין אתכם?
          </span>
          <select
            name="service"
            value={fields.serviceId}
            onChange={(event) => {
              const serviceId = event.target.value;
              setFields((current) => ({
                ...current,
                serviceId,
                serviceOtherDetail:
                  serviceId === OTHER_SERVICE_ID ? current.serviceOtherDetail : "",
              }));
              if (error) setError(null);
            }}
            className={`${selectClassName} ${fields.serviceId ? "text-[#D7E2EA]" : "text-[#D7E2EA]/35"}`}
            required
          >
            <option value="" disabled>
              בחרו שירות מהרשימה
            </option>
            {CONTACT_SERVICES.map((service) => (
              <option key={service.id} value={service.id} className="text-black">
                {service.title}
              </option>
            ))}
            <option value={OTHER_SERVICE_ID} className="text-black">
              אחר
            </option>
          </select>
        </label>

        {fields.serviceId === OTHER_SERVICE_ID ? (
          <label className={`flex flex-col ${compact ? "gap-1.5 lg:gap-2" : "gap-2"}`}>
            <span
              className={`font-medium tracking-wide text-[#D7E2EA]/70 ${compact ? "text-xs lg:text-sm" : "text-sm"}`}
            >
              מה אתם מחפשים?
            </span>
            <input
              type="text"
              name="serviceOtherDetail"
              value={fields.serviceOtherDetail}
              onChange={updateField("serviceOtherDetail")}
              placeholder="ספרו בקצרה על השירות שאתם צריכים"
              className={inputClassName}
            />
          </label>
        ) : null}
      </div>

      {error ? (
        <p role="alert" className="mt-4 text-center text-sm text-[#ff8a8a]">
          {error}
        </p>
      ) : null}

      <div
        className={`grid grid-cols-2 gap-3 ${compact ? "mt-4 lg:mt-6" : "mt-8"}`}
      >
        <button
          type="submit"
          disabled={isSubmitting}
          className={`contact-gradient ${ctaButtonClassName} disabled:cursor-not-allowed disabled:opacity-70`}
        >
          {isSubmitting ? "שולח..." : "לשיחת התאמה"}
          <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden="true" />
        </button>
        <a
          href={siteContent.whatsapp.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`contact-gradient-whatsapp ${ctaButtonClassName}`}
          aria-label="שלחו הודעה בוואטסאפ"
        >
          וואטסאפ
          <WhatsAppIcon className="h-4 w-4 shrink-0" />
        </a>
      </div>
        </>
      )}
    </form>
  );
}
