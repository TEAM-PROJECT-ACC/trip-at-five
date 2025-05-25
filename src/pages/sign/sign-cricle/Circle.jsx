import { useSignUpStore } from '../SignUpStore';
import './circle.scss';

export default function Circle() {


const {step} = useSignUpStore();

    return(
        <>
            <div className='sign-circle-wrap'>
            <div className={`${ step == 1 ? 'sign-circle-max' : 'sign-circle-min' }`} />
            <div className={`${ step == 2 ? 'sign-circle-max' : 'sign-circle-min' }`} />
            <div className={`${ step == 3 ? 'sign-circle-max' : 'sign-circle-min' }`} />
            <div className={`${ step == 4 ? 'sign-circle-max' : 'sign-circle-min' }`} />
            <div className={`${ step == 5 ? 'sign-circle-max' : 'sign-circle-min' }`} />
            </div>
        </>
    )
}