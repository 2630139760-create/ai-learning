export const STORAGE_KEY = "study-tracker.records.v1";

export function normalizeRecord({ subject, content, duration }, now = new Date()) {
  const minutes = Number.parseInt(duration, 10);
  if (!subject.trim() || !content.trim() || !Number.isInteger(minutes) || minutes < 1 || minutes > 1440) {
    throw new Error("请完整填写内容，学习时长需为 1 到 1440 分钟。");
  }
  return {
    id: `${now.getTime()}-${Math.random().toString(36).slice(2, 9)}`,
    subject: subject.trim(),
    content: content.trim(),
    duration: minutes,
    createdAt: now.toISOString(),
  };
}

export function totalMinutes(records) {
  return records.reduce((total, record) => total + Number(record.duration || 0), 0);
}

export function formatTotal(minutes) {
  if (minutes < 60) return `${minutes} 分钟`;
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  return remainder ? `${hours} 小时 ${remainder} 分钟` : `${hours} 小时`;
}

export function parseStoredRecords(value) {
  if (!value) return [];
  try {
    const records = JSON.parse(value);
    return Array.isArray(records) ? records : [];
  } catch {
    return [];
  }
}
