import { useRef, useEffect, useState } from "react";
import Modal from "../modal/modal";
import "./portfolio-modal.scss";
import { Box } from "@mui/material";
import { ClientOnlyPortfolio } from "@components/portfolio/portfolio";

export interface PortfolioModalData {
  email: string;
  digestType: "daily" | "weekly" | "monthly";
}

interface SearchModalProps {
  isOpen: boolean;
  modalData: PortfolioModalData;
  onClose: () => void;
  onSubmit: (data: PortfolioModalData) => void;
}

const PortfolioModal = ({
  isOpen,
  modalData,
  onClose,
  onSubmit,
}: SearchModalProps) => {
  const focusInputRef = useRef<HTMLInputElement>(null);

  // Local state to manage form values
  const [formData, setFormData] = useState<PortfolioModalData>(modalData);

  // Focus on the email field when modal opens
  useEffect(() => {
    if (isOpen && focusInputRef.current) {
      setTimeout(() => {
        focusInputRef.current!.focus();
      }, 0);
    }
  }, [isOpen]);

  const handleClose = () => {
    setFormData(modalData);
    onClose();
  };

  return (
    <Modal hasCloseBtn={false} isOpen={isOpen} onClose={handleClose}>
      <div className="l-portfolio-modal">
        <h1>Create a new Portfolio</h1>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "flex-end",
            marginRight: "1rem",
            flexDirection: "column",
          }}
        >
          {isOpen && (
            <ClientOnlyPortfolio isOpen={false} onClose={handleClose} />
          )}
        </Box>
      </div>
    </Modal>
  );
};

export default PortfolioModal;
