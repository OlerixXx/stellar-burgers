import { ProfileOrdersUI } from '@ui-pages';
import { TIngredient, TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchOrders,
  getAllOrders,
  isOrdersRequest
} from '../../components/slices/ordersSlice';
import { getIngredients } from '../../components/slices/ingredientsSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(getAllOrders);
  const ordersRequest: boolean = useSelector(isOrdersRequest);
  const ingredients: TIngredient[] = useSelector(getIngredients);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} ordersRequest={ordersRequest} />;
};
