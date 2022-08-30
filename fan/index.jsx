import React, { useReducer } from 'react';
import { useForm } from 'react-hook-form';
import { TabsAccountFan } from './settings/tabs';
import { Table } from './views/Table';
import { FilterBox } from './views/FilterBox';
import { FanContext, FanPropTypes, FanReducer } from 'Context';
const AccountFanPage = ({ isManage, isHistoryPayment, isPointHistory }) => {
  const defaultValues = {
    keyword: '',
    full_name: '',
  };
  const methods = useForm({ mode: 'all', defaultValues: defaultValues });
  const [state, dispatchState] = useReducer(FanReducer.reducer, FanReducer.initialState);
  const { handleSubmit, control } = methods;
  const { query, count } = state;

  return (
    <>
      <TabsAccountFan />
      <FanContext.Provider
        value={{
          isManage,
          isHistoryPayment,
          isPointHistory,
          handleSubmit,
          control,
          query,
          count,
          dispatchState,
        }}>
        <FilterBox />
        <Table />
      </FanContext.Provider>
    </>
  );
};

AccountFanPage.propTypes = FanPropTypes.typesMain;
AccountFanPage.defaultProps = FanPropTypes.defaultMain

export { AccountFanPage };
