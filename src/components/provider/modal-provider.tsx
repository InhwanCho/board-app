'use client';

import { useEffect, useState } from "react";
import RenameModal from "../modals/rename-modal";



export default function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) { return null }
  return (
    <>
      <RenameModal />
    </>
  )
}
