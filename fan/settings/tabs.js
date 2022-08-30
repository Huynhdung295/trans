import TabMenu from 'components/TabMenu';
import { PATH_URL } from 'constants/routes/settingUrl';
import { useParams } from 'react-router-dom';

const TabsAccountFan = () => {
  const navItems = [
    {
      id: 'fan-account-manage',
      path: `/${PATH_URL.FAN}/manage`,
      text: 'アカウント情報閲覧',
    },
    {
      id: 'fan-account-purchase-history',
      path: `/${PATH_URL.FAN}/purchase-history`,
      text: '購入履歴閲覧',
    },
    {
      id: 'fan-account-point-history',
      path: `/${PATH_URL.FAN}/point-history`,
      text: 'ポイント購入履歴閲覧',
    },
  ];
  return <TabMenu tabs={navItems} />;
};
const TabsAccountFanSecond = () => {
  const { id } = useParams();
  const navItems = [
    {
      id: '10',
      path: `/${PATH_URL.FAN}/detail-registration/${id}`,
      text: 'アカウント情報詳細',
    },
    {
      id: '11',
      path: `/${PATH_URL.FAN}/history-subscription/${id}`,
      text: 'サブスクリプション購入履歴',
    },
    {
      id: '12',
      path: `/${PATH_URL.FAN}/history-content/${id}`,
      text: 'コンテンツ購入履歴',
    },
    {
      id: '13',
      path: `/${PATH_URL.FAN}/history-points/${id}`,
      text: 'ポイント購入履歴',
    },
    {
      id: '14',
      path: `/${PATH_URL.FAN}/history-donate/${id}`,
      text: '投げ銭履歴',
    },
  ];
  return <TabMenu tabs={navItems} />;
};
export { TabsAccountFan, TabsAccountFanSecond };
