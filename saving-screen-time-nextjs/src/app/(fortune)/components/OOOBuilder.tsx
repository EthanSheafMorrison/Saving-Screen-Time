"use client";

import { useEffect, useRef, useState } from "react";
import type { OOOTone } from "../../../lib/fortune/data";

export interface Draft {
  tone: OOOTone;
  label: string;
  subject: string;
  body: string;
}

const MANUAL_HINT = "Copying is blocked in this browser. Tap the message above to select it, then choose Copy.";

const fullText = (draft: Draft) => `Subject: ${draft.subject}\n\n${draft.body}`;

// In-app browsers (Instagram, WhatsApp, camera apps) can lack the async
// Clipboard API, reject the write, or leave the promise hanging. Only a write
// that resolves in time counts as copied.
function writeWithClipboardApi(text: string): Promise<boolean> {
  const timeout = new Promise<boolean>((resolve) => setTimeout(() => resolve(false), 2000));
  const write = navigator.clipboard.writeText(text).then(
    () => true,
    () => false,
  );
  return Promise.race([write, timeout]);
}

// Legacy copy command. Counts as copied only if the browser ran the command and
// handed us the clipboard to write the text into.
function copyWithCommand(text: string): boolean {
  let wrote = false;
  const onCopy = (event: ClipboardEvent) => {
    if (!event.clipboardData) return;
    event.clipboardData.setData("text/plain", text);
    event.preventDefault();
    wrote = true;
  };
  document.addEventListener("copy", onCopy);
  try {
    return document.execCommand("copy") && wrote;
  } catch {
    return false;
  } finally {
    document.removeEventListener("copy", onCopy);
  }
}

export default function OOOBuilder({ drafts }: { drafts: Draft[] }) {
  const formRef = useRef<HTMLFormElement>(null);
  const resetTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [copied, setCopied] = useState(false);
  const [manual, setManual] = useState(false);

  const selectedDraft = () => {
    const tone = (formRef.current?.elements.namedItem("tone") as RadioNodeList | null)?.value;
    return drafts.find((draft) => draft.tone === tone) ?? drafts[0];
  };

  // Mirror the checked tone onto the form for the CSS that shows the matching
  // draft. Running it on mount also keeps a choice made before hydration.
  const syncTone = () => {
    if (formRef.current) formRef.current.dataset.tone = selectedDraft().tone;
  };

  useEffect(() => {
    syncTone();
    return () => clearTimeout(resetTimer.current);
  }, []);

  const markCopied = () => {
    setCopied(true);
    clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setCopied(false), 2500);
  };

  const handleToneChange = () => {
    syncTone();
    clearTimeout(resetTimer.current);
    setCopied(false);
  };

  const handleCopy = () => {
    const text = fullText(selectedDraft());
    setCopied(false);
    if (window.isSecureContext && typeof navigator.clipboard?.writeText === "function") {
      writeWithClipboardApi(text).then((ok) => (ok ? markCopied() : setManual(true)));
    } else if (copyWithCommand(text)) {
      markCopied();
    } else {
      setManual(true);
    }
  };

  const selectAll = (field: HTMLTextAreaElement) => {
    field.focus();
    field.setSelectionRange(0, field.value.length);
  };

  // Manual fallback: a tap selects the whole message for the native Copy menu
  // and tries the copy command while the tap still counts as a user gesture.
  const handleManualTap = (event: React.MouseEvent<HTMLTextAreaElement>) => {
    const field = event.currentTarget;
    selectAll(field);
    if (copyWithCommand(field.value)) markCopied();
  };

  // Copy picked from the native menu: only claim success for the whole message.
  const handleManualCopy = (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const field = event.currentTarget;
    if (field.selectionStart === 0 && field.selectionEnd === field.value.length) markCopied();
  };

  return (
    <form
      ref={formRef}
      className="panel"
      aria-labelledby="ooo-heading"
      onChange={handleToneChange}
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="panel-head">
        <span className="panel-tag">★ OOO Generator</span>
        <h2 id="ooo-heading" className="panel-title">
          Make this your Out-of-Office
        </h2>
      </div>

      <div className="panel-body">
        <p className="tone-label" id="tone-label">
          Tone
        </p>
        <div className="tones" role="radiogroup" aria-labelledby="tone-label">
          {drafts.map((draft, index) => (
            <label key={draft.tone} className="tone">
              <input
                type="radio"
                name="tone"
                value={draft.tone}
                defaultChecked={index === 0}
                aria-label={draft.label}
              />
              <span className="tone-text" aria-hidden="true">
                {draft.label.split(" ").map((word) => (
                  <span key={word}>{word}</span>
                ))}
              </span>
            </label>
          ))}
        </div>

        <div className="drafts">
          {drafts.map((draft) => (
            <div key={draft.tone} className="draft" data-tone={draft.tone}>
              <div className="draft-head" aria-hidden="true">
                <span>Out-of-office</span>
                <span>★ {draft.label}</span>
              </div>
              <p className="draft-subject">{`Subject: ${draft.subject}`}</p>
              <p className="draft-body">{draft.body}</p>
              {manual && (
                <textarea
                  className="draft-manual"
                  readOnly
                  value={fullText(draft)}
                  aria-label={`${draft.label} out-of-office message`}
                  onFocus={(event) => selectAll(event.currentTarget)}
                  onClick={handleManualTap}
                  onCopy={handleManualCopy}
                />
              )}
            </div>
          ))}
        </div>

        <div className="bar">
          <p className={manual ? "copy-status" : "copy-status visually-hidden"} role="status">
            {copied ? "Copied to clipboard." : manual ? MANUAL_HINT : ""}
          </p>
          <button type="button" className="copy" onClick={handleCopy}>
            {copied ? "Copied to clipboard" : "Copy to clipboard"}
          </button>
          <noscript
            dangerouslySetInnerHTML={{
              __html: '<p class="nojs-hint">Press and hold the message to select and copy it.</p>',
            }}
          />
        </div>
      </div>
    </form>
  );
}
