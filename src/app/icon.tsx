import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/**
 * The browser tab icon: the first letter of the brand on its colour.
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 14,
          background: "#4f46e5",
          color: "white",
          fontSize: 40,
          fontWeight: 700,
        }}
      >
        {site.name.charAt(0)}
      </div>
    ),
    size,
  );
}
