import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { ClassValue } from 'clsx'; // Gunakan "type" untuk impor tipe

// Fungsi untuk menggabungkan kelas
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
