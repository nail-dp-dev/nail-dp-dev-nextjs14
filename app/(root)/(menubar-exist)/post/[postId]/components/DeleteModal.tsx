import ConfirmModal from '../../../../../components/ui/ConfirmModal';


type DeleteModalProps = {
  onConfirm: (commentId: number) => void;
  onCancel: () => void;
  commentId: number;
};

export default function DeleteModal({ onConfirm, onCancel, commentId }: DeleteModalProps) {
  const handleConfirm = () => {
    onConfirm(commentId);
  };

  return (
    <ConfirmModal
      onConfirm={handleConfirm}
      onCancel={onCancel}
      message="해당 댓글을 삭제하시겠습니까?"
      confirmText="삭제"
      cancelText="취소"
    />
  );
}
