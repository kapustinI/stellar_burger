import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getAllUserOrdersSelector,
  getUserOrders
} from '../../services/slices/userOrdersSlice';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(getAllUserOrdersSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
