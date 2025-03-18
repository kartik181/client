function parsePoint(point: string) {
  const isNumbered = /^\d+\./.test(point);
  const isMainPoint = /^•/.test(point);

  // Corrected emoji regex
  const emojiRegex = /\p{Emoji}/u;
  const hasEmoji = emojiRegex.test(point);
  const isEmpty = !point.trim();

  return { isNumbered, isMainPoint, hasEmoji, isEmpty };
}

function parseEmojiPoint(content: string) {
  // Remove leading bullet points or numbers
  const cleanContent = content.replace(/^[•\d-]+\s*/, "").trim();

  // Match emoji at the start
  const matches = cleanContent.match(/^(\p{Emoji}+)\s*(.*)$/u);
  if (!matches) return null;

  const [, emoji, text] = matches;

  return {
    emoji: emoji.trim(),
    text: text.trim(),
  };
}

const EmojiPoint = ({ point }: { point: string }) => {
  const parsed = parseEmojiPoint(point);
  if (!parsed) return null;

  return (
    <div className="group relative p-4 rounded-2xl border border-gray-500/10 bg-gray-100 hover:shadow-lg transition-all">
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
    </div>
  );
};

const RegularPoint = ({ point }: { point: string }) => {
  return (
    <div className="group relative p-4 rounded-2xl border border-gray-500/10 bg-gray-100 hover:shadow-lg transition-all">
      <p className="text-lg lg:text-xl text-muted-foreground/90 leading-relaxed">
        {point}
      </p>
    </div>
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
    <div className="space-y-4">
      {points.map((point, index) => {
        const { isMainPoint, hasEmoji, isEmpty } = parsePoint(point);
        if (isEmpty) return null;

        return hasEmoji || isMainPoint ? (
          <EmojiPoint key={`point-${index}`} point={point} />
        ) : (
          <RegularPoint key={`point-${index}`} point={point} />
        );
      })}
    </div>
  );
}
