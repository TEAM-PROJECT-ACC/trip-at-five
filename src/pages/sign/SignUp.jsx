
import { ButtonPrimary, InputPrimary } from '../../components';
import Circle from './cricle/Circle';
import './sign.scss';
import TitleText from './text/TitleText.component';

export default function SignUp() {

    return(
        <>
         <div className='sign-wrap'>
        <TitleText className={'sign-title'}/>
        <Circle/>
        <div className='sign-input'>
        <p className='sign-input-item-text'>이메일 *</p>
        <InputPrimary className='sign-input-item'/>
        <ButtonPrimary className='sign-input-item'>이메일로 인증</ButtonPrimary>
        </div>
        </div>
        </>
    )
}