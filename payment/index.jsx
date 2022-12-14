import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import WrapperTable, { WrapperTableStatic } from 'components/Table';
import {
  ButtonSubmit,
  WrapperButton,
  WrapperDropdown,
  WrapperTitle,
} from '../../components/FromFeature/form-element/styledElement';

import { useForm } from 'react-hook-form';
import {
  FormInputDate,
  FormInputDropdown,
  FormInputText,
} from 'components/FromFeature/form-components';
import DateSelectGroup from 'components/WrapperSelect/select.date';
import { TabsPayment } from './settings/tabs';
import {
  columnsAffliliator,
  columnsAgency,
  columnsCreator,
  columnsHistoryCsv,
} from './settings';
import {
  Content,
  WrapperContent,
  WrapperShowTable,
} from 'components/FromFeature/form-element/styled';
import {
  getDataCsvPayment,
  getHistoryCsvPayment,
  getListPayment,
  updateStatusPayment,
} from 'store/actions/payment.action';
import { useDispatch, useSelector } from 'react-redux';
import { STATUS_PAYMENT } from 'constants';
import { CSVLink } from 'components/ExportCSV';
import { checkParams } from 'constants';
import { paymentAPI } from 'apis';
// import { useDebounce } from 'hooks';
import { checkTypeCell } from 'utils/utils';
import { AlertDialog } from 'components/Dialog';
import { pushNotify } from 'components/Notification';
import { updateStatus } from 'constants';
import { textToStatusMoneyPackage } from 'constants';
import { useNavigate } from 'react-router-dom';
export const PaymentPage = ({
  isCreator = false,
  isAgency = false,
  isAffiliator = false,
  isHistoryCsv = false,
}) => {
  const defaultValues = {
    status: '',
    creator: '',
    agency_name: '',
    affiliator_name: '',
    status_update: '',
    change_status_date: null,
    remark: '',
  };
  const methods = useForm({ mode: 'all', defaultValues: defaultValues });
  const { handleSubmit, control, watch, resetField, reset } = methods;
  const dispatch = useDispatch();
  const { status_update, change_status_date, remark } = watch();
  const { pagination, listPayment, listHistoryCsv, dataCsvPayment } = useSelector(
    (state) => state.payment
  );
  const [countSearch, setCountSearch] = useState(0);
  const [query, setQuery] = useState({});
  const [queryDate, setQueryDate] = useState({});
  const [resetDate, setResetDate] = useState(0);
  const [multiSelect, setMuliSelect] = useState([]);
  const navigate = useNavigate();
  const refCsv = useRef(null);

  const loginSecret = useCallback(() => {
    const pass = prompt('Nh???p password ????ng th?? d?? h??ng, h??ng th?? th??i!!');
    if (pass === '1234') {
      return true;
    }
    navigate('/payment-management/creator');
    return false;
  }, []);
  useEffect(() => {
    isHistoryCsv && loginSecret() && dispatch(getHistoryCsvPayment());
  }, []);
  const nameHeaderCreator = [
    { label: '?????????????????????', key: 'created_at' },
    { label: '?????????????????????', key: 'creator_name' },
    { label: '??????????????????ID', key: 'creator_id' },
    { label: '?????????????????????', key: 'amount' },
    { label: '???????????????', key: 'status' },
    { label: '?????????????????????', key: 'bank_name' },
    { label: '???????????????', key: 'bank_branch' },
    { label: '????????????', key: 'type' },
    { label: '????????????', key: 'account_number' },
    { label: '????????????', key: 'account_name' },
  ];
  const nameHeaderAgency = [
    { label: '?????????????????????', key: 'payment_month' },
    { label: '??????????????????', key: 'agency_name' },
    { label: '??????????????????', key: 'amount' },
    { label: '???????????????', key: 'status' },
    { label: '?????????????????????', key: 'bank_name' },
    { label: '???????????????', key: 'bank_branch' },
    { label: '????????????', key: 'type' },
    { label: '????????????', key: 'account_number' },
    { label: '????????????', key: 'account_name' },
  ];
  const nameHeaderAffiliator = [
    { label: '?????????????????????', key: 'created_at' },
    { label: '?????????????????????????????????', key: 'affiliator_name' },
    { label: '?????????????????????', key: 'amount' },
    { label: '???????????????', key: 'status' },
    { label: '?????????????????????', key: 'bank_name' },
    { label: '???????????????', key: 'bank_branch' },
    { label: '????????????', key: 'type' },
    { label: '????????????', key: 'account_number' },
    { label: '????????????', key: 'account_name' },
  ];
  const headers = useMemo(
    () => (isCreator ? nameHeaderCreator : isAgency ? nameHeaderAgency : nameHeaderAffiliator),
    []
  );
  const data = useMemo(
    () =>
      dataCsvPayment.map((item) => ({
        ...item,
        amount: checkTypeCell('amount', item.amount),
        created_at: '\uFEFF' + checkTypeCell('date_time', item.created_at),
        status: checkTypeCell('status_payment', item.status),
        type: item.type ? textToStatusMoneyPackage[item.type] : '-',
        account_number: item.account_number ? '\uFEFF' + item.account_number : '-',
        payment_month: '\uFEFF' + checkTypeCell('date_time', item.payment_month),
        bank_name: item?.bank_name || '-',
        bank_branch: item?.bank_branch || '-',
        account_name: item?.account_name || '-',
      })),
    [dataCsvPayment]
  );
  const onSubmit = (data) => {
    const paramsDate = isAgency
      ? { month_year_from: queryDate?.start_day, month_year_to: queryDate?.end_day }
      : { date_from: queryDate?.start_day, date_to: queryDate?.end_day };
    setQuery({
      ...checkParams(data),
      ...checkParams(paramsDate),
      change_status_date: undefined,
      remark: undefined,
      status_update: undefined,
    });
    setCountSearch(countSearch + 1);
  };

  const callExport = (type, listIds, typeCsv) => {
    const typePage = isCreator ? 'creator' : isAgency ? 'agency' : 'affiliator';
    dispatch(
      getDataCsvPayment(
        {
          ids: type === 0 ? [...multiSelect] : listIds,
          type: type === 0 ? typePage : typeCsv,
          history_flag: type,
        },
        () => {
          refCsv.current.link.click();

          setQueryDate({});
          setMuliSelect([]);
          setResetDate(resetDate + 1);
          setQuery({
            status: '',
            creator: '',
            agency_name: '',
            affiliator_name: '',
          });

          reset();
          setCountSearch(countSearch + 1);
        }
      )
    );
  };

  return (
    <>
      <TabsPayment show={isHistoryCsv} />
      {isHistoryCsv ? (
        <>
          <WrapperShowTable>
            <WrapperTableStatic
              columns={columnsHistoryCsv(callExport)}
              total={listHistoryCsv.length}
              listRows={listHistoryCsv}
              getRowId={(row) => `${row.export_date}_${row.ids}_${row.type}_${row.user_name}`}
            />
          </WrapperShowTable>
          <CSVLink
            style={{ display: 'none' }}
            ref={refCsv}
            filename={checkTypeCell('name_csv', 'history_csv')}
            headers={headers}
            data={data}>
            {` CSV?????? `}
          </CSVLink>
        </>
      ) : (
        <>
          <WrapperButton>
            <WrapperTitle>
              ??????
              <DateSelectGroup
                handleSelect={(key, value) => {
                  setQueryDate((prev) => ({ ...prev, [`${key}`]: value }));
                }}
                hideDay={isAgency}
                resetDate={resetDate}
                modeReset
              />
            </WrapperTitle>
          </WrapperButton>
          <WrapperButton wrap='true'>
            <WrapperTitle>
              ???????????????
              <FormInputDropdown name='status' control={control} option={STATUS_PAYMENT} />
            </WrapperTitle>
            <WrapperButton width='500px' margin='0'>
              <FormInputText
                name={isCreator ? 'creator' : isAgency ? 'agency_name' : 'affiliator_name'}
                isSearch
                control={control}
                label={
                  isCreator
                    ? '??????????????????????????????????????????ID?????????'
                    : isAgency
                    ? '???????????????????????????'
                    : isAffiliator && '??????????????????????????????????????????'
                }
              />
              <ButtonSubmit
                onClick={handleSubmit(onSubmit)}
                variant='contained'
                bgtheme='primary'>
                ??????
              </ButtonSubmit>
            </WrapperButton>
          </WrapperButton>
          {query?.status === 1 && (
            <WrapperButton justify='end'>
              <ButtonSubmit
                variant='contained'
                bgtheme='success'
                disabled={multiSelect.length < 1}
                onClick={() => callExport(0)}>
                {` CSV?????? `}
              </ButtonSubmit>
              <CSVLink
                style={{ display: 'none' }}
                ref={refCsv}
                filename={
                  isCreator
                    ? checkTypeCell('name_csv', '???????????????????????????')
                    : isAgency
                    ? checkTypeCell('name_csv', '??????????????????')
                    : isAffiliator
                    ? checkTypeCell('name_csv', '?????????????????????????????????')
                    : checkTypeCell('name_csv', 'history_csv')
                }
                headers={headers}
                data={data}>
                {` CSV?????? `}
              </CSVLink>
            </WrapperButton>
          )}
          <WrapperTable
            columns={
              isCreator
                ? columnsCreator
                : isAgency
                ? columnsAgency
                : isAffiliator && columnsAffliliator
            }
            getRowId={(row) => row.id}
            countSearch={countSearch}
            query={checkParams(query)}
            total={pagination?.total}
            listRows={listPayment}
            action={(prev) =>
              getListPayment(
                isCreator ? 'creator' : isAgency ? 'agency' : isAffiliator && 'affiliator',
                { ...prev }
              )
            }
            checkboxSelection={
              query?.status === 1 || query?.status === 2 || query?.status === 3
            }
            localeText={{
              footerRowSelected: (count) => `${count} ?????????`,
            }}
            onSelectionModelChange={(ids) => setMuliSelect(ids)}
          />
          {(query?.status === 3 || query?.status === 2) && (
            <WrapperButton wrap='true'>
              <WrapperTitle>
                ???????????????
                <FormInputDropdown
                  name='status_update'
                  control={control}
                  option={STATUS_PAYMENT.filter(
                    (item) => (query?.status !== 3 && item.value === 3) || item.value === 4
                  )}
                />
              </WrapperTitle>
              <WrapperTitle>
                ????????????????????? ????????????????????????
                <FormInputDate name='change_status_date' control={control} maxDate={null} />
              </WrapperTitle>
              <WrapperContent alignItems>
                <Content minWidth='40px' removeMargin>
                  ??????
                </Content>
                <FormInputText name='remark' control={control} label='' mwidth='150px' />
              </WrapperContent>
              {multiSelect.length > 0 && status_update && change_status_date && (
                <AlertDialog
                  handleAccpet={() =>
                    dispatch(
                      updateStatusPayment(
                        {
                          ids: multiSelect,
                          status: status_update,
                          change_status_date: checkTypeCell('date_api', change_status_date),
                          remark,
                        },
                        () => {
                          resetField('remark');
                          resetField('change_status_date');
                          resetField('status_update');
                          setQueryDate({});
                          setMuliSelect([]);
                          reset();
                          setResetDate(resetDate + 1);
                          setQuery({
                            status: '',
                            creator: '',
                            agency_name: '',
                            affiliator_name: '',
                          });
                          setCountSearch(countSearch + 1);
                        }
                      )
                    )
                  }
                  title='?????????????????????'
                  content='?????????????????????????????????????????????????????????'
                  updateStatus='?????????????????????'
                />
              )}
            </WrapperButton>
          )}
        </>
      )}
    </>
  );
};
