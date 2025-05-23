
import { classNames } from '../../../utils'
import './Sign-compelteText.conponent.scss'

export default function SignCompeletText({className, text}) {
    return(
        <p className={classNames('sign-title', className)} >{text}</p>
    )
}