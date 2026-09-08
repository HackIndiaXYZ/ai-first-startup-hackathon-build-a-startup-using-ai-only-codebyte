import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "PitchPilot — AI Co-founder for Solo Founders";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          color: "#ededed",
          position: "relative",
        }}
      >
        {/* Glow backdrop */}
        <div
          style={{
            position: "absolute",
            width: "600px",
            height: "300px",
            borderRadius: "50%",
            background: "rgba(0, 112, 243, 0.18)",
          }}
        />

        {/* Brand mark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "68px",
            height: "68px",
            borderRadius: "14px",
            background: "#ffffff",
            color: "#000000",
            fontSize: "34px",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          ▲
        </div>

        <div
          style={{
            fontSize: "64px",
            fontWeight: "bold",
            letterSpacing: "-0.04em",
          }}
        >
          PitchPilot
        </div>

        <div
          style={{
            fontSize: "24px",
            color: "#a1a1aa",
            marginTop: "12px",
            maxWidth: "750px",
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          An AI co-founder for solo founders. Turn raw ideas into startups in 90 seconds.
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginTop: "32px",
            padding: "8px 20px",
            borderRadius: "9999px",
            border: "1px solid #27272a",
            background: "#18181b",
            fontSize: "14px",
            color: "#0070f3",
            fontFamily: "monospace",
          }}
        >
          Built by AI, to help you build with AI
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
