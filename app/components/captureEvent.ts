import posthog from "posthog-js";

export function captureEvent(
  name: string,
  properties?: Record<string, string>,
): void {
  posthog.capture(name, properties);
}
