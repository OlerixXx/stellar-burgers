import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchFeedOrders,
  getFeedOrders
} from '../../components/slices/feed-orders/feedOrdersSlice';
import { getIngredients } from '../../components/slices/ingredients/ingredientsSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  /** TODO: взять переменную из стора */
  const ingredients = useSelector(getIngredients);
  const feedOrders = useSelector(getFeedOrders);
  const orders: TOrder[] = feedOrders.orders;

  useEffect(() => {
    dispatch(fetchFeedOrders());
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => dispatch(fetchFeedOrders())}
    />
  );
};
