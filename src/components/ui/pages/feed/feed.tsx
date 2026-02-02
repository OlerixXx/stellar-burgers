import { FC, memo } from 'react';

import styles from './feed.module.css';

import { FeedUIProps } from './type';
import { FeedInfo, OrdersList } from '@components';
import { RefreshButton } from '@zlden/react-developer-burger-ui-components';
import { Preloader } from '@ui';
import { useSelector } from '../../../../services/store';
import { ordersIsLoading } from '../../../slices/feed-orders/feedOrdersSlice';

export const FeedUI: FC<FeedUIProps> = memo(({ orders, handleGetFeeds }) => {
  const isLoading = useSelector(ordersIsLoading);

  return (
    <main className={styles.containerMain}>
      <div className={`${styles.titleBox} mt-10 mb-5`}>
        <h1 className={`${styles.title} text text_type_main-large`}>
          Лента заказов
        </h1>
        <RefreshButton
          text='Обновить'
          onClick={handleGetFeeds}
          extraClass={'ml-30'}
        />
      </div>
      <div className={styles.main}>
        <div className={styles.columnOrders}>
          {isLoading ? <Preloader /> : <OrdersList orders={orders} />}
        </div>
        <div className={styles.columnInfo}>
          <FeedInfo />
        </div>
      </div>
    </main>
  );
});
