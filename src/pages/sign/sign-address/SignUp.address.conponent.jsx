import './SignUp.address.conponent.scss';
import { ButtonPrimary, ButtonSecondary, InputPrimary } from "../../../components";



export default function SignUpAdress() {

      return(
      <div className='sign-address-wrap'>
        <p className='sign-address-text bold'>우편번호</p>

            <div className='sign-address-Postal'>
            <InputPrimary className={'sign-address-input '} placeholder={' '} />            
            <ButtonPrimary className={'sign-address-serch '} >우편 번호 검색</ButtonPrimary>
            </div>



            <p className='sign-address-text bold'>기본 주소</p>
            <div>
            <InputPrimary placeholder={' '} />
            </div>

            <p className='sign-address-text'>상세 주소</p>
            <InputPrimary placeholder={' '} />


          <div className='sign-address-btn'>    
          <ButtonSecondary>나중에 입력</ButtonSecondary>     
          <ButtonPrimary >회원가입</ButtonPrimary>
          
          </div>         
      </div>
      )
}
