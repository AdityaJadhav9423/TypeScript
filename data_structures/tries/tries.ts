/**
 * Represents a node in a Trie data structure.
 */
class TrieNode {
  /**
   * An object that stores child nodes for each character in the alphabet.
   */
  children: Record<string, TrieNode> = {}

  /**
   * Indicates whether the node represents the end of a word.
   */
  isWord = false
}

/**
 * Trie Data structure for storing and searching words.
 */
export class Trie {
  /**
   * The root node of the Trie.
   */
  root: TrieNode = new TrieNode()

  /**
   * Inserts a word into the Trie.
   *
   * @param word - The word to insert into the Trie.
   */
  private insertNode(node: TrieNode, word: string): void {
    for (const char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode()
      }
      node = node.children[char]
    }
    node.isWord = true
  }

  /**
   * Searches for a word in the Trie.
   *
   * @param word - The word to search for.
   * @param isPrefixMatch - Indicates whether to perform a prefix match (default: false).
   *   If true, the method returns true if the Trie contains words with the specified prefix.
   *   If false, the method returns true only if an exact match is found.
   * @returns True if the word (or prefix) is found in the Trie; otherwise, false.
   */
  public find(word: string, isPrefixMatch = false): boolean {
    return this.searchNode(this.root, word, isPrefixMatch)
  }

  /**
   * Adds a word to the Trie.
   *
   * @param word - The word to add to the Trie.
   * @returns The Trie instance, allowing for method chaining.
   */
  public add(word: string): this {
    this.insertNode(this.root, word)
    return this
  }

  /**
   * Searches for a word in the Trie.
   *
   * @param node - The current Trie node being examined.
   * @param word - The word to search for.
   * @param prefixMatch - Indicates whether to perform a prefix match.
   * @returns True if the word (or prefix) is found in the Trie; otherwise, false.
   * @private
   */
  private searchNode(
    node: TrieNode,
    word: string,
    prefixMatch: boolean
  ): boolean {
    for (const char of word) {
      if (!node.children[char]) {
        return false
      }
      node = node.children[char]
    }
    return prefixMatch || node.isWord
  }
  /**
   * Removes a word from the Trie.
   *
   * @param word - The word to remove from the Trie.
   * @returns True if the word was successfully removed; otherwise, false.
   */
  public remove(word: string): boolean {
    return this.removeNode(this.root, word, 0)
  }

  /**
   * Helper function to remove a word from the Trie.
   *
   * @param node - The current Trie node being examined.
   * @param word - The word to remove.
   * @param index - The current character index of the word being checked.
   * @returns True if the word was successfully removed; otherwise, false.
   * @private
   */
  private removeNode(node: TrieNode, word: string, index: number): boolean {
    if (index === word.length) {
      if (!node.isWord) return false  // Word doesn't exist
      node.isWord = false  // Unmark the end of the word

      // If no children, the node can be removed
      return Object.keys(node.children).length === 0
    }

    const char = word[index]
    const childNode = node.children[char]

    if (!childNode) return false  // Word doesn't exist

    const shouldDeleteChild = this.removeNode(childNode, word, index + 1)

    if (shouldDeleteChild) {
      delete node.children[char]  // Remove the child reference

      // Return true if current node has no other children and is not end of another word
      return Object.keys(node.children).length === 0 && !node.isWord
    }

    return false
  }
}
