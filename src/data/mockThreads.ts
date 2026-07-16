export const mockThreads = [
  {
    id: "pflanzen-gefuehle-antworten",
    cardId: 1,
    title: "Wie antwortet man am besten auf dieses Argument?",
    author: "MoralMango",
    replies: 12,
    createdAt: "Vor 2 Tagen",
    excerpt:
      "Ich finde den Einwand gut, aber vielleicht müsste man noch stärker erklären, warum Veganismus selbst dann weniger Pflanzenleid verursachen würde.",
  },
  {
    id: "pflanzen-und-tierfutter",
    cardId: 1,
    title: "Der Zusammenhang mit Tierfutter ist hier entscheidend",
    author: "EthikEule",
    replies: 7,
    createdAt: "Vor 5 Tagen",
    excerpt:
      "Viele Menschen vergessen, dass für Tierprodukte sehr viele Pflanzen an Tiere verfüttert werden.",
  },
  {
    id: "ein-veganer-mehr-nachfrage",
    cardId: 2,
    title: "Wie stark beeinflusst eine einzelne Person die Nachfrage?",
    author: "KartoffelKritik",
    replies: 18,
    createdAt: "Vor 1 Woche",
    excerpt:
      "Vielleicht sollte man hier zwischen direkter Nachfrage, sozialem Einfluss und langfristiger Normalisierung unterscheiden.",
  },
];

export function getThreadsForCard(cardId: number) {
  return mockThreads.filter((thread) => thread.cardId === cardId);
}