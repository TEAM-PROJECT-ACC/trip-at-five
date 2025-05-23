
import { classNames } from '../../../utils'
import './titleText.component.scss'

export default function TitleText({className, text}) {
    return(
        <p className={classNames('sign-title', className)} >{text}</p>
    )
}