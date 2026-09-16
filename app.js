import { STORAGE_KEY, formatTotal, normalizeRecord, parseStoredRecords, totalMinutes } from "./app-core.js";

const form = document.querySelector("#study-form");
const list = document.querySelector("#record-list");
const emptyState = document.querySelector("#empty-state");
const totalTime = document.querySelector("#total-time");
const recordCount = document.querySelector("#record-count");
const message = document.querySelector("#form-message");
const template = document.querySelector("#record-template");

let records = parseStoredRecords(localStorage.getItem(STORAGE_KEY));

function saveRecords() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

function formatDate(value) {
  const date = new Date(value);
  return new Intl.DateTimeFormat("zh-CN", {
    month: "long", day: "numeric", hour: "2-digit", minute: "2-digit",
  }).format(date);
}

function render() {
  list.replaceChildren();
  for (const record of records) {
    const item = template.content.firstElementChild.cloneNode(true);
    item.dataset.id = record.id;
    item.querySelector(".record-subject").textContent = record.subject;
    item.querySelector(".record-content").textContent = record.content;
    item.querySelector(".duration-pill").textContent = `${record.duration} 分钟`;
    const dateElement = item.querySelector(".record-date");
    dateElement.dateTime = record.createdAt;
    dateElement.textContent = formatDate(record.createdAt);
    item.querySelector(".delete-button").setAttribute("aria-label", `删除“${record.subject}”学习记录`);
    list.append(item);
  }

  emptyState.hidden = records.length > 0;
  recordCount.textContent = `${records.length} 条`;
  totalTime.textContent = formatTotal(totalMinutes(records));
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  message.textContent = "";
  const data = new FormData(form);
  try {
    const record = normalizeRecord({
      subject: data.get("subject"), content: data.get("content"), duration: data.get("duration"),
    });
    records.unshift(record);
    saveRecords();
    render();
    form.reset();
    document.querySelector("#subject").focus();
  } catch (error) {
    message.textContent = error.message;
  }
});

list.addEventListener("click", (event) => {
  const button = event.target.closest(".delete-button");
  if (!button) return;
  records = records.filter((record) => record.id !== button.closest(".record-card").dataset.id);
  saveRecords();
  render();
});

render();
