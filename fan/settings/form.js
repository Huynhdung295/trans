import { yupEmail, yupGender, yupFullName, yupBirthday, yupRomajiName } from 'constants';
import * as yup from 'yup';
// Params
const paramsDetail = {
  name_romaji: '',
  full_name: '',
  birthday: '',
  gender: '',
  email: '',
  status: '',
};
const paramsEdit = {
  name_romaji: '',
  full_name: '',
  birthday: '',
  gender: '',
  email: '',
  status: '',
};
// Validate
const schemaEdit = yup.object().shape({
  ...yupRomajiName(),
  ...yupFullName('​氏名を入力してください。', '氏名を50文字まで入力してください。'),
  ...yupBirthday(),
  ...yupGender(),
  ...yupEmail(),
});

export { paramsEdit, paramsDetail, schemaEdit };
