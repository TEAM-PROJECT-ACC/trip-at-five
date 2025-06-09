import './address.component.scss';
import {
  ButtonPrimary,
  ButtonSecondary,
  InputPrimary,
} from '../../../components';
import { RegisterInfostore, useRegisterStore } from '../RegisterStore';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { useState } from 'react';
import { sendRegister } from '../../../services/register/apiService';

let scriptUrl =
  'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';

export default function RegisterAdress() {
  const { setAddStep } = useRegisterStore();
  const { setAddress } = RegisterInfostore();
  const { email, pwd, nickName, tel, address } = RegisterInfostore();
  const [postNum, setPostNum] = useState('');
  const [basicAddress, setBasicAddress] = useState('');
  const [otherAddress, setOtherAddress] = useState('');

  const open = useDaumPostcodePopup(scriptUrl);

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';
    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    setPostNum(data.zonecode);
    setBasicAddress(fullAddress);
    console.log(fullAddress);
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  const addressSikp = () => {
    setAddStep();
  };

  const sendAddress = async () => {
    setAddress(postNum + ',' + basicAddress + ',' + otherAddress);
    const result = await sendRegister(email, pwd, nickName, tel, address);
    if (result.data === 1 && result.status === 200) {
      console.log(result);
      setAddStep();
    }
  };

  return (
    <div className='register-address-wrap'>
      <p className='register-address-text bold'>우편번호</p>
      <div></div>

      <div className='register-address-Postal'>
        <InputPrimary
          className={'register-postal-input'}
          placeholder={'우편번호 입력'}
          value={postNum}
        />
        <ButtonPrimary
          onClick={handleClick}
          className={'register-address-serch '}
        >
          우편 번호 검색
        </ButtonPrimary>
      </div>

      <p className='register-address-text bold'>기본 주소</p>
      <div>
        <InputPrimary
          className={'address-main-input'}
          placeholder={'주소를 입력하세요'}
          value={basicAddress}
        />
      </div>

      <p className='register-address-text'>상세 주소</p>
      <InputPrimary
        className={'address-sub-input'}
        placeholder={'나머지 주소'}
        onChange={(e) => {
          setOtherAddress(e.target.value);
        }}
      />

      <div className='register-address-btn'>
        <ButtonSecondary
          className={'address-btn-later'}
          onClick={addressSikp}
        >
          나중에 입력
        </ButtonSecondary>
        <ButtonPrimary
          className={'adress-btn-check'}
          onClick={sendAddress}
        >
          회원가입
        </ButtonPrimary>
      </div>
    </div>
  );
}
