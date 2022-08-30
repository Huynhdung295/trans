import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ButtonSubmit } from '../../../components/FromFeature/form-element/styledElement';
import {
  Content,
  WrapperContent,
  WrapperForm,
  WrapperButtonForm,
} from '../../../components/FromFeature/form-element/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { AlertDialog } from 'components/Dialog';
import {
  approveFanAccount,
  deleteAccountFan,
  getDetailFanAccount,
  updateFanAccount,
} from 'store/actions/fan.action';
import { PATH_URL } from 'constants/routes/settingUrl';
import { getRenderInput } from 'constants';
import { statusToTextButton } from 'constants';
import { checkTypeCell } from 'utils/utils';
import { paramsEdit, schemaEdit } from '../settings';
import { renderForm } from './configForm';
export const FormEdit = ({ isEdit = false }) => {
  const methods = useForm({
    mode: 'all',
    defaultValues: paramsEdit,
    resolver: yupResolver(schemaEdit),
  });
  const { handleSubmit, control, setValue } = methods;
  const navagation = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { detailFan } = useSelector((state) => state.fan);
  useEffect(() => {
    isEdit &&
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
    if (isEdit && Object.keys(detailFan).length > 0) {
      for (let key in paramsEdit) {
        if (detailFan[key] !== null) {
          setValue(key, detailFan[key]);
          key === 'status' &&
            setValue(
              key,
              detailFan.first_login > 0
                ? checkTypeCell('status', detailFan[key])
                : '未ログイン'
            );
        }
      }
    }
  }, [detailFan]);

  const deleteFanAccount = (account) => {
    dispatch(deleteAccountFan(account, () => navigate(`/${PATH_URL.FAN}`)));
  };
  const updateAccount = (data) => {
    isEdit && dispatch(updateFanAccount(data, id, () => navigate(`/${PATH_URL.FAN}`), paramsEdit));
  };
  const approveAccount = () => {
    dispatch(approveFanAccount(id, () => navigate(`/${PATH_URL.FAN}`)));
  };

  return (
    <>
      <WrapperForm>
        {renderForm({ control }).map((item, index) => {
          let { content, show = true, type } = item;
          return (
            <WrapperContent key={index} {...item?.newProps}>
              {show && <Content>{content}</Content>}
              {type === 'text' ? <div>{getRenderInput(item)}</div> : getRenderInput(item)}
            </WrapperContent>
          );
        })}

        <WrapperButtonForm  wrap='true' gap='20px' mgl="0" width="640px">
          <ButtonSubmit
            onClick={() => {
              navagation(`/${PATH_URL.FAN}/manage`);
            }}
            variant='outlined'>
            キャンセル
          </ButtonSubmit>
          {detailFan?.status !== 5 && (
            <>
              <AlertDialog
                handleAccpet={handleSubmit(updateAccount)}
                addAccept
                title='アカウント編集'
                content='アカウントを編集してもよろしいですか？'
              />
              <AlertDialog
                handleAccpet={approveAccount}
                updateStatus={statusToTextButton?.[detailFan?.status]?.text || '---'}
                title={statusToTextButton?.[detailFan?.status]?.title}
                content={statusToTextButton?.[detailFan?.status]?.confirm}
              />
            </>
          )}
          <AlertDialog
            handleAccpet={() => deleteFanAccount(id)}
            addDelete
            title='アカウント削除'
            content={`${detailFan?.full_name}のアカウントを削除してもよろしいでしょうか。`}
          />
        </WrapperButtonForm>
      </WrapperForm>
    </>
  );
};

export default FormEdit;
