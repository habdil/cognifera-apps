"use client"

import * as React from "react"
import { useHotkeys } from "react-hotkeys-hook"
import { type Editor } from "@tiptap/react"

// --- Hooks ---
import { useTiptapEditor } from "@/hooks/use-tiptap-editor"
import { useIsMobile } from "@/hooks/use-mobile"

// --- Lib ---
import {
  isExtensionAvailable,
  isNodeTypeSelected,
} from "@/lib/tiptap-utils"

// --- Icons ---
import { ImagePlusIcon } from "@/components/tiptap-icons/image-plus-icon"

export const IMAGE_UPLOAD_SHORTCUT_KEY = "mod+shift+i"

/**
 * Configuration for the image upload functionality
 */
export interface UseImageUploadConfig {
  /**
   * The Tiptap editor instance.
   */
  editor?: Editor | null
  /**
   * The name of the image extension to target.
   * @default "imageUpload"
   */
  extensionName?: string
  /**
   * Whether the button should hide when insertion is not available.
   * @default false
   */
  hideWhenUnavailable?: boolean
  /**
   * Callback function called after a successful image insertion.
   */
  onInserted?: () => void
}

/**
 * Checks if image can be inserted in the current editor state
 */
export function canInsertImage(editor: Editor | null, extensionName: string = "imageUpload"): boolean {
  if (!editor || !editor.isEditable) return false
  if (
    !isExtensionAvailable(editor, extensionName) ||
    isNodeTypeSelected(editor, ["image"])
  )
    return false

  // For imageResize extension, check if we can use setImage command
  if (extensionName === "imageResize") {
    return editor.can().setImage({ src: '' })
  }

  return editor.can().insertContent({ type: extensionName })
}

/**
 * Checks if image is currently active
 */
export function isImageActive(editor: Editor | null, extensionName: string = "imageUpload"): boolean {
  if (!editor || !editor.isEditable) return false
  return editor.isActive(extensionName)
}

/**
 * Handles image file upload and insertion
 */
export function uploadAndInsertImage(editor: Editor | null, extensionName: string = "imageUpload", onInserted?: () => void): void {
  if (!editor || !editor.isEditable) return
  if (!canInsertImage(editor, extensionName)) return

  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'
  input.onchange = (e) => {
    const file = (e.target as HTMLInputElement).files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const url = event.target?.result as string
        if (url) {
          let success = false

          // For imageResize extension, use setImage command
          if (extensionName === "imageResize") {
            success = editor.chain().focus().setImage({ src: url }).run()
          } else {
            // For imageUpload extension, use insertContent
            success = editor
              .chain()
              .focus()
              .insertContent({
                type: extensionName,
                attrs: { src: url }
              })
              .run()
          }

          if (success) {
            onInserted?.()
          }
        }
      }
      reader.readAsDataURL(file)
    }
  }
  input.click()
}

/**
 * Inserts an image in the editor (kept for backwards compatibility)
 */
export function insertImage(editor: Editor | null, extensionName: string = "imageUpload"): boolean {
  if (!editor || !editor.isEditable) return false
  if (!canInsertImage(editor, extensionName)) return false

  try {
    return editor
      .chain()
      .focus()
      .insertContent({
        type: extensionName,
      })
      .run()
  } catch {
    return false
  }
}

/**
 * Determines if the image button should be shown
 */
export function shouldShowButton(props: {
  editor: Editor | null
  hideWhenUnavailable: boolean
  extensionName?: string
}): boolean {
  const { editor, hideWhenUnavailable, extensionName = "imageUpload" } = props

  if (!editor || !editor.isEditable) return false
  if (!isExtensionAvailable(editor, extensionName)) return false

  if (hideWhenUnavailable && !editor.isActive("code")) {
    return canInsertImage(editor, extensionName)
  }

  return true
}

/**
 * Custom hook that provides image functionality for Tiptap editor
 *
 * @example
 * ```tsx
 * // Simple usage - no params needed
 * function MySimpleImageButton() {
 *   const { isVisible, handleImage } = useImageUpload()
 *
 *   if (!isVisible) return null
 *
 *   return <button onClick={handleImage}>Add Image</button>
 * }
 *
 * // Advanced usage with configuration
 * function MyAdvancedImageButton() {
 *   const { isVisible, handleImage, label, isActive } = useImageUpload({
 *     editor: myEditor,
 *     extensionName: "imageResize", // For ResizableImageTemplate
 *     hideWhenUnavailable: true,
 *     onInserted: () => console.log('Image inserted!')
 *   })
 *
 *   if (!isVisible) return null
 *
 *   return (
 *     <MyButton
 *       onClick={handleImage}
 *       aria-pressed={isActive}
 *       aria-label={label}
 *     >
 *       Add Image
 *     </MyButton>
 *   )
 * }
 * ```
 */
export function useImageUpload(config?: UseImageUploadConfig) {
  const {
    editor: providedEditor,
    extensionName = "imageUpload",
    hideWhenUnavailable = false,
    onInserted,
  } = config || {}

  const { editor } = useTiptapEditor(providedEditor)
  const isMobile = useIsMobile()
  const [isVisible, setIsVisible] = React.useState<boolean>(true)
  const canInsert = canInsertImage(editor, extensionName)
  const isActive = isImageActive(editor, extensionName)

  React.useEffect(() => {
    if (!editor) return

    const handleSelectionUpdate = () => {
      setIsVisible(shouldShowButton({ editor, hideWhenUnavailable, extensionName }))
    }

    handleSelectionUpdate()

    editor.on("selectionUpdate", handleSelectionUpdate)

    return () => {
      editor.off("selectionUpdate", handleSelectionUpdate)
    }
  }, [editor, hideWhenUnavailable, extensionName])

  const handleImage = React.useCallback(() => {
    if (!editor) return false

    uploadAndInsertImage(editor, extensionName, onInserted)
    return true
  }, [editor, extensionName, onInserted])

  useHotkeys(
    IMAGE_UPLOAD_SHORTCUT_KEY,
    (event) => {
      event.preventDefault()
      handleImage()
    },
    {
      enabled: isVisible && canInsert,
      enableOnContentEditable: !isMobile,
      enableOnFormTags: true,
    }
  )

  return {
    isVisible,
    isActive,
    handleImage,
    canInsert,
    label: "Add image",
    shortcutKeys: IMAGE_UPLOAD_SHORTCUT_KEY,
    Icon: ImagePlusIcon,
  }
}
