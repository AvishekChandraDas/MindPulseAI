import type { AssessmentAnswerMap } from "./scoring";

const payloadPrefix = "v1:";

export function encodeAssessmentAnswers(answerMap: AssessmentAnswerMap) {
  const json = JSON.stringify(answerMap);
  const encoded =
    typeof window === "undefined"
      ? Buffer.from(json, "utf8").toString("base64url")
      : btoa(json);
  return `${payloadPrefix}${encoded}`;
}

export function decodeAssessmentAnswers(payload: string | undefined | null) {
  if (!payload || !payload.startsWith(payloadPrefix)) {
    return null;
  }

  const encoded = payload.slice(payloadPrefix.length);

  try {
    const json =
      typeof window === "undefined"
        ? Buffer.from(encoded, "base64url").toString("utf8")
        : atob(encoded);
    const parsed = JSON.parse(json) as unknown;

    if (!parsed || typeof parsed !== "object") {
      return null;
    }

    return parsed as AssessmentAnswerMap;
  } catch {
    return null;
  }
}
