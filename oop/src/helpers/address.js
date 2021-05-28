export const truncateAddressLines = (lines, maxlength) => {
  const newLines = [];
  let lineIndex = 0;

  for (let i=0; i<lines.length; i++) {
    if (!lines[i]) {
      break;
    }
    newLines.push('');
    const words = lines[i].split(' ');

    if (lines[i].length > maxlength && words.length > 1) {
      // Iterate over words.
      while (words.length > 0) {
        newLines[lineIndex] += words[0] + ' ';
        words.splice(0, 1);

        if (words.length > 0) {
          const tempNextLine = newLines[lineIndex] + words[0];
          // Add next line in case words remain.
          if (tempNextLine.length > maxlength) {
            newLines[lineIndex] = newLines[lineIndex].trim();
            newLines.push('');
            lineIndex++;
          }
        }
      }
      newLines[lineIndex] = newLines[lineIndex].trim();
    } else {
      newLines[lineIndex] = lines[i];
    }
    lineIndex++;
  }
  return newLines;
};
