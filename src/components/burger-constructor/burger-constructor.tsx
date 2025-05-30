import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  deleteAllFromConstructor,
  getConstructorSelector
} from '../../services/slices/constructorSlice';
import {
  getOrder,
  getOrderRequest,
  orderBurger,
  resetOrder
} from '../../services/slices/orderSlice';
import { useNavigate } from 'react-router-dom';
import { getUserSelector } from '../../services/slices/userSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector(getConstructorSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderRequest = useSelector(getOrderRequest);

  const orderModalData = useSelector(getOrder);

  const user = useSelector(getUserSelector);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!user) {
      navigate('/login');
      return;
    }

    const newOrder = [];
    newOrder.push(constructorItems.bun?._id);

    constructorItems.ingredients.forEach((ingredient) =>
      newOrder.push(ingredient._id)
    );

    dispatch(orderBurger(newOrder));
  };

  const closeOrderModal = () => {
    dispatch(deleteAllFromConstructor());
    dispatch(resetOrder());
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
