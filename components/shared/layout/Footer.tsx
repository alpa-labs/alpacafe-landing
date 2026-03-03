'use client';

import {
  FacebookIcon,
  InstagramIcon,
  TiktokIcon,
} from '@/components/shared/icons';
import { siteImages, siteNav } from '@/lib/constants';
import { siteConfig } from '@/lib/site.config';
import { Button, Heading } from '@/components/shared';
import Image from 'next/image';
import { contactData } from '@/components/features/contact/contact.data';

export function Footer() {
  const year = new Date().getFullYear();
  const addressLines = contactData.addressLines.split('\n');
  const hoursLines = contactData.hoursText.split('\n');

  return (
    <footer className="w-full py-12 bg-muted/40" role="contentinfo">
      <div className="mx-auto max-w-[1120px] px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Image
              src={siteImages.logo.wordmark}
              alt={siteConfig.name}
              height={40}
              width={120}
              className="object-contain"
              style={{ width: 'auto' }}
            />
            <p className="mt-2 text-sm leading-relaxed">
              {addressLines.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < addressLines.length - 1 && <br />}
                </span>
              ))}
            </p>
            <div className="mt-4 flex gap-2">
              <Button
                href={siteConfig.social.instagram}
                icon={InstagramIcon}
                aria-label="Instagram"
                size="icon"
              />
              <Button
                href={siteConfig.social.facebook}
                icon={FacebookIcon}
                aria-label="Facebook"
                size="icon"
              />
              <Button
                href={siteConfig.social.tiktok}
                icon={TiktokIcon}
                aria-label="TikTok"
                size="icon"
              />
            </div>
          </div>

          <div>
            <Heading as="h3" className="mb-0">
              {contactData.hoursLabel}
            </Heading>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {hoursLines.map((line, i) => (
                <span key={i}>
                  {line ? (
                    /^(Lunes|Martes|Miércoles|Jueves|Viernes|Sábado|Domingo)/.test(
                      line,
                    ) ? (
                      <span className="font-semibold">{line}</span>
                    ) : (
                      line
                    )
                  ) : null}
                  {i < hoursLines.length - 1 && <br />}
                </span>
              ))}
            </p>
          </div>

          <div>
            <Heading as="h3" className="mb-0">
              Enlaces
            </Heading>
            <ul className="mt-3 space-y-2">
              {siteNav.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <p className="text-left text-muted-foreground">
            © {year} <b>{siteConfig.nameRegistered}</b>. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
