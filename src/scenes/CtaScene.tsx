import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { brand } from "../lib/brand";
import { montserrat, inter } from "../lib/fonts";

export const CtaScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const mainScale = spring({ frame, fps, config: { damping: 12 } });

  const ctaOpacity = interpolate(frame, [25, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const ctaY = interpolate(frame, [25, 45], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const urlOpacity = interpolate(frame, [50, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const pulseScale = 1 + Math.sin(frame * 0.1) * 0.03;

  const glowOpacity = interpolate(
    Math.sin(frame * 0.08),
    [-1, 1],
    [0.3, 0.8],
  );

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 50%, ${brand.colors.secondary} 0%, ${brand.colors.primary} 80%)`,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${brand.colors.accent}20 0%, transparent 70%)`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          opacity: glowOpacity,
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transform: `scale(${mainScale})`,
        }}
      >
        {/* Free trial badge */}
        <div
          style={{
            fontFamily: montserrat,
            fontSize: 24,
            fontWeight: 700,
            color: brand.colors.primary,
            backgroundColor: brand.colors.accent,
            padding: "12px 35px",
            borderRadius: 50,
            textTransform: "uppercase",
            letterSpacing: "3px",
            marginBottom: 40,
          }}
        >
          7 dias grátis
        </div>

        <div
          style={{
            fontFamily: montserrat,
            fontSize: 58,
            fontWeight: 800,
            color: brand.colors.white,
            textAlign: "center",
            lineHeight: 1.2,
            maxWidth: 800,
          }}
        >
          Teste{" "}
          <span style={{ color: brand.colors.accent }}>agora</span>
          {"\n"}sem compromisso
        </div>
      </div>

      {/* CTA Button */}
      <div
        style={{
          marginTop: 60,
          opacity: ctaOpacity,
          transform: `translateY(${ctaY}px) scale(${pulseScale})`,
        }}
      >
        <div
          style={{
            fontFamily: montserrat,
            fontSize: 30,
            fontWeight: 700,
            color: brand.colors.white,
            backgroundColor: brand.colors.accent,
            padding: "22px 60px",
            borderRadius: 16,
            textTransform: "uppercase",
            letterSpacing: "2px",
            boxShadow: `0 8px 40px ${brand.colors.accent}40`,
          }}
        >
          Começar agora →
        </div>
      </div>

      {/* URL */}
      <div
        style={{
          marginTop: 50,
          opacity: urlOpacity,
        }}
      >
        <div
          style={{
            fontFamily: inter,
            fontSize: 28,
            fontWeight: 500,
            color: brand.colors.gray,
            letterSpacing: "1px",
          }}
        >
          managerfashion.com
        </div>
      </div>
    </AbsoluteFill>
  );
};
