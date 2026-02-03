"use client";

/* eslint-disable @next/next/no-img-element */

import { format } from "date-fns";
import { useCallback, useEffect, useState } from "react";

type GenerationRecord = {
  id: string;
  prompt: string;
  imageUrl: string;
  createdAt: string;
};

const formatDateTime = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return format(date, "MMM d, yyyy h:mm a");
};

export default function GenerationsPage() {
  const [records, setRecords] = useState<GenerationRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const hasInvalidRange = Boolean(fromDate && toDate && fromDate > toDate);

  const loadRecords = useCallback(async (from: string, to: string) => {
    const params = new URLSearchParams();

    if (from) params.set("from", from);
    if (to) params.set("to", to);

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/generations${params.toString() ? `?${params.toString()}` : ""}`,
      );
      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(payload?.error || "Unable to load generations.");
      }

      setRecords(payload?.data ?? []);
    } catch (loadError) {
      const message =
        loadError instanceof Error
          ? loadError.message
          : "Unable to load generations.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRecords("", "");
  }, [loadRecords]);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-nano-gray">
              Generation history
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-nano-text">
              Track every Nanobanana output
            </h2>
            <p className="mt-2 text-sm text-nano-gray">
              Filter by date, revisit prompts, and download assets anytime.
            </p>
          </div>
          <div className="flex flex-wrap items-end gap-3">
            <label className="space-y-1 text-xs font-semibold uppercase tracking-[0.2em] text-nano-gray">
              From
              <input
                className="mt-1 w-full rounded-full border border-gray-200 px-3 py-1.5 text-xs font-medium text-nano-text"
                type="date"
                value={fromDate}
                onChange={(event) => setFromDate(event.target.value)}
              />
            </label>
            <label className="space-y-1 text-xs font-semibold uppercase tracking-[0.2em] text-nano-gray">
              To
              <input
                className="mt-1 w-full rounded-full border border-gray-200 px-3 py-1.5 text-xs font-medium text-nano-text"
                type="date"
                value={toDate}
                onChange={(event) => setToDate(event.target.value)}
              />
            </label>
            <button
              className="rounded-full bg-nano-yellow px-4 py-2 text-xs font-semibold text-black shadow-sm transition-colors hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-70"
              onClick={() => loadRecords(fromDate, toDate)}
              disabled={hasInvalidRange || isLoading}
              type="button"
            >
              Apply
            </button>
            <button
              className="rounded-full border border-gray-200 px-4 py-2 text-xs font-semibold text-black transition-colors hover:bg-gray-50"
              onClick={() => {
                setFromDate("");
                setToDate("");
                loadRecords("", "");
              }}
              type="button"
            >
              Clear
            </button>
          </div>
        </div>
        {hasInvalidRange ? (
          <p className="mt-3 text-sm text-amber-600">
            Please make sure the end date is after the start date.
          </p>
        ) : null}
        {error ? <p className="mt-3 text-sm text-red-500">{error}</p> : null}
      </div>

      {isLoading ? (
        <div className="rounded-3xl border border-gray-200 bg-white p-10 text-center text-sm text-nano-gray shadow-sm">
          Loading generations...
        </div>
      ) : records.length === 0 ? (
        <div className="rounded-3xl border border-gray-200 bg-white p-10 text-center text-sm text-nano-gray shadow-sm">
          No generations yet. Start creating to build your history.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {records.map((record) => (
            <div
              key={record.id}
              className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm"
            >
              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
                <div className="aspect-[4/3] w-full">
                  <img
                    alt="Generated output"
                    className="h-full w-full object-cover"
                    loading="lazy"
                    src={record.imageUrl}
                  />
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-nano-gray">
                  Prompt
                </p>
                <p className="text-sm text-nano-text">{record.prompt}</p>
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs text-nano-gray">
                  <span>{formatDateTime(record.createdAt)}</span>
                  <a
                    className="rounded-full border border-gray-200 px-3 py-1 text-xs font-semibold text-black transition-colors hover:bg-gray-50"
                    download={`nanobanana-${record.id}.png`}
                    href={record.imageUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    Download
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
