import { ButtonCCF } from 'styled';
import { cellToTooltip, checkTypeCell } from 'utils/utils';
const columnSubscription = [
  { headerName: 'サブスクリプション名', ...cellToTooltip('title') },
  { headerName: 'サブスクリプション内容', ...cellToTooltip('description') },
  { headerName: '保有のクリエイター名', ...cellToTooltip('username') },
  { headerName: '保有のクリエイターID', ...cellToTooltip('account_id') },
  { headerName: '購入日時', ...cellToTooltip('updated_at', 'date_time') },
  { headerName: '金額', ...cellToTooltip('price', 'amount_pt') },
];
const columnContent = [
  { headerName: 'コンテンツ名', ...cellToTooltip('title') },
  { headerName: 'コンテンツ内容', ...cellToTooltip('content') },
  { headerName: '保有のクリエイター名', ...cellToTooltip('username') },
  { headerName: '保有のクリエイターID', ...cellToTooltip('account_id') },
  { headerName: '購入日時', ...cellToTooltip('updated_at', 'date_time') },
  { headerName: '金額', ...cellToTooltip('price', 'amount_pt') },
];
const columnPoint = [
  { headerName: 'ポイント数', ...cellToTooltip('point', 'amount_pt') },
  { headerName: '支払金額（税込）', ...cellToTooltip('price', 'amount') },
  { headerName: '購入日時', ...cellToTooltip('updated_at', 'date_time') },
  { headerName: '支払い方法', ...cellToTooltip('payment_method', 'status_payment_method') },
];
const columnDonate = [
  { headerName: '種類', ...cellToTooltip('transaction_type', 'transaction') },
  { headerName: 'クリエイター名', ...cellToTooltip('username') },
  { headerName: 'クリエイターID', ...cellToTooltip('account_id') },
  { headerName: '日時', ...cellToTooltip('updated_at', 'date_time') },
  { headerName: '金額 ', ...cellToTooltip('price', 'amount_pt') },
];
const columnPaymentHistory = [
  { headerName: '購入日時', ...cellToTooltip('updated_at', 'date_time') },
  { headerName: '氏名', ...cellToTooltip('full_name') },
  { headerName: '役割', ...cellToTooltip('role','fan_name') },
  { headerName: 'ポイント数', ...cellToTooltip('point', 'amount_pt') },
  { headerName: '支払金額（税込）', ...cellToTooltip('price', 'amount') },
  { headerName: '支払い方法', ...cellToTooltip('payment_method', 'status_payment_method') },
];
const columnPointHistory = [
  { headerName: '購入日時', ...cellToTooltip('updated_at', 'date_time') },
  { headerName: 'ファンの氏名', ...cellToTooltip('full_name') },
  { headerName: '購入種類', ...cellToTooltip('transaction_type', 'transaction') },
  { headerName: 'クリエイター名', ...cellToTooltip('username') },
  { headerName: 'クリエイターID ', ...cellToTooltip('account_id') },
  { headerName: '購入金額 ', ...cellToTooltip('price', 'amount_pt') },
];
const mainColumn = (goToDetail, goToEdit, goToLogin) => [
  { headerName: '氏名', ...cellToTooltip('full_name') },
  { headerName: '氏名（ローマ字）', ...cellToTooltip('name_romaji') },
  { headerName: '生年月日', ...cellToTooltip('birthday', 'date') },
  { headerName: '性別', ...cellToTooltip('gender', 'gender') },
  { headerName: 'メールアドレス ', ...cellToTooltip('email', 'email') },
  {
    headerName: 'ステータス ',
    ...cellToTooltip('status', 'status'),
    renderCell: (cell) =>
      cell?.row['first_login'] === 0
        ? '未ログイン'
        : checkTypeCell('status', cell?.row['status']),
  },
  {
    headerName: 'サブスク名・コンテンツ名購入',
    ...cellToTooltip('name_subscription', 'name_subscription', 300, true),
  },
  {
    field: 'action',
    headerName: 'アクション',
    minWidth: 300,
    sortable: false,
    renderCell: (cellValues) => {
      return (
        <>
          <ButtonCCF
            onClick={() => goToDetail(cellValues.id)}
            style={{ marginRight: '10px' }}
            variant='contained'
            size='small'
            bgtheme='primary'>
            詳細
          </ButtonCCF>
          {cellValues?.row['first_login'] === 0 ? (
            <div style={{ width: '74px' }} />
          ) : (
            <ButtonCCF
              onClick={() => goToEdit(cellValues.id)}
              style={{ marginRight: '10px' }}
              variant='contained'
              size='small'
              bgtheme='primary'>
              編集
            </ButtonCCF>
          )}
          {/* <ButtonCCF
            onClick={() => goToLogin(cellValues.id)}
            variant='contained'
            size='small'
            disabled={true}
            bgtheme='primary'>
            ホームページへ
          </ButtonCCF> */}
        </>
      );
    },
  },
];
export {
  columnSubscription,
  columnContent,
  columnPoint,
  columnDonate,
  columnPaymentHistory,
  columnPointHistory,
  mainColumn,
};
