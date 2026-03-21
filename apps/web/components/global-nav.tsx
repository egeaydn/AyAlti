"use client";

import { useState } from "react";
import { BottomNav } from "@/components/bottom-nav";
import { ShareModal } from "@/components/share-modal";

export function GlobalNav() {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  return (
    <>
      <BottomNav onOpenShareAction={() => setIsShareModalOpen(true)} />
      <ShareModal 
        isOpen={isShareModalOpen} 
        onClose={() => setIsShareModalOpen(false)} 
      />
    </>
  );
}
