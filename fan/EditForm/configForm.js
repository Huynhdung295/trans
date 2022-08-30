import { GENDER } from 'constants';

const renderForm = ({ control }) => [
  {
    content: '氏名',
    name: 'full_name',
    control,
    type: 'text',
    props: {
      width: '480px',
      isErrForm: true,
    },
  },
  {
    content: '氏名（ローマ字）',
    name: 'name_romaji',
    control,
    type: 'text',
    props: {
      width: '480px',
      isErrForm: true,
    },
  },
  {
    content: '生年月日',
    name: 'birthday',
    control,
    type: 'date',
    props: {
      width: '480px',
      isErrForm: true,
    },
  },
  {
    content: '性別',
    name: 'gender',
    control,
    type: 'select',
    props: {
      option: GENDER,
      width: '480px',
      isErrForm: true,
      noDefault: true,
    },
  },
  {
    content: 'メールアドレス',
    name: 'email',
    control,
    type: 'text',
    props: {
      width: '480px',
      isErrForm: true,
      disabled: true,
    },
  },
  {
    content: 'アカウントステータス',
    name: 'status',
    control,
    type: 'text',
    props: {
      disabled: true,
      width: '480px',
      isErrForm: true,
    },
  },
];
export { renderForm };
