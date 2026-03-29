import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { brand } from "../lib/brand";
import { montserrat } from "../lib/fonts";

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame, fps, config: { damping: 12, stiffness: 80 } });

  const lineWidth = interpolate(frame, [20, 50], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const taglineOpacity = interpolate(frame, [40, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const taglineY = interpolate(frame, [40, 60], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const shimmerX = interpolate(frame, [0, 90], [-200, 600], {
    extrapolateRight: "clamp",
  });

  const particleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 40%, ${brand.colors.secondary} 0%, ${brand.colors.primary} 70%)`,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Decorative particles */}
      {[...Array(12)].map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const radius = 300 + Math.sin(frame * 0.03 + i) * 50;
        const x = Math.cos(angle + frame * 0.008) * radius;
        const y = Math.sin(angle + frame * 0.008) * radius;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              width: 4,
              height: 4,
              borderRadius: "50%",
              backgroundColor: brand.colors.accent,
              opacity: particleOpacity * (0.3 + Math.sin(frame * 0.05 + i) * 0.3),
            }}
          />
        );
      })}

      {/* Main logo text */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transform: `scale(${logoScale})`,
        }}
      >
        <div
          style={{
            fontFamily: montserrat,
            fontSize: 90,
            fontWeight: 900,
            color: brand.colors.white,
            letterSpacing: "-2px",
            textTransform: "uppercase",
            position: "relative",
            lineHeight: 1,
          }}
        >
          Manager
          {/* Shimmer effect */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: shimmerX,
              width: 100,
              height: "100%",
              background: `linear-gradient(90deg, transparent, ${brand.colors.accent}40, transparent)`,
              pointerEvents: "none",
            }}
          />
        </div>
        <div
          style={{
            fontFamily: montserrat,
            fontSize: 90,
            fontWeight: 900,
            color: brand.colors.accent,
            letterSpacing: "12px",
            textTransform: "uppercase",
            lineHeight: 1,
            marginTop: 5,
          }}
        >
          Fashion
        </div>

        {/* Decorative line */}
        <div
          style={{
            width: `${lineWidth}%`,
            maxWidth: 400,
            height: 3,
            backgroundColor: brand.colors.accent,
            marginTop: 30,
            borderRadius: 2,
          }}
        />

        {/* Tagline */}
        <div
          style={{
            fontFamily: montserrat,
            fontSize: 28,
            fontWeight: 600,
            color: brand.colors.gray,
            marginTop: 25,
            opacity: taglineOpacity,
            transform: `translateY(${taglineY}px)`,
            letterSpacing: "3px",
            textTransform: "uppercase",
          }}
        >
          {brand.slogan}
        </div>
      </div>
    </AbsoluteFill>
  );
};
