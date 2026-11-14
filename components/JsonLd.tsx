/**
 * Emits one JSON-LD block. React escapes `<` inside scripts as a safety
 * measure, and we do the same for the JSON payload so no value can close the
 * surrounding <script> element.
 */
export default function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
