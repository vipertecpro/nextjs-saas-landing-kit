import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const alt = `${site.name}: ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The image shown when the site is shared on social media, generated from
 * the brand name and tagline in src/config/site.ts.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "radial-gradient(circle at 20% 20%, #7c3aed 0%, transparent 45%), radial-gradient(circle at 85% 30%, #0ea5e9 0%, transparent 40%), #0b0a14",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 40, fontWeight: 700 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "white",
              color: "#6d28d9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {site.name.charAt(0)}
          </div>
          {site.name}
        </div>
        <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.1, maxWidth: 950 }}>{site.tagline}</div>
        <div style={{ fontSize: 28, opacity: 0.8 }}>{site.url.replace(/^https?:\/\//, "")}</div>
      </div>
    ),
    size,
  );
}
