import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

interface ClientPortalProps {
  children: ReactNode;
}

const ClientPortal = ({ children }: ClientPortalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) {
    return null;
  }

  return createPortal(children, document.body);
};

export default ClientPortal;
