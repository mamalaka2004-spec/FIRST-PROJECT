import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { brand } from "../lib/brand";
import { montserrat, inter } from "../lib/fonts";

const stats = [
  { value: "200+", label: "Agências" },
  { value: "30+", label: "Países" },
  { value: "3", label: "Idiomas" },
];

export const SocialProofScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({ frame, fps, config: { damping: 15 } });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 30%, ${brand.colors.accent}15 0%, ${brand.colors.primary} 60%)`,
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
        overflow: "hidden",
      }}
    >
      {/* Animated ring */}
      <div
        style={{
          position: "absolute",
          width: 900,
          height: 900,
          borderRadius: "50%",
          border: `2px solid ${brand.colors.accent}10`,
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) rotate(${frame * 0.5}deg)`,
        }}
      />

      <div
        style={{
          fontFamily: montserrat,
          fontSize: 44,
          fontWeight: 700,
          color: brand.colors.white,
          textAlign: "center",
          marginBottom: 80,
          opacity: titleProgress,
          transform: `translateY(${(1 - titleProgress) * 30}px)`,
        }}
      >
        Confiança{" "}
        <span style={{ color: brand.colors.accent }}>global</span>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 50,
          alignItems: "center",
        }}
      >
        {stats.map((stat, i) => {
          const delay = 10 + i * 15;
          const scale = spring({
            frame: frame - delay,
            fps,
            config: { damping: 10, stiffness: 80 },
          });
          const opacity = interpolate(frame, [delay, delay + 10], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={i}
              style={{
                textAlign: "center",
                opacity,
                transform: `scale(${scale})`,
              }}
            >
              <div
                style={{
                  fontFamily: montserrat,
                  fontSize: 120,
                  fontWeight: 900,
                  color: brand.colors.accent,
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: inter,
                  fontSize: 30,
                  fontWeight: 500,
                  color: brand.colors.gray,
                  marginTop: 8,
                  textTransform: "uppercase",
                  letterSpacing: "4px",
                }}
              >
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
