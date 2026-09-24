"use client";

import { useRef, useState } from "react";
import { ContentImage } from "@/components/shared/ContentImage";
import { toast } from "sonner";
import { ImagePlus, Loader2, X } from "lucide-react";
import { uploadImage, type UploadFolder } from "@/lib/upload-client";

type SingleProps = {
  folder: UploadFolder;
  value: string;
  onChange: (url: string) => void;
  label: string;
};

export function ImageUploadField({ folder, value, onChange, label }: SingleProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setUploading(true);
    try {
      const { url } = await uploadImage(file, folder);
      onChange(url);
      toast.success("Gambar terunggah.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload gagal.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      {value ? (
        <div className="relative w-32 aspect-[3/4] bg-gray-50 border border-gray-200 group">
          <ContentImage src={value} alt={label} fill className="object-contain p-1" sizes="128px" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Hapus gambar"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="w-32 aspect-[3/4] border border-dashed border-gray-300 hover:border-primary text-gray-400 hover:text-primary flex flex-col items-center justify-center gap-2 text-xs transition-colors"
        >
          {uploading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <ImagePlus className="w-5 h-5" />
              {label}
            </>
          )}
        </button>
      )}
    </div>
  );
}

type MultiProps = {
  folder: UploadFolder;
  values: string[];
  onChange: (urls: string[]) => void;
};

export function MultiImageUploadField({ folder, values, onChange }: MultiProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      const uploaded: string[] = [];
      for (const file of Array.from(files)) {
        const { url } = await uploadImage(file, folder);
        uploaded.push(url);
      }
      onChange([...values, ...uploaded]);
      toast.success(`${uploaded.length} gambar terunggah.`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload gagal.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-wrap gap-3">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      {values.map((url, index) => (
        <div key={url + index} className="relative w-24 aspect-[3/4] bg-gray-50 border border-gray-200 group">
          <ContentImage src={url} alt={`Preview ${index + 1}`} fill className="object-contain p-1" sizes="96px" />
          <button
            type="button"
            onClick={() => onChange(values.filter((_, i) => i !== index))}
            className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Hapus gambar"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="w-24 aspect-[3/4] border border-dashed border-gray-300 hover:border-primary text-gray-400 hover:text-primary flex flex-col items-center justify-center gap-1.5 text-[11px] transition-colors"
      >
        {uploading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            <ImagePlus className="w-4 h-4" />
            Tambah
          </>
        )}
      </button>
    </div>
  );
}
