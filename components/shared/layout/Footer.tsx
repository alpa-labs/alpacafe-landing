'use client';

import {
  FacebookIcon,
  InstagramIcon,
  TiktokIcon,
} from '@/components/shared/icons';
import { IMAGE_URL, NAV, URL } from '@/lib/constants';
import { Button, Heading } from '@/components/shared';
import Image from 'next/image';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-background py-12" role="contentinfo">
      <div className="mx-auto max-w-[1120px] px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Image
              src={IMAGE_URL.LOGO.LOGO_WORDMARK}
              alt="ALPA CAFÉ"
              height={40}
              width={40 * 3}
              className="object-contain"
            />
            <p className="mt-2 text-sm leading-relaxed">
              Ituzaingó 1202, Nueva Córdoba
              <br />
              Córdoba, Argentina
            </p>
            <div className="mt-4 flex gap-2">
              <Button
                href={URL.INSTAGRAM}
                icon={InstagramIcon}
                aria-label="Instagram"
                size="icon"
              />
              <Button
                href={URL.FACEBOOK}
                icon={FacebookIcon}
                aria-label="Facebook"
                size="icon"
              />
              <Button
                href={URL.TIKTOK}
                icon={TiktokIcon}
                aria-label="TikTok"
                size="icon"
              />
            </div>
          </div>

          <div>
            <Heading as="h3" className="mb-0">
              Horarios
            </Heading>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              <span className="font-semibold">Lunes - Viernes</span>
              <br />
              8:00 - 20:30
              <br />
              <br />
              <span className="font-semibold">Sábado - Domingo</span>
              <br />
              16:00 - 20:30
            </p>
          </div>

          <div>
            <Heading as="h3" className="mb-0">
              Enlaces
            </Heading>
            <ul className="mt-3 space-y-2">
              {NAV.map(({ href, label }) => (
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
          <p className="text-left text-sm text-muted-foreground">
            © {year} <b>ALPA CAFÉ®</b>. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
