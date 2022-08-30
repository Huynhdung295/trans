import { Text, TooltipHover } from 'components/Text';
import { chooseTypeUser } from 'constants';
import { ButtonCCF } from 'styled';
import { cellToTooltip, checkTypeCell } from 'utils/utils';

const columnsCreator = [
  { headerName: '支払い依頼日時', ...cellToTooltip('created_at', 'date_time') },
  { headerName: 'クリエイター名', ...cellToTooltip('creator_name') },
  { headerName: 'クリエイターID', ...cellToTooltip('creator_id') },
  { headerName: '支払い依頼金額', ...cellToTooltip('amount', 'amount') },
  { headerName: '支払い状況', ...cellToTooltip('status', 'status_payment') },
  {
    headerName: '日付',
    ...cellToTooltip('change_status_date', 'date'),
    renderCell: (data) => {
      return (
        <TooltipHover title={checkTypeCell('date', data.row['change_status_date']) || ''}>
          <Text maxWidth={200}>{checkTypeCell('date', data.row['change_status_date'])}</Text>
        </TooltipHover>
      );
    },
  },
  { headerName: '備考', ...cellToTooltip('remark') },
];
const columnsAgency = [
  { headerName: '支払い年月の分', ...cellToTooltip('payment_month', 'date_month') },
  { headerName: '代理店の氏名', ...cellToTooltip('agency_name') },
  { headerName: '払い予定金額', ...cellToTooltip('amount', 'amount') },
  { headerName: '支払い状況', ...cellToTooltip('status', 'status_payment') },
  { headerName: '日付', ...cellToTooltip('change_status_date', 'date') },
  { headerName: '備考', ...cellToTooltip('remark') },
];

const columnsAffliliator = [
  { headerName: '支払い依頼日時', ...cellToTooltip('created_at', 'date_time') },
  { headerName: 'アフィリエイターの氏名', ...cellToTooltip('affiliator_name') },
  { headerName: '支払い依頼金額', ...cellToTooltip('amount', 'amount') },
  { headerName: '支払い状況', ...cellToTooltip('status', 'status_payment') },
  { headerName: '日付', ...cellToTooltip('change_status_date', 'date') },
  { headerName: '備考', ...cellToTooltip('remark') },
];
const columnsHistoryCsv = (exportCsv) => [
  { headerName: 'Export date', ...cellToTooltip('export_date', 'date_time') },
  { headerName: 'List ID', ...cellToTooltip('ids') },
  { headerName: 'Username', ...cellToTooltip('user_name') },
  {
    field: 'action',
    headerName: 'アクション',
    minWidth: 100,
    sortable: false,
    renderCell: (cellValues) => (
      <ButtonCCF
        style={{ marginRight: '10px' }}
        onClick={() => exportCsv(1, cellValues?.row?.ids, chooseTypeUser[+cellValues?.row?.type[0]].toLowerCase())}
        variant='contained'
        size='small'
        bgtheme='primary'>
        Export
      </ButtonCCF>
    ),
  },
];
export { columnsCreator, columnsAgency, columnsAffliliator, columnsHistoryCsv };
