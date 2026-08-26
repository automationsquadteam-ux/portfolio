import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-background-deep">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-3 px-6 py-8 text-[13px] text-subtle sm:flex-row sm:items-center sm:justify-between md:px-8 lg:px-10">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <a
          href={`mailto:${site.email}`}
          className="font-mono transition-colors duration-200 hover:text-foreground"
        >
          {site.email}
        </a>
      </div>
    </footer>
  );
}
