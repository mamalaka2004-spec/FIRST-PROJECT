import { AbsoluteFill } from "remotion";
import { TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { linearTiming } from "@remotion/transitions";
import { IntroScene } from "./scenes/IntroScene";
import { FeaturesScene } from "./scenes/FeaturesScene";
import { SocialProofScene } from "./scenes/SocialProofScene";
import { CtaScene } from "./scenes/CtaScene";
import { CaptionOverlay } from "./CaptionOverlay";

export const MyComposition: React.FC = () => {
  return (
    <AbsoluteFill>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={160}>
          <IntroScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 15 })}
        />

        <TransitionSeries.Sequence durationInFrames={140}>
          <FeaturesScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 15 })}
        />

        <TransitionSeries.Sequence durationInFrames={130}>
          <SocialProofScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 15 })}
        />

        <TransitionSeries.Sequence durationInFrames={155}>
          <CtaScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      {/* Caption overlay on top of everything */}
      <CaptionOverlay />
    </AbsoluteFill>
  );
};
