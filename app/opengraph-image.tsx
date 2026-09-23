import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Alexander Markelov — Python Backend Developer";

/**
 * Latin only on purpose: the default embedded font has no Cyrillic, and
 * a share card has to render on servers we don't control.
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
          background: "#07090c",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", color: "#79838f", fontSize: 24 }}>
          <span style={{ color: "#d2f94b" }}>OPEN TO OFFERS</span>
          <span>SAINT PETERSBURG</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ color: "#e8ecef", fontSize: 104, fontWeight: 800, lineHeight: 1, letterSpacing: -4 }}>
            ALEXANDER
          </span>
          <span style={{ color: "#e8ecef", fontSize: 104, fontWeight: 800, lineHeight: 1, letterSpacing: -4 }}>
            MARKELOV
          </span>
          <span style={{ color: "#79838f", fontSize: 30, marginTop: 24 }}>
            Python Backend Developer · FastAPI · RabbitMQ · PostgreSQL · Redis
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 28, fontSize: 34 }}>
          <span style={{ color: "#ffa94d" }}>800 ms</span>
          <span style={{ color: "#2b323c" }}>&#8594;</span>
          <span style={{ color: "#d2f94b" }}>450 ms</span>
          <span style={{ color: "#79838f", fontSize: 26, marginLeft: 16 }}>
            inter-service latency, 5 microservices
          </span>
        </div>
      </div>
    ),
    size,
  );
}
