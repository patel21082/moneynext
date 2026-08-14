import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0B1220",
          color: "#FBFBF9",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 28,
            fontWeight: 600,
            color: "#7C8CE8",
          }}
        >
          MoneyNext
        </div>
        <div style={{ display: "flex", fontSize: 58, fontWeight: 700, marginTop: 28, lineHeight: 1.15 }}>
          Know what your money
        </div>
        <div style={{ display: "flex", fontSize: 58, fontWeight: 700, lineHeight: 1.15 }}>
          should do next.
        </div>
        <div style={{ display: "flex", fontSize: 26, marginTop: 28, color: "#9AA3B8" }}>
          Free AI financial planner — no signup, nothing stored.
        </div>
      </div>
    ),
    { ...size }
  );
}
