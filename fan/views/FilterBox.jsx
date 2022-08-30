import React, { useCallback, useContext, useState } from 'react';
import {
  ButtonSubmit,
  FormInputDropdown,
  FormInputText,
  WrapperButton,
  WrapperTitle,
} from 'components/FromFeature/form-components';
import DateSelectGroup from 'components/WrapperSelect/select.date';
import { checkParams } from 'constants';
import { STATUS_TRANSACTION } from 'constants';
import { enterToSearch } from 'utils/utils';
import { FanContext } from 'Context';

export const FilterBox = () => {
  const fanContext = useContext(FanContext);
  const {
    isHistoryPayment,
    isPointHistory,
    handleSubmit,
    control,
    isManage,
    count,
    dispatchState,
  } = fanContext;
  const [dateValue, setDateValue] = useState({});
  const handleSetCount = useCallback(
    () => dispatchState({ type: 'SET_COUNT', payload: count + 1 }),
    [count]
  );
  const setQuery = useCallback(
    (data) => dispatchState({ type: 'SET_QUERY', payload: data }),
    []
  );

  const onSubmit = useCallback(
    (data) => {
      setQuery(checkParams({ ...data, ...dateValue }));
      handleSetCount();
    },
    [count, dateValue]
  );
  return (
    <>
      {(isHistoryPayment || isPointHistory) && (
        <WrapperButton justifyContent>
          <WrapperTitle>
            期間
            <DateSelectGroup
              handleSelect={(key, value) => {
                setDateValue((prev) => ({ ...prev, [`${key}`]: value }));
              }}
            />
          </WrapperTitle>
        </WrapperButton>
      )}
      <WrapperButton wrap='true'>
        {isHistoryPayment && (
          <WrapperTitle>
            購入種類
            <FormInputDropdown name='type' control={control} option={STATUS_TRANSACTION} />
          </WrapperTitle>
        )}
        <WrapperButton width='600px'>
          <FormInputText
            inputProps={{
              onKeyDown: (e) => {
                enterToSearch(e, handleSubmit(onSubmit));
              },
            }}
            name={isManage ? 'keyword' : 'full_name'}
            isSearch
            control={control}
            label={isManage ? 'キーワード検索' : 'ファンの氏名を入力'}
          />
          <ButtonSubmit onClick={handleSubmit(onSubmit)} variant='contained' bgtheme='primary'>
            検索
          </ButtonSubmit>
        </WrapperButton>
      </WrapperButton>
    </>
  );
};
