import { Composition } from "remotion";
import { MyComposition } from "./Composition";

// Total: 160 + 140 + 130 + 155 - (3 * 15 transitions) = 540 frames
// At 30fps = 18 seconds — perfect for social media

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ManagerFashionAd"
        component={MyComposition}
        durationInFrames={540}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
