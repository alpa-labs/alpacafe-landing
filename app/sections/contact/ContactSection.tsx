'use client';

import {
  FacebookIcon,
  InstagramIcon,
  MapsIcon,
  TiktokIcon,
} from '@/components/icons';
import { Button } from '@/components/ui';
import { ContactForm } from './ContactForm';
import { siteSections } from '@/lib/constants';
import { siteConfig } from '@/lib/site.config';
import { Heading, Section, Subtitle } from '@/components';
import { contactData } from './contact.data';
import { MotionDiv } from '@/components/layout/MotionDiv';

export function ContactSection() {
  return (
    <Section id={siteSections.contact} aria-labelledby="contact-title">
      <div className="mx-auto max-w-[1120px] px-6">
        <MotionDiv>
          <Subtitle id="contact-label">{contactData.subtitle}</Subtitle>
          <Heading as="h2" id="contact-title">
            {contactData.title}
          </Heading>
          <p className="mb-10 max-w-[560px] text-muted-foreground">
            {contactData.intro}
          </p>
        </MotionDiv>
        <div className="grid gap-10 md:grid-cols-2 md:gap-12">
          <MotionDiv className="flex flex-col gap-8">
            <div>
              <Heading as="h3">{contactData.addressLabel}</Heading>
              <address className="not-italic text-muted-foreground">
                <p className="leading-relaxed whitespace-pre-line mb-2">
                  {contactData.addressLines}
                </p>
                <Button
                  href={siteConfig.maps}
                  icon={MapsIcon}
                  aria-label="Maps"
                  variant="outline"
                >
                  {contactData.mapsButtonText}
                </Button>
              </address>
            </div>
            <div>
              <Heading as="h3">{contactData.hoursLabel}</Heading>
              <p className="leading-relaxed text-muted-foreground whitespace-pre-line">
                {contactData.hoursText}
              </p>
            </div>
            <div>
              <Heading as="h3" className="mb-3">
                {contactData.socialLabel}
              </Heading>
              <div className="flex gap-2">
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
          </MotionDiv>
          {/* Right: Form */}
          <MotionDiv>
            <ContactForm />
          </MotionDiv>
        </div>
      </div>
    </Section>
  );
}
