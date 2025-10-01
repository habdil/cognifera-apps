"use client";

import { EditorProvider } from '@tiptap/react';
import { useMemo } from 'react';

// Editor components
import { EditorToolbar } from './EditorToolbar';
import { createEditorExtensions } from './extensions';

// Styles
import './editor-styles.css';

export interface RichTextEditorProps {
  content?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
  className?: string;
}

export const RichTextEditor = ({
  content = '',
  onChange,
  placeholder = "Start writing your article...",
  className = ''
}: RichTextEditorProps) => {
  const extensions = useMemo(() => createEditorExtensions(placeholder), [placeholder]);

  return (
    <div className={`border border-[var(--color-border)] rounded-lg overflow-hidden bg-[var(--color-background)] ${className}`}>
      <EditorProvider
        slotBefore={<EditorToolbar />}
        extensions={extensions}
        content={content}
        immediatelyRender={false}
        editorProps={{
          attributes: {
            class: 'tiptap-editor-content prose max-w-none focus:outline-none min-h-[400px] p-6 bg-[var(--color-background)]',
          },
        }}
        onUpdate={({ editor }) => {
          if (onChange) {
            onChange(editor.getHTML());
          }
        }}
      />
    </div>
  );
};
