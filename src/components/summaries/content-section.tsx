import { parseEmojiPoint, parsePoint } from "@/utils/summary-helpers";
import { MotionDiv } from "../common/motion-wrapper";
import { containerVaraints, itemVariants } from "@/utils/contanst";

const EmojiPoint = ({ point }: { point: string }) => {
  const parsed = parseEmojiPoint(point);
  if (!parsed) return null;

  return (
    <MotionDiv
      variants={itemVariants}
      className="group relative p-4 rounded-2xl border border-gray-500/10 bg-gray-100 hover:shadow-lg transition-all"
    >
      <div className="relative flex gap-2">
        {/* Emoji is in a separate div */}
        <div className="text-2xl">{parsed.emoji}</div>
        {/* Text appears below emoji */}
        <div className="flex-1">
          <p className="text-lg lg:text-xl text-muted-foreground/90 leading-relaxed">
            {parsed.text}
          </p>
        </div>
      </div>
    </MotionDiv>
  );
};

const RegularPoint = ({ point }: { point: string }) => {
  return (
    <MotionDiv
      variants={itemVariants}
      className="group relative p-4 rounded-2xl border border-gray-500/10 bg-gray-100 hover:shadow-lg transition-all"
    >
      <p className="text-lg lg:text-xl text-muted-foreground/90 leading-relaxed">
        {point}
      </p>
    </MotionDiv>
  );
};

export default function ContentSection({
  title,
  points,
}: {
  title: string;
  points: string[];
}) {
  return (
    <MotionDiv
      variants={containerVaraints}
      key={points.join("")}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-4"
    >
      {points.map((point, index) => {
        const { isMainPoint, hasEmoji, isEmpty } = parsePoint(point);
        if (isEmpty) return null;

        return hasEmoji || isMainPoint ? (
          <EmojiPoint key={`point-${index}`} point={point} />
        ) : (
          <RegularPoint key={`point-${index}`} point={point} />
        );
      })}
    </MotionDiv>
  );
}
