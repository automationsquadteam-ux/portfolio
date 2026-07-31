import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/lib/site";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const mark = await readFile(join(process.cwd(), "public", "logo-mark.png"));
  const markSrc = `data:image/png;base64,${mark.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          backgroundColor: "#0A0A0A",
          backgroundImage:
            "radial-gradient(900px 420px at 50% -10%, rgba(59,130,246,0.18), rgba(10,10,10,0))",
          color: "#FAFAFA",
        }}
      >
        {/* ── lockup ───────────────────────────────────────────────── */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 84,
              height: 84,
              borderRadius: 20,
              backgroundColor: "#FFFFFF",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={markSrc} alt="" width={64} height={64} />
          </div>
          <div
            style={{
              fontSize: 24,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#FAFAFA",
            }}
          >
            {site.name}
          </div>
        </div>

        {/* ── headline ─────────────────────────────────────────────── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              fontSize: 25,
              letterSpacing: 4.5,
              textTransform: "uppercase",
              color: "#3B82F6",
            }}
          >
            AI Automation · Full-Stack Development
          </div>
          <div
            style={{
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.06,
              letterSpacing: -2.5,
              maxWidth: 960,
            }}
          >
            We Build AI Automations &amp; Modern Web Applications
          </div>
        </div>

        {/* ── footer ───────────────────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #232326",
            paddingTop: 28,
            fontSize: 28,
            color: "#A1A1AA",
          }}
        >
          <div style={{ display: "flex" }}>{site.domain}</div>
          <div style={{ display: "flex", color: "#71717A" }}>{site.email}</div>
        </div>
      </div>
    ),
    size,
  );
}
