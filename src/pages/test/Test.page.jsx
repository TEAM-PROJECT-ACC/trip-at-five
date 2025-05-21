import { InputPrimary, InputSecondary, InputShrink } from '../../components/inputs';
import { ClassNamesTest } from '../../utils';

export const TestPage = () => {
  return (
    <div className='test-page__container'>
      <ClassNamesTest />
      <InputPrimary />
      <InputSecondary />
      <InputShrink labelText={'라벨'} />
    </div>
  );
};
