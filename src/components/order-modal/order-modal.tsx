import { useNavigate, useParams } from 'react-router-dom';
import { Modal, OrderInfo } from '@components';
import { FC } from 'react';

export const OrderModal: FC = () => {
  const { number } = useParams();
  const navigate = useNavigate();

  return (
    <Modal title={`#${number}`} onClose={() => navigate(-1)}>
      <OrderInfo />
    </Modal>
  );
};
