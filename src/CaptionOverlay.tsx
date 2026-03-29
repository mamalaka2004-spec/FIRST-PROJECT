import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { brand } from "./lib/brand";
import { montserrat } from "./lib/fonts";
import { captions } from "./lib/captions";

export const CaptionOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const currentCaption = captions.find(
    (c) => frame >= c.startFrame && frame <= c.endFrame,
  );

  if (!currentCaption) return null;

  const localFrame = frame - currentCaption.startFrame;
  const duration = currentCaption.endFrame - currentCaption.startFrame;

  const enterScale = spring({
    frame: localFrame,
    fps,
    config: { damping: 15, stiffness: 120 },
  });

  const exitOpacity = interpolate(
    localFrame,
    [duration - 5, duration],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 180,
      }}
    >
      <div
        style={{
          transform: `scale(${enterScale})`,
          opacity: exitOpacity,
        }}
      >
        <div
          style={{
            fontFamily: montserrat,
            fontSize: 42,
            fontWeight: 800,
            color: brand.colors.white,
            backgroundColor: `${brand.colors.primary}CC`,
            padding: "14px 35px",
            borderRadius: 12,
            textAlign: "center",
            border: `2px solid ${brand.colors.accent}40`,
            backdropFilter: "blur(10px)",
            textTransform: "uppercase",
            letterSpacing: "2px",
          }}
        >
          {currentCaption.text}
        </div>
      </div>
    </AbsoluteFill>
  );
};
