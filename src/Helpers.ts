export class Helpers{

    /**
     * Splits a string into individual words containing only alphabetic characters.
     * @param text - The input text to process.
     * @returns An array of words containing only alphabetic characters.
     */
    public static splitToAlphabeticWords = (text: string): string[] => {
        const words: string[] = [];
        let currentWord: string = "";

        for (let i = 0; i < text.length; i++) {
            const char = text[i];

            if ((char >= "A" && char <= "Z") || (char >= "a" && char <= "z")) {
                // Append to the current word if the character is alphabetic
                currentWord += char;
            } else if (currentWord.length > 0) {
                // Push the completed word and reset
                words.push(currentWord);
                currentWord = "";
            }
        }

        // Add the last word if it exists
        if (currentWord.length > 0) {
            words.push(currentWord);
        }

        return words;
    };

}