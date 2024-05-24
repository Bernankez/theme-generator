export function download(file: File): void;
export function download(file: Blob, filename: string): void;
export function download(file: Blob | File, filename?: string) {
  const a = document.createElement("a");
  const name = file instanceof File ? file.name : filename!;
  const url = URL.createObjectURL(file);
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}
