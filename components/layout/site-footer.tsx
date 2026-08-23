import Link from "next/link";
import type { ReactNode } from "react";

import { SERVICES } from "@/lib/services-data";
import { siteContent } from "@/lib/site-content";

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

export function SiteFooter(): ReactNode {
  const { footer, hero, whatsapp, brand } = siteContent;
  const phoneHref = `tel:${whatsapp.phone}`;
  const serviceLinks = SERVICES.slice(0, 3);

  return (
    <footer className="site-footer site-footer--home-finale" role="contentinfo">
      <div className="site-footer__masthead">
        <p className="site-footer__brand site-footer__brand--hero">
          <Link href="/" className="focus-ring">
            {brand}
          </Link>
        </p>
      </div>

      <div className="site-footer__inner">
        <div className="site-footer__col">
          <h2 className="site-footer__col-title">{footer.locationLabel}</h2>
          <div className="site-footer__wa-row">
            <WhatsAppIcon className="h-[1.125rem] w-[1.125rem] shrink-0 text-[#25D366]" />
            <a
              href={whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="site-footer__wa-link focus-ring"
              dir="ltr"
            >
              {footer.phoneDisplay}
            </a>
          </div>
          <p className="site-footer__block">
            <strong>{footer.brandUppercase}</strong>
            <br />
            {footer.tagline}
          </p>
          <p className="site-footer__block">
            <a href={phoneHref} className="focus-ring">
              התקשרו
            </a>
            <span className="site-footer__dot" aria-hidden="true">
              {" "}
              ·{" "}
            </span>
            <a
              href={whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring"
            >
              וואטסאפ
            </a>
          </p>
        </div>

        <div className="site-footer__col">
          <h2 className="site-footer__col-title">באתר</h2>
          <ul className="site-footer__links">
            {footer.siteLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="focus-ring">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="site-footer__col">
          <h2 className="site-footer__col-title">שירותים</h2>
          <ul className="site-footer__stack">
            {serviceLinks.map((service) => (
              <li key={service.id}>
                <Link href="/services" className="focus-ring">
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="site-footer__cta-band">
        <p className="site-footer__cta-title">{footer.ctaHeadline}</p>
        <a
          href={whatsapp.url}
          target="_blank"
          rel="noopener noreferrer"
          className="site-footer__cta focus-ring"
        >
          {hero.primaryCta}
        </a>
      </div>

      <p className="site-footer__legal-links">
        {footer.legalLinks.map((link, index) => (
          <span key={link.label} className="site-footer__legal-item">
            {index > 0 ? (
              <span className="site-footer__legal-sep" aria-hidden="true">
                |
              </span>
            ) : null}
            <Link href={link.href} className="focus-ring">
              {link.label}
            </Link>
          </span>
        ))}
      </p>

      <p className="site-footer__bottom">
        נבנה על ידי <strong>{footer.builtBy}</strong>
      </p>
    </footer>
  );
}
