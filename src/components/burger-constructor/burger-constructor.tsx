import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  BurgerConstructorState,
  clearConstructor,
  getBun,
  getIngredients
} from '../slices/burgerConstructorSlice';
import { getUser } from '../slices/userSlice';
import {
  clearNewOrder,
  fetchNewOrder,
  getNewOrder,
  isNewOrderRequest
} from '../slices/ordersSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems: BurgerConstructorState = {
    bun: useSelector(getBun),
    ingredients: useSelector(getIngredients)
  };
  const orderRequest = useSelector(isNewOrderRequest);
  const orderModalData = useSelector(getNewOrder);
  const user = useSelector(getUser);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (user === null) {
      navigate('/login');
    } else {
      dispatch(
        fetchNewOrder([
          constructorItems.bun._id,
          ...constructorItems.ingredients.map((item) => item._id),
          constructorItems.bun._id
        ])
      );
    }
    // .unwrap()
    // .then(response => {
    //   orderModalData = response.order
    // })
    // .catch(({message}) => alert(message))
  };
  const closeOrderModal = () => {
    dispatch(clearConstructor());
    dispatch(clearNewOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
