import WrapperTable from 'components/Table';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Content, WrapperContent, WrapperForm } from 'components/FromFeature/form-components';
import {
  columnContent,
  columnDonate,
  columnPoint,
  columnSubscription,
  paramsDetail,
} from '../settings';
import { TabsAccountFanSecond } from '../settings/tabs';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getDetailFanAccount,
  getListFanContent,
  getListFanDonate,
  getListFanPoint,
  getListFanSubcription,
} from 'store/actions/fan.action';
import { PATH_URL } from 'constants/routes/settingUrl';
import { getRenderInput } from 'constants';
import { checkTypeCell } from 'utils/utils';

const DetailRegistration = ({ isDetail, isNotDetail, type }) => {
  const methods = useForm({ mode: 'all', defaultValues: isDetail ? paramsDetail : {} });
  const { control, setValue } = methods;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { detailFan, listSubscription, listContent, listPoint, listDonate, pagination } =
    useSelector((state) => state.fan);
  const { id } = useParams();
  useEffect(() => {
    Object.keys(detailFan).length === 0 &&
      dispatch(
        getDetailFanAccount(
          id,
          () => {},
          () => navigate(`/${PATH_URL.FAN}`)
        )
      );
  }, []);

  useEffect(() => {
    if (isDetail && Object.keys(detailFan).length > 0) {
      for (let key in paramsDetail) {
        setValue(key, detailFan[key] || '');
        key === 'status' &&
          setValue(
            key,
            detailFan.first_login > 0 ? checkTypeCell('status', detailFan[key]) : '未ログイン'
          );
        key === 'gender' && setValue(key, checkTypeCell('gender', detailFan[key]));
        key === 'birthday' && setValue(key, checkTypeCell('date', detailFan[key]));
      }
    }
  }, [detailFan]);
  const renderTable = [
    {
      id: 1,
      type: 'subscription',
      col: columnSubscription,
      total: pagination?.total,
      list: listSubscription,
      action: (prev) => getListFanSubcription(id, prev),
      noRow: 'サブスクリプション購入履歴がありません。',
      noResult: 'サブスクリプション購入履歴がありません。',
    },
    {
      id: 2,
      type: 'content',
      col: columnContent,
      total: pagination?.total,
      list: listContent,
      action: (prev) => getListFanContent(id, prev),
      noRow: 'コンテンツ購入履歴がありません。',
      noResult: 'コンテンツ購入履歴がありません。',
    },
    {
      id: 3,
      type: 'point',
      col: columnPoint,
      total: pagination?.total,
      list: listPoint,
      action: (prev) => getListFanPoint(id, prev),
      noRow: 'ポイント購入履歴がありません。',
      noResult: 'ポイント購入履歴がありません。',
    },
    {
      id: 4,
      type: 'donate',
      col: columnDonate,
      total: pagination?.total,
      list: listDonate,
      action: (prev) => getListFanDonate(id, prev),
      noRow: '投げ銭履歴がありません。',
      noResult: '投げ銭履歴がありません。',
    },
  ];
  const renderForm = [
    {
      content: '氏名',
      name: 'full_name',
      control,
      type: 'text',
      props: {
        mwidth: '520px',
        disabled: isDetail,
      },
    },
    {
      content: '氏名（ローマ字）',
      name: 'name_romaji',
      control,
      type: 'text',
      props: {
        mwidth: '520px',
        disabled: isDetail,
      },
    },
    {
      content: '生年月日',
      name: 'birthday',
      control,
      type: 'text',
      props: {
        mwidth: '520px',
        disabled: isDetail,
      },
    },
    {
      content: '性別',
      name: 'gender',
      control,
      type: 'text',
      props: {
        mwidth: '520px',
        disabled: isDetail,
      },
    },
    {
      content: 'メールアドレス',
      name: 'email',
      control,
      type: 'text',
      props: {
        mwidth: '520px',
        disabled: isDetail,
      },
    },
    {
      content: 'ステータス',
      name: 'status',
      control,
      type: 'text',
      props: {
        mwidth: '520px',
        disabled: isDetail,
      },
    },
  ];
  return (
    <>
      <TabsAccountFanSecond />
      {isDetail && (
        <WrapperForm>
          {renderForm.map((item, index) => {
            let { content, show = true } = item;
            return (
              <WrapperContent key={index} {...item?.newProps}>
                {show && <Content>{content}</Content>}
                {getRenderInput(item)}
              </WrapperContent>
            );
          })}
        </WrapperForm>
      )}
      {isNotDetail &&
        renderTable
          .filter((tp) => tp.type === type)
          .map((item) => {
            let { id, col, total, list, action, noRow, noResult } = item;
            return (
              <WrapperTable
                contentNoRow={noRow}
                contentNoResult={noResult}
                key={id}
                columns={col}
                total={total}
                listRows={list}
                action={action}
              />
            );
          })}
    </>
  );
};
export { DetailRegistration };
DetailRegistration.propTypes = {
  isDetail: PropTypes.bool,
  isNotDetail: PropTypes.bool,
  type: PropTypes.string,
};
DetailRegistration.defaultProps = {
  isDetail: false,
  isNotDetail: false,
  type: '',
};
