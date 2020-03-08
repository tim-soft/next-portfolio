/**
 * Splits the first token of a code line at any leading whitespace
 *
 * The purpose of the split is to easily highlight code on hover without
 * including the indenting whitespace
 *
 * So if the beginning of a line looks like this exists:
 *    <span>{`      <div />`}</span>
 * break into two parts:
 *    <span>{`      `}</span>
 *    <span>{`<div />`}</span>
 *
 * @param {array} line Tokenized line of code
 */
const splitLineIndent = line => {
    const { content } = line[0];
    const hasIndent = content.charAt(0) === ' ';

    // If the first token of line has a leading space, it'll need to be split
    if (hasIndent) {
        // Separate leading whitespace and code portion of token
        const [, lineIndent, codeStart] = content.split(/^(\s+)/);

        // If token isn't only whitespace, insert split tokens back into line
        if (codeStart !== '') {
            const newIndent = { ...line[0], content: lineIndent };
            const newCodeStart = { ...line[0], content: codeStart };

            // Delete first token
            line.shift();

            // Replace with two tokens
            line.unshift(newIndent, newCodeStart);
        }
    }
};

export default splitLineIndent;
