import { supabase } from '../lib/supabase';

/**
 * Compress an image file using HTML Canvas
 */
const compressImage = (file: File, maxQuality = 0.8, maxWidth = 1200): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Resize if larger than maxWidth
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(file); // fallback to original file
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              resolve(file); // fallback
            }
          },
          'image/jpeg',
          maxQuality
        );
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
};

export const storageService = {
  /**
   * Upload an image to Supabase Storage and return its public URL
   */
  async uploadImage(file: File): Promise<string> {
    try {
      // 1. Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        throw new Error('Format file tidak didukung. Harap upload gambar (JPG, PNG, GIF, WEBP).');
      }

      // 2. Client-side compression for large images
      let uploadData: Blob | File = file;
      if (file.size > 1 * 1024 * 1024) { // > 1MB
        try {
          uploadData = await compressImage(file);
        } catch (compressErr) {
          console.warn('Image compression failed, uploading original:', compressErr);
        }
      }

      // 3. Generate a clean, unique file path
      const fileExt = file.name.split('.').pop() || 'jpg';
      const cleanFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
      const filePath = `lessons/${cleanFileName}`;

      // 4. Upload to Supabase Storage bucket 'lesson-images'
      const { error: uploadError } = await supabase.storage
        .from('lesson-images')
        .upload(filePath, uploadData, {
          contentType: file.type,
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        // Handle common errors like bucket not existing or RLS blocking
        if (uploadError.message.includes('Bucket not found')) {
          throw new Error('Bucket "lesson-images" tidak ditemukan di Supabase. Silakan buat bucket tersebut di dashboard Supabase Anda dan atur agar publik.');
        }
        throw uploadError;
      }

      // 5. Get public URL
      const { data } = supabase.storage
        .from('lesson-images')
        .getPublicUrl(filePath);

      if (!data?.publicUrl) {
        throw new Error('Gagal mendapatkan public URL gambar.');
      }

      return data.publicUrl;
    } catch (error: any) {
      console.error('Error in uploadImage:', error);
      throw error;
    }
  }
};
