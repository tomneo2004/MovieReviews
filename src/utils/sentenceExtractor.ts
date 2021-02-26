import Tokenizer from "sentence-tokenizer";

export function partialSentenceFrom(paragraph: string, amount: number = 1) {
  const tokenizer = new Tokenizer();
  tokenizer.setEntry(paragraph);
  let sentences = tokenizer.getSentences();
  const numSents = sentences.length;
  sentences = sentences.splice(0, amount);

  return {
    partial: sentences.join(""),
    fullyExtracted: amount >= numSents,
  };
}

export default {}