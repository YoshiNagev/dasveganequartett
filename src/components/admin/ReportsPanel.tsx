import { useEffect, useState } from "react";
import {
  checkIsModerator,
  getReports,
  hideReportedComment,
  hideReportedThread,
  unhideReportedComment,
  unhideReportedThread,
  updateReportStatus,
  type ModerationReport,
  type ReportTab,
} from "../../lib/reports";
import MarkdownText from "../forum/MarkdownText";

export default function ReportsPanel() {
  const [reports, setReports] = useState<ModerationReport[]>([]);
  const [tab, setTab] = useState<ReportTab>("open");
  const [loading, setLoading] = useState(true);
  const [isModerator, setIsModerator] = useState(false);
  const [message, setMessage] = useState("");

  async function loadReports(nextTab = tab) {
    setLoading(true);
    setMessage("");

    try {
      const allowed = await checkIsModerator();
      setIsModerator(allowed);

      if (!allowed) {
        setReports([]);
        return;
      }

      const data = await getReports(nextTab);
      setReports(data);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Reports konnten nicht geladen werden.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadReports("open");
  }, []);

  async function switchTab(nextTab: ReportTab) {
    setTab(nextTab);
    await loadReports(nextTab);
  }

  async function resolveReport(report: ModerationReport) {
    const confirmed = window.confirm("Inhalt endgültig verborgen lassen und Report schließen?");
    if (!confirmed) return;

    try {
      if (report.comment_id) await hideReportedComment(report.comment_id);
      if (report.thread_id) await hideReportedThread(report.thread_id);

      await updateReportStatus({
        reportId: report.id,
        status: "resolved",
        moderatorNote: "Inhalt verborgen.",
      });

      await loadReports();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Aktion fehlgeschlagen.");
    }
  }

  async function releaseReport(report: ModerationReport) {
    const confirmed = window.confirm("Inhalt wieder freigeben und Meldung ablehnen?");
    if (!confirmed) return;

    try {
      if (report.comment_id) await unhideReportedComment(report.comment_id);
      if (report.thread_id) await unhideReportedThread(report.thread_id);

      await updateReportStatus({
        reportId: report.id,
        status: "dismissed",
        moderatorNote: "Meldung abgelehnt. Inhalt freigegeben.",
      });

      await loadReports();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Inhalt konnte nicht freigegeben werden.");
    }
  }

  async function markReviewed(report: ModerationReport) {
    try {
      await updateReportStatus({
        reportId: report.id,
        status: "reviewed",
        moderatorNote: "Geprüft.",
      });

      await loadReports();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Report konnte nicht aktualisiert werden.");
    }
  }

  if (loading) {
    return <p className="form-message">Reports werden geladen...</p>;
  }

  if (!isModerator) {
    return (
      <div className="empty-state">
        <h3>Kein Zugriff</h3>
        <p>Diese Seite ist nur für Moderator:innen und Admins sichtbar.</p>
      </div>
    );
  }

  return (
    <section className="reports-panel">
      <div className="admin-tabs">
        <button
          type="button"
          className={tab === "open" ? "category-chip active" : "category-chip"}
          onClick={() => switchTab("open")}
        >
          Offene Meldungen
        </button>

        <button
          type="button"
          className={tab === "archive" ? "category-chip active" : "category-chip"}
          onClick={() => switchTab("archive")}
        >
          Archiv
        </button>
      </div>

      {message && <p className="form-message">{message}</p>}

      {reports.length === 0 ? (
        <div className="empty-state">
          <h3>{tab === "open" ? "Keine offenen Meldungen" : "Archiv leer"}</h3>
          <p>Hier gibt es aktuell nichts zu prüfen.</p>
        </div>
      ) : (
        <div className="reports-list">
          {reports.map((report) => {
            const isCommentReport = Boolean(report.comment_id);
            const comment = report.comments;
            const thread = report.threads ?? comment?.threads;

            return (
              <article className="report-card" key={report.id}>
                <div className="report-card-header">
                  <div>
                    <p className="eyebrow">
                      {isCommentReport ? "Kommentar-Meldung" : "Thread-Meldung"}
                    </p>

                    <h2>
                      {isCommentReport
                        ? comment?.threads?.title ?? "Kommentar ohne Thread"
                        : report.threads?.title ?? "Unbekannter Thread"}
                    </h2>
                  </div>

                  <span className={`report-status ${report.status}`}>
                    {report.status}
                  </span>
                </div>

                <div className="report-meta">
                  <span>{new Date(report.created_at).toLocaleString("de-DE")}</span>

                  {thread?.slug && (
                    <a href={`/forum/thread/${thread.slug}`}>
                      Thread öffnen →
                    </a>
                  )}
                </div>

                <div className="report-reason">
                  <strong>Grund der Meldung</strong>
                  <p>{report.reason}</p>
                </div>

                <div className="reported-content-box">
                  <strong>Gemeldeter Inhalt</strong>

                  {isCommentReport ? (
                    <>
                      <p className="muted-text">
                        Autor: {comment?.profiles?.nickname ?? "Unbekannt"}
                      </p>

                      {comment?.is_hidden && <p className="form-message">Kommentar ist aktuell verborgen.</p>}

                      <MarkdownText content={comment?.body ?? "Kommentar nicht gefunden."} />
                    </>
                  ) : (
                    <>
                      <p className="muted-text">
                        Autor: {report.threads?.profiles?.nickname ?? "Unbekannt"}
                      </p>

                      {report.threads?.is_hidden && <p className="form-message">Thread ist aktuell verborgen.</p>}

                      <MarkdownText content={report.threads?.body ?? "Thread nicht gefunden."} />
                    </>
                  )}
                </div>

                {report.moderator_note && (
                  <div className="report-reason">
                    <strong>Moderationsnotiz</strong>
                    <p>{report.moderator_note}</p>
                  </div>
                )}

                {tab === "open" && (
                  <div className="report-actions">
                    <button type="button" onClick={() => releaseReport(report)}>
                      Freigeben
                    </button>

                    <button type="button" onClick={() => resolveReport(report)}>
                      Endgültig verbergen
                    </button>

                    <button type="button" onClick={() => markReviewed(report)}>
                      Nur als geprüft markieren
                    </button>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}