import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          gap: 14,
          background: "#0B1220",
          paddingBottom: 36,
        }}
      >
        <div style={{ width: 25, height: 42, background: "#7C8CE8", borderRadius: 7 }} />
        <div style={{ width: 25, height: 64, background: "#7C8CE8", borderRadius: 7 }} />
        <div style={{ width: 25, height: 86, background: "#FBFBF9", borderRadius: 7 }} />
      </div>
    ),
    { ...size }
  );
}
