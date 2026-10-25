import { test } from "node:test";
import assert from "node:assert/strict";
import { refundSummary } from "../src/lib/server/refundSummary.ts";
test("Noch keine Erstattung",()=>assert.deepEqual(refundSummary([],1500),{amount:0,status:"none"}));
test("Ausstehend ist nicht erfolgreich",()=>assert.deepEqual(refundSummary([{amount:1500,status:"pending"}],1500),{amount:0,status:"pending"}));
test("Fehlgeschlagene Rückzahlung zählt nicht",()=>assert.deepEqual(refundSummary([{amount:1500,status:"failed"}],1500),{amount:0,status:"failed"}));
test("Teilbetrag plus ausstehender Rest",()=>assert.deepEqual(refundSummary([{amount:500,status:"succeeded"},{amount:1000,status:"pending"}],1500),{amount:500,status:"pending"}));
test("Mehrere erfolgreiche Teilbeträge ergeben Vollerstattung",()=>assert.deepEqual(refundSummary([{amount:500,status:"succeeded"},{amount:1000,status:"succeeded"}],1500),{amount:1500,status:"succeeded"}));
test("Abgebrochener Rest bleibt Teilrückzahlung",()=>assert.deepEqual(refundSummary([{amount:500,status:"succeeded"},{amount:1000,status:"canceled"}],1500),{amount:500,status:"partial"}));
