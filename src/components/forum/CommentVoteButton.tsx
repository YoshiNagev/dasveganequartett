import { useState } from "react";
import { toggleCommentVote } from "../../lib/comments";

type Props = {
  commentId: string;
  initialVotes: number;
  initiallyVoted?: boolean;
};

export default function CommentVoteButton({
  commentId,
  initialVotes,
  initiallyVoted = false,
}: Props) {
  const [votes, setVotes] = useState(initialVotes);
  const [voted, setVoted] = useState(initiallyVoted);
  const [loading, setLoading] = useState(false);

  async function handleVote() {
    setLoading(true);

    try {
      const result = await toggleCommentVote(commentId);

      setVoted(result.voted);
      setVotes((current) => current + (result.voted ? 1 : -1));
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Abstimmung konnte nicht gespeichert werden."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      className={voted ? "comment-vote-button active" : "comment-vote-button"}
      onClick={handleVote}
      disabled={loading}
    >
      ▲ {votes}
    </button>
  );
}