import { createClient } from "@supabase/supabase-js";

// Eğer Next.js dev server .env dosyasındaki yeni değerleri henüz okumadıysa, sorunsuz çalışması için varsayılan değerler atıyoruz.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://vfnvzdcquyukorijwkmj.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_DEFAULT_KEY || "sb_publishable_jM_9LSF9eLVlEw0fydkscg_fJdJ-c0I";

export const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * LocalStorage üzerinden tarayıcıya/kullanıcıya özel kalıcı bir Anonim ID üretir ve okur.
 */
export function getAuthorId(): string {
  if (typeof window === "undefined") return ""; 
  
  let anonId = localStorage.getItem("anon_author_id");
  if (!anonId) {
    // Tarayıcı için rastgele güvenli UUID üret.
    anonId = crypto.randomUUID();
    localStorage.setItem("anon_author_id", anonId);
  }
  
  return anonId;
}
