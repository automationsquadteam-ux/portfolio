import { Mail } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { buttonClass } from "@/components/ui/button";
import { CopyEmailButton } from "@/components/ui/copy-email-button";
import { gmailComposeUrl, mailtoUrl, site } from "@/lib/site";

export function Contact() {
  return (
    <section
      id="contact"
      className="mx-auto w-full max-w-[1200px] scroll-mt-24 px-6 pb-24 md:px-8 md:pb-32 lg:px-10 lg:pb-40"
    >
      <Reveal>
        <div className="rounded-[32px] border border-line bg-surface px-8 py-14 md:px-14 md:py-20 lg:px-20 lg:py-24">
          <h2 className="max-w-[18ch] text-4xl leading-[1.08] font-semibold tracking-[-0.03em] text-balance md:text-5xl lg:text-[3.5rem]">
            Have a project in mind? Let&apos;s build something together.
          </h2>

          <div className="mt-10 flex flex-wrap items-center gap-3 md:mt-12">
            <a
              href={gmailComposeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClass("primary")}
            >
              <Mail className="size-4" aria-hidden="true" />
              Email
            </a>
            <CopyEmailButton email={site.email} />
          </div>

          <a
            href={mailtoUrl}
            className="mt-6 inline-block font-mono text-[13px] text-subtle transition-colors duration-200 hover:text-foreground"
          >
            {site.email}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
