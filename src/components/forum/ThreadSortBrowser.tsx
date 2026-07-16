import { useMemo, useState } from "react";

type Thread = {
  id: string;
  card_id: number | null;
  suggested_argument_id: string | null;
  title: string;
  body: string;
  slug: string;
  created_at: string;
  updated_at: string;
  profiles?: {
    nickname?: string;
  } | null;
  comments?: {
    id: string;
    created_at: string;
  }[];
};

type Props = {
  threads: Thread[];
};

type SortMode = "newest" | "active" | "commented";

export default function ThreadSortBrowser({ threads }: Props) {
  const [sortMode, setSortMode] = useState<SortMode>("newest");

  const sortedThreads = useMemo(() => {
    const copy = [...threads];

    if (sortMode === "newest") {
      return copy.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }

    if (sortMode === "commented") {
      return copy.sort(
        (a, b) => (b.comments?.length ?? 0) - (a.comments?.length ?? 0)
      );
    }

    return copy.sort((a, b) => {
      const latestA =
        a.comments && a.comments.length > 0
          ? Math.max(...a.comments.map((comment) => new Date(comment.created_at).getTime()))
          : new Date(a.created_at).getTime();

      const latestB =
        b.comments && b.comments.length > 0
          ? Math.max(...b.comments.map((comment) => new Date(comment.created_at).getTime()))
          : new Date(b.created_at).getTime();

      return latestB - latestA;
    });
  }, [threads, sortMode]);

  return (
    <section className="thread-sort-browser">
      <div className="thread-sort-toolbar">
        <button
          type="button"
          className={sortMode === "newest" ? "category-chip active" : "category-chip"}
          onClick={() => setSortMode("newest")}
        >
          Neueste
        </button>

        <button
          type="button"
          className={sortMode === "active" ? "category-chip active" : "category-chip"}
          onClick={() => setSortMode("active")}
        >
          Aktuell aktiv
        </button>

        <button
          type="button"
          className={sortMode === "commented" ? "category-chip active" : "category-chip"}
          onClick={() => setSortMode("commented")}
        >
          Meist kommentiert
        </button>
      </div>

      <div className="thread-list">
        {sortedThreads.map((thread) => (
          <a className="thread-preview" href={`/forum/thread/${thread.slug}`} key={thread.id}>
            <div>
              <h3>{thread.title}</h3>
              <p>{thread.body}</p>
            </div>

            <div className="thread-meta">
              <span>{thread.profiles?.nickname ?? "Unbekannt"}</span>
              <span>
                {(thread.comments?.length ?? 0) === 1
                  ? "1 Antwort"
                  : `${thread.comments?.length ?? 0} Antworten`}
              </span>
              <span>{new Date(thread.created_at).toLocaleDateString("de-DE")}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}