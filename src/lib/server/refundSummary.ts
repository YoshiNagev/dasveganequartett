export function refundSummary(refunds: { amount: number; status: string | null }[], total: number) {
 const amount = refunds.filter(r => r.status === "succeeded").reduce((n,r) => n+r.amount,0);
 const pending = refunds.some(r => r.status === "pending" || r.status === "requires_action" || r.status === null);
 const status = amount >= total && total > 0 ? "succeeded" : pending ? "pending" :
   amount > 0 ? "partial" : refunds.some(r => r.status === "failed" || r.status === "canceled") ? "failed" : "none";
 return { amount, status };
}
