type PostHogClient = typeof import("posthog-js").default;

export function captureEvent(
  name: string,
  properties?: Record<string, string>,
): void {
  void import("posthog-js").then(({ default: posthog }) => {
    captureLoaded(posthog, name, properties);
  });
}

function captureLoaded(
  posthog: PostHogClient,
  name: string,
  properties: Record<string, string> | undefined,
): void {
  if (!posthog.__loaded) {
    return;
  }

  posthog.capture(name, properties);
}
