const removedTitles = new Set([
  "a photo of us",
  "something i appreciate about amy",
  "something i appreciated about amy",
]);

export function keepScrapbookEntry(entry: { title: string }) {
  return !removedTitles.has(entry.title.replace(/[\[\]]/g, "").trim().toLowerCase());
}