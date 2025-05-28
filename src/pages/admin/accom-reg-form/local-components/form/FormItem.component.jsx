import { classNames } from '../../../../../utils';
import './FormItem.style.scss';

const FormItem = ({ title, children, className }) => {
  return (
    <div className='accom-form-item'>
      <h2 className='accom-form-item-header'>{title}</h2>
      <div className={classNames('accom-form-item-content', className)}>
        {children}
      </div>
    </div>
  );
};

export default FormItem;
