import React, { useRef, useEffect, useState } from "react";
import Modal from "../modal/modal";
import "./search-modal.scss";
import { ClientOnlySearchBar } from "@components/search/search";
import { Box } from "@mui/material";

export interface SearchModalData {
  email: string;
  digestType: "daily" | "weekly" | "monthly";
}

interface SearchModalProps {
  isOpen: boolean;
  modalData: SearchModalData;
  onClose: () => void;
  onSubmit: (data: SearchModalData) => void;
}

const SearchModal = ({
  isOpen,
  modalData,
  onClose,
  onSubmit,
}: SearchModalProps) => {
  const focusInputRef = useRef<HTMLInputElement>(null);

  // Local state to manage form values
  const [formData, setFormData] = useState<SearchModalData>(modalData);

  // Focus on the email field when modal opens
  useEffect(() => {
    if (isOpen && focusInputRef.current) {
      setTimeout(() => {
        focusInputRef.current!.focus();
      }, 0);
    }
  }, [isOpen]);

  // Update local form state
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    onSubmit(formData);
  };

  const handleClose = () => {
    setFormData(modalData);
    onClose();
  };

  return (
    <Modal hasCloseBtn={false} isOpen={isOpen} onClose={handleClose}>
      <div className="l-search-modal">
        <h1>Type an investment name or symbol</h1>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', justifyContent: 'flex-end', marginRight: '1rem' } }}>
          <ClientOnlySearchBar />
        </Box>
      </div>
    </Modal>
  );
};

export default SearchModal;