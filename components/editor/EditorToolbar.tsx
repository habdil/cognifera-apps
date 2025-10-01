"use client";

import { useCurrentEditor } from '@tiptap/react';
import { useState, useCallback } from 'react';

// Tiptap UI Components
import { HeadingButton } from '@/components/tiptap-ui/heading-button';
import { ListButton } from '@/components/tiptap-ui/list-button';
import { MarkButton } from '@/components/tiptap-ui/mark-button';
import { ImageAlignButton } from '@/components/tiptap-ui/image-align-button';
import { ImageUploadButton } from '@/components/tiptap-ui/image-upload-button';

// UI Components
import { Input } from '@/components/ui/input';
import {
  Link as LinkIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Quote,
  Undo,
  Redo,
  Palette,
  Link2Off
} from 'lucide-react';
import { Button as TiptapButton } from '@/components/tiptap-ui-primitive/button';

export const EditorToolbar = () => {
  const { editor } = useCurrentEditor();
  const [linkUrl, setLinkUrl] = useState('');
  const [showLinkInput, setShowLinkInput] = useState(false);

  const handleLinkAdd = useCallback(() => {
    if (linkUrl && editor) {
      editor.chain().focus().setLink({ href: linkUrl }).run();
      setLinkUrl('');
      setShowLinkInput(false);
    }
  }, [editor, linkUrl]);

  const handleLinkRemove = useCallback(() => {
    editor?.chain().focus().unsetLink().run();
  }, [editor]);

  if (!editor) return null;

  return (
    <>
      <div className="border-b border-[var(--color-border)] p-3 bg-[var(--color-muted)] sticky top-0 z-10">
        <div className="flex flex-wrap items-center gap-1">
          {/* Headings */}
          <HeadingButton level={1} />
          <HeadingButton level={2} />
          <HeadingButton level={3} />

          <div className="w-px h-6 bg-[var(--color-border)] mx-1" />

          {/* Text Formatting */}
          <MarkButton type="bold" />
          <MarkButton type="italic" />
          <MarkButton type="underline" />
          <MarkButton type="strike" />
          <MarkButton type="code" />

          <div className="w-px h-6 bg-[var(--color-border)] mx-1" />

          {/* Subscript & Superscript */}
          <MarkButton type="subscript" />
          <MarkButton type="superscript" />

          <div className="w-px h-6 bg-[var(--color-border)] mx-1" />

          {/* Text Color & Highlight */}
          <div className="flex items-center gap-1">
            <Palette className="h-4 w-4 text-[var(--color-muted-foreground)]" />
            <input
              type="color"
              onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
              className="w-8 h-8 border border-[var(--color-border)] rounded cursor-pointer"
              title="Text Color"
            />
          </div>

          <input
            type="color"
            onChange={(e) => editor.chain().focus().toggleHighlight({ color: e.target.value }).run()}
            className="w-8 h-8 border border-[var(--color-border)] rounded cursor-pointer"
            title="Highlight Color"
          />

          <div className="w-px h-6 bg-[var(--color-border)] mx-1" />

          {/* Alignment */}
          <TiptapButton
            type="button"
            data-style="ghost"
            data-active-state={editor.isActive({ textAlign: 'left' }) ? 'on' : 'off'}
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            tooltip="Align Left"
          >
            <AlignLeft className="h-4 w-4" />
          </TiptapButton>

          <TiptapButton
            type="button"
            data-style="ghost"
            data-active-state={editor.isActive({ textAlign: 'center' }) ? 'on' : 'off'}
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            tooltip="Align Center"
          >
            <AlignCenter className="h-4 w-4" />
          </TiptapButton>

          <TiptapButton
            type="button"
            data-style="ghost"
            data-active-state={editor.isActive({ textAlign: 'right' }) ? 'on' : 'off'}
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            tooltip="Align Right"
          >
            <AlignRight className="h-4 w-4" />
          </TiptapButton>

          <TiptapButton
            type="button"
            data-style="ghost"
            data-active-state={editor.isActive({ textAlign: 'justify' }) ? 'on' : 'off'}
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            tooltip="Align Justify"
          >
            <AlignJustify className="h-4 w-4" />
          </TiptapButton>

          <div className="w-px h-6 bg-[var(--color-border)] mx-1" />

          {/* Lists */}
          <ListButton type="bulletList" />
          <ListButton type="orderedList" />
          <ListButton type="taskList" />

          <TiptapButton
            type="button"
            data-style="ghost"
            data-active-state={editor.isActive('blockquote') ? 'on' : 'off'}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            tooltip="Quote"
          >
            <Quote className="h-4 w-4" />
          </TiptapButton>

          <div className="w-px h-6 bg-[var(--color-border)] mx-1" />

          {/* Image Upload */}
          <ImageUploadButton
            extensionName="image"
            onInserted={() => console.log('Image uploaded successfully')}
          />

          {/* Image Alignment */}
          <ImageAlignButton align="left" />
          <ImageAlignButton align="center" />
          <ImageAlignButton align="right" />

          {/* Link */}
          <TiptapButton
            type="button"
            data-style="ghost"
            data-active-state={editor.isActive('link') ? 'on' : 'off'}
            onClick={() => setShowLinkInput(!showLinkInput)}
            tooltip="Add Link"
          >
            <LinkIcon className="h-4 w-4" />
          </TiptapButton>

          {editor.isActive('link') && (
            <TiptapButton
              type="button"
              data-style="ghost"
              onClick={handleLinkRemove}
              tooltip="Remove Link"
            >
              <Link2Off className="h-4 w-4" />
            </TiptapButton>
          )}

          <div className="w-px h-6 bg-[var(--color-border)] mx-1" />

          {/* Undo/Redo */}
          <TiptapButton
            type="button"
            data-style="ghost"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            tooltip="Undo"
          >
            <Undo className="h-4 w-4" />
          </TiptapButton>

          <TiptapButton
            type="button"
            data-style="ghost"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            tooltip="Redo"
          >
            <Redo className="h-4 w-4" />
          </TiptapButton>
        </div>

        {/* Link Input */}
        {showLinkInput && (
          <div className="flex items-center gap-2 mt-3 p-3 bg-[var(--color-background)] rounded border border-[var(--color-border)]">
            <Input
              type="url"
              placeholder="https://example.com"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleLinkAdd();
                }
              }}
              className="flex-1"
            />
            <TiptapButton type="button" onClick={handleLinkAdd}>
              Add
            </TiptapButton>
            <TiptapButton type="button" data-style="ghost" onClick={() => setShowLinkInput(false)}>
              Cancel
            </TiptapButton>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="border-t border-[var(--color-border)] px-4 py-2 bg-[var(--color-muted)] text-xs text-[var(--color-muted-foreground)]">
        <div className="flex justify-between items-center">
          <span>💡 Tip: Images can be resized | Use task list for todos</span>
          <span>{editor.storage.characterCount?.characters() || 0} characters</span>
        </div>
      </div>
    </>
  );
};
