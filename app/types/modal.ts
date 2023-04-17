import type React from "react";

export interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}
