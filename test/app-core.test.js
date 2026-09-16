import test from "node:test";
import assert from "node:assert/strict";
import { formatTotal, normalizeRecord, parseStoredRecords, totalMinutes } from "../app-core.js";

test("normalizes valid form data", () => {
  const record = normalizeRecord({ subject: " 英语 ", content: " 单词复习 ", duration: "45" }, new Date("2026-09-16T10:00:00Z"));
  assert.equal(record.subject, "英语");
  assert.equal(record.content, "单词复习");
  assert.equal(record.duration, 45);
  assert.equal(record.createdAt, "2026-09-16T10:00:00.000Z");
});

test("rejects empty or invalid form data", () => {
  assert.throws(() => normalizeRecord({ subject: "", content: "内容", duration: "30" }));
  assert.throws(() => normalizeRecord({ subject: "数学", content: "内容", duration: "0" }));
  assert.throws(() => normalizeRecord({ subject: "数学", content: "内容", duration: "1441" }));
});

test("calculates and formats total duration", () => {
  assert.equal(totalMinutes([{ duration: 45 }, { duration: 30 }]), 75);
  assert.equal(formatTotal(45), "45 分钟");
  assert.equal(formatTotal(75), "1 小时 15 分钟");
  assert.equal(formatTotal(120), "2 小时");
});

test("loads only valid JSON arrays", () => {
  assert.deepEqual(parseStoredRecords('[{"duration":30}]'), [{ duration: 30 }]);
  assert.deepEqual(parseStoredRecords("broken"), []);
  assert.deepEqual(parseStoredRecords('{"duration":30}'), []);
});
