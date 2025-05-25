
import { ButtonPrimary } from '../../../components'
import { classNames } from '../../../utils'
import { SignUpInfoStore } from '../SignUpStore';
import './Sign-compelte.conponent.scss'

export default function SignCompelet() {

    const {nickName} = SignUpInfoStore();

    return(
        <div className='sign-comlet-wrap'>
        <p className='t1'>
            <span>{nickName}</span>님의 회원가입이 <br/>
            완료되었습니다.
        </p>
        <ButtonPrimary className={'sign-comlet-btn'}>로그인</ButtonPrimary>
        </div>
    )
}