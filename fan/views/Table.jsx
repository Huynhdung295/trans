import React, { useContext } from 'react';
import WrapperTable from 'components/Table';
import { PATH_URL } from 'constants/routes/settingUrl';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  getDetailFanAccount,
  getListFanAccount,
  getListFanPayment,
  getListFanTransaction,
} from 'store/actions/fan.action';
import { columnPaymentHistory, columnPointHistory, mainColumn } from '../settings';
import { FanContext } from 'Context';


export const Table = () => {
  const fanContext = useContext(FanContext);
  const { isManage, isPointHistory, isHistoryPayment, query, count } = fanContext;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGetDetail = (id, type) => {
    dispatch(
      getDetailFanAccount(
        id,
        () =>
          navigate(
            `/${PATH_URL.FAN}${type === 'edit' ? `/edit` : '/detail-registration'}/${id}`
          ),
        () => navigate(`/${PATH_URL.FAN}`)
      )
    );
  };
  const { listFansAccount, pagination, listPaymentHistory, listPointHistory } = useSelector(
    (state) => state.fan
  );
  return (
    <WrapperTable
      columns={
        isManage
          ? mainColumn(
              (id) => handleGetDetail(id, 'detail'),
              (id) => handleGetDetail(id, 'edit'),
              () => {}
            )
          : isPointHistory
          ? columnPaymentHistory
          : isHistoryPayment
          ? columnPointHistory
          : []
      }
      total={pagination.total}
      countSearch={count}
      getRowId={(row) => row['id']}
      listRows={
        isManage
          ? listFansAccount
          : isPointHistory
          ? listPaymentHistory
          : isHistoryPayment
          ? listPointHistory
          : []
      }
      query={query}
      action={(prev) =>
        isManage
          ? getListFanAccount(prev)
          : isPointHistory
          ? getListFanPayment(prev)
          : isHistoryPayment
          ? getListFanTransaction(prev)
          : () => {}
      }
    />
  );
};
