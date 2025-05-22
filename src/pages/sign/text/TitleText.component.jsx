
import { classNames } from '../../../utils'
import './titleText.component.scss'

export default function TitleText({className}) {
    return(
        <p className={classNames('sign-title', className)} >회원가입</p>
    )
}