import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          gap: 5,
          background: "#0B1220",
          borderRadius: 14,
          paddingBottom: 13,
        }}
      >
        <div style={{ width: 9, height: 15, background: "#7C8CE8", borderRadius: 3 }} />
        <div style={{ width: 9, height: 23, background: "#7C8CE8", borderRadius: 3 }} />
        <div style={{ width: 9, height: 31, background: "#FBFBF9", borderRadius: 3 }} />
      </div>
    ),
    { ...size }
  );
}
