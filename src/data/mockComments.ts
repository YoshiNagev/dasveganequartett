export const mockComments = [
  {
    id: "c1",
    threadId: "pflanzen-gefuehle-antworten",
    author: "MoralMango",
    createdAt: "Vor 2 Tagen",
    body: "Ich finde wichtig, dass man hier nicht nur sagt: Pflanzen fühlen nichts. Noch stärker ist: Selbst wenn Pflanzen moralisch relevant wären, würde Veganismus wahrscheinlich weniger Pflanzenverbrauch verursachen.",
  },
  {
    id: "c2",
    threadId: "pflanzen-gefuehle-antworten",
    author: "EthikEule",
    createdAt: "Vor 1 Tag",
    body: "Genau. Das Argument versucht oft, Veganismus als inkonsequent darzustellen, übersieht aber den Umweg über Tierfutter.",
  },
];

export function getCommentsForThread(threadId: string) {
  return mockComments.filter((comment) => comment.threadId === threadId);
}