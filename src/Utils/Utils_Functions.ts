export const firstLetterToUpper = (word: string): string =>  {
	let word1 = word.charAt(0);

	return word.replace(word1, word1.toUpperCase());	
}