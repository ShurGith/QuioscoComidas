import { Product } from "@prisma/client";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (type: 'soft' | 'hard') => void;
  product: Product | null;
  loading: boolean;
}

export default const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  product,
  loading
}) => {
  if (!isOpen || !product) return null;

  const handleSoftDelete = () => onConfirm('soft');
  const handleHardDelete = () => onConfirm('hard');

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && !loading) {
      onClose();
    }
  };

  return (

    < button
      type="button"
      onClick={handleHardDelete}
      disabled={loading}
      className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
    >

    </button>
  );
}
