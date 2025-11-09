import { Modal } from './Modal';
import { Button } from './Button';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'primary';
}

export const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  cancelText,
  variant = 'danger',
}: ConfirmationModalProps) => {
  const handleConfirm = (onAnimatedClose: () => void) => {
    onConfirm();
    onAnimatedClose();
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleCancel = (onAnimatedClose: () => void) => {
    onAnimatedClose();
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      {(onAnimatedClose) => (
        <>
          <p className="text-gray-700 dark:text-gray-300 mb-6">{message}</p>
          <div className="flex flex-col sm:flex-row justify-end gap-3">
            <Button
              variant="secondary"
              onClick={() => handleCancel(onAnimatedClose)}
              className="w-full sm:w-auto"
            >
              {cancelText || 'Cancel'}
            </Button>
            <Button
              variant={variant}
              onClick={() => handleConfirm(onAnimatedClose)}
              className="w-full sm:w-auto"
            >
              {confirmText || 'Confirm'}
            </Button>
          </div>
        </>
      )}
    </Modal>
  );
};

