

export const parseSection = (section: string): { title: string; points: string[] } => {
  const [title, ...content] = section.split("\n");
  const cleanTitle = title.startsWith("#")
    ? title.substring(1).trim()
    : title.trim();

  const points: string[] = [];
  let currentPoint = "";

  content.forEach((line) => {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith(".")) {
      if (currentPoint) points.push(currentPoint.trim());
      currentPoint = trimmedLine;
    } else if (!trimmedLine) {
      if (currentPoint) points.push(currentPoint.trim());
      currentPoint = "";
    } else {
      currentPoint += " " + trimmedLine;
    }
  });
  if (currentPoint) points.push(currentPoint.trim());

  return {
    title: cleanTitle,
    points: points.filter(
      (point) => point && !point.startsWith("#") && !point.startsWith("[Choose")
    ) as string[],
  };
};

export function parsePoint(point: string) {
  const isNumbered = /^\d+\./.test(point);
  const isMainPoint = /^•/.test(point);

  const emojiRegex = /\p{Emoji}/u;
  const hasEmoji = emojiRegex.test(point);
  const isEmpty = !point.trim();

  return { isNumbered, isMainPoint, hasEmoji, isEmpty };
}

export function parseEmojiPoint(content: string) {
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