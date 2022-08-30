import TabMenu from 'components/TabMenu';

export const TabsPayment = ({ show = false }) => {
  const navItems = [
    {
      id: 'payment-creator-management',
      path: `/payment-management/creator`,
      text: 'クリエイター',
    },
    {
      id: 'payment-agency-management',
      path: '/payment-management/agency',
      text: '代理店',
    },
    {
      id: 'payment-affiliator-management',
      path: '/payment-management/affiliator',
      text: 'アフィリエイター',
    },
    {
      id: 'payment-history-csv-management',
      path: '/payment-management/history-csv',
      text: 'History CSV',
    },
  ];

  return (
    <TabMenu
      tabs={navItems.filter((item) =>
        show ? item : item?.id !== 'payment-history-csv-management'
      )}
    />
  );
};
