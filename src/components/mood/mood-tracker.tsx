"use client";

import { useState } from "react";

import {
  Button,
  Card,
  CardContent,
  H3,
  Small,
  Text,
} from "@/components/ui";

const moodOptions = [
  {
    value: "VERY_LOW",
    label: "Very Low",
    emoji: "😞",
  },
  {
    value: "LOW",
    label: "Low",
    emoji: "🙁",
  },
  {
    value: "NEUTRAL",
    label: "Neutral",
    emoji: "😐",
  },
  {
    value: "GOOD",
    label: "Good",
    emoji: "🙂",
  },
  {
    value: "VERY_GOOD",
    label: "Very Good",
    emoji: "😄",
  },
] as const;

export function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<
    (typeof moodOptions)[number]["value"] | null
  >(null);

  const [note, setNote] = useState("");

  return (
    <Card>
      <CardContent className="space-y-6 p-6">
        <div className="space-y-2">
          <Small className="uppercase tracking-[0.18em] text-primary">
            Mood tracker
          </Small>

          <H3 className="text-2xl">
            How are you feeling today?
          </H3>

          <Text className="text-muted-foreground">
            Choose the mood that best describes how you feel right now.
          </Text>
        </div>

        <div
          className="grid gap-3 sm:grid-cols-5"
          role="radiogroup"
          aria-label="Select your mood"
        >
          {moodOptions.map((option) => {
            const isSelected = selectedMood === option.value;

            return (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => setSelectedMood(option.value)}
                className={`rounded-2xl border p-4 text-center transition-all ${
                  isSelected
                    ? "border-primary bg-primary/10 shadow-sm"
                    : "border-border bg-background hover:border-primary/30 hover:bg-muted/50"
                }`}
              >
                <span className="block text-3xl" aria-hidden="true">
                  {option.emoji}
                </span>

                <span className="mt-2 block text-sm font-medium">
                  {option.label}
                </span>
              </button>
            );
          })}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="mood-note"
            className="text-sm font-medium"
          >
            Note <span className="text-muted-foreground">(optional)</span>
          </label>

          <textarea
            id="mood-note"
            value={note}
            onChange={(event) => setNote(event.target.value)}
            maxLength={500}
            rows={4}
            placeholder="How are you feeling? What happened today?"
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
          />

          <div className="flex justify-end">
            <Small>{note.length}/500</Small>
          </div>
        </div>

        <Button
          type="button"
          disabled={!selectedMood}
          className="w-full sm:w-auto"
        >
          Save mood
        </Button>
      </CardContent>
    </Card>
  );
}