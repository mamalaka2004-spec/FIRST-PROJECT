import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { brand } from "../lib/brand";
import { montserrat, inter } from "../lib/fonts";

const features = [
  { icon: "\ud83d\udccb", title: "Booking", desc: "Gerencie jobs e agendamentos" },
  { icon: "\ud83c\udfac", title: "Casting", desc: "Castings e callbacks intuitivos" },
  { icon: "\ud83d\udc65", title: "CRM", desc: "Relacionamento com clientes" },
  { icon: "\ud83c\udf10", title: "Website", desc: "Site moderno e automático" },
];

export const FeaturesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleY = interpolate(frame, [0, 15], [-40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${brand.colors.primary} 0%, ${brand.colors.secondary} 100%)`,
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
        overflow: "hidden",
      }}
    >
      {/* Background accent circle */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          border: `1px solid ${brand.colors.accent}15`,
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) rotate(${frame * 0.3}deg)`,
        }}
      />

      {/* Title */}
      <div
        style={{
          fontFamily: montserrat,
          fontSize: 52,
          fontWeight: 800,
          color: brand.colors.white,
          textAlign: "center",
          marginBottom: 80,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          lineHeight: 1.2,
        }}
      >
        Tudo que sua{"\n"}
        <span style={{ color: brand.colors.accent }}>agência precisa</span>
      </div>

      {/* Feature cards */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 30,
          width: "100%",
          maxWidth: 800,
        }}
      >
        {features.map((feature, i) => {
          const delay = 15 + i * 12;
          const cardScale = spring({
            frame: frame - delay,
            fps,
            config: { damping: 15, stiffness: 100 },
          });
          const cardOpacity = interpolate(frame, [delay, delay + 10], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 25,
                backgroundColor: `${brand.colors.white}08`,
                borderRadius: 20,
                padding: "28px 35px",
                border: `1px solid ${brand.colors.accent}20`,
                opacity: cardOpacity,
                transform: `scale(${cardScale})`,
              }}
            >
              <div style={{ fontSize: 50 }}>{feature.icon}</div>
              <div>
                <div
                  style={{
                    fontFamily: montserrat,
                    fontSize: 32,
                    fontWeight: 700,
                    color: brand.colors.accent,
                  }}
                >
                  {feature.title}
                </div>
                <div
                  style={{
                    fontFamily: inter,
                    fontSize: 22,
                    fontWeight: 400,
                    color: brand.colors.gray,
                    marginTop: 4,
                  }}
                >
                  {feature.desc}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
