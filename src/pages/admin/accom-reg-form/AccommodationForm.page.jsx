import React, { use, useEffect, useState } from 'react';
import './AccommodationForm.style.scss';
import AdminInput from '../../../components/inputs/input-admin/AdminInput.component';
import { IoCart } from '../../../assets/icons/index';
import AccomFacButton from '../../../components/buttons/admin-fac-button/AccomFacButton.component';

/**
- 모텔
- 호텔·리조트
- 펜션
- 홈&빌라
- 캠핑
- 게하·한옥
 */

const accomType = ['모텔', '호텔/리조트', '펜션', '홈/빌라', '캠핑', '게하/한옥'];

const publicFac = ['사우나', '수영장', '바베큐', '레스토랑', '피트니스', '물놀이시설', '공용샤워실', '공용화장실', '매점'];
const inRoomFac = ['스파/월풀', '객실스파', '미니바', '무선인터넷', '에어컨', '욕실용품', '샤워실', '개인콘센트'];
const etcFac = [
  '조식제공',
  '무료주차',
  '반려견동반',
  '사우나/찜질방',
  '객실내취사',
  '픽업서비스',
  '캠프파이어',
  '개인사물함',
  '객실내흡연',
  '짐보관가능',
];

const AccommodationForm = () => {
  const [word, setWord] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [pubFacList, setPubFacList] = useState([]);
  const [roomFacList, setRoomFacList] = useState([]);
  const [etcFacList, setEtcFacList] = useState([]);

  const checkWordCountHandler = (e) => {
    // console.log(e.target.value);
    let word = e.target.value;

    if (word.length <= 1330) {
      setWord(word);
      setWordCount(word.length);
    }
  };

  // 시설정보 추가 핸들러
  const addPubFacHandler = (data) => {
    data.preventDefault();
    data.stopPropagation();
    // console.log(data.currentTarget.title);
    let value = data.currentTarget.title;
    // 공용 시설 정보 목록이 비어있을 경우
    if (pubFacList.length === 0) setPubFacList([value]);
    // 비어있지 않은 경우
    else {
      let checkValue = pubFacList.find((v, idx) => v === value);
      // console.log(checkValue + ' ' + value);
      if (checkValue === value) {
        let removedList = pubFacList.filter((checkValue) => checkValue !== value);
        setPubFacList(removedList);
        data.currentTarget.classList.remove('active');
        return;
      }

      setPubFacList([...pubFacList, value]);
    }

    data.currentTarget.classList.add('active');
  };

  const addRoomFacHandler = (data) => {
    data.preventDefault();
    data.stopPropagation();
    let value = data.currentTarget.title;
    if (roomFacList.length === 0) setRoomFacList([value]);
    else {
      let checkValue = roomFacList.find((v, idx) => v === value);
      if (checkValue === value) {
        let removedList = roomFacList.filter((checkValue) => checkValue !== value);
        setRoomFacList(removedList);
        data.currentTarget.classList.remove('active');
        return;
      }

      setRoomFacList([...roomFacList, value]);
    }
    data.currentTarget.classList.add('active');
  };

  const addEtcFacHandler = (data) => {
    data.preventDefault();
    data.stopPropagation();
    let value = data.currentTarget.title;
    if (etcFacList.length === 0) setEtcFacList([value]);
    else {
      let checkValue = etcFacList.find((v, idx) => v === value);
      if (checkValue === value) {
        let removedList = etcFacList.filter((checkValue) => checkValue !== value);
        setEtcFacList(removedList);
        data.currentTarget.classList.remove('active');
        return;
      }

      setEtcFacList([...etcFacList, value]);
    }
    data.currentTarget.classList.add('active');
  };

  useEffect(() => {
    console.log(pubFacList);
    console.log(roomFacList);
    console.log(etcFacList);
  }, [pubFacList, roomFacList, etcFacList]);

  return (
    <div className='accom-form__container'>
      <div className='accom-reg-date'>
        <span className='accom-date'>2025-05-11</span>
        <span>에 등록되었습니다.</span>
      </div>
      <form className='accom-form' encType='multipart/form-data'>
        {/* 숙박업소 정보 등록 */}
        <div className='accom-form-item'>
          <h2 className='accom-form-item-header'>숙박업소 정보 등록</h2>
          <div className='accom-form-item-content'>
            <select className='accom-type-select'>
              {accomType.map((value, idx) => (
                <option key={idx} value={value}>
                  {value}
                </option>
              ))}
            </select>
            <AdminInput type='text' name='accomName' className='accom-name' placeholder={'숙박업소명을 입력해주세요'} />
            <AdminInput type='tel' name='accomPhone' className='accom-phone' placeholder={"'-'없이 입력해주세요"} />
          </div>
        </div>
        {/* 숙박업소 이미지 등록 */}
        <div className='accom-form-item'>
          <h2 className='accom-form-item-header'>숙박업소 이미지 등록</h2>
          <div className='accom-form-item-content'>
            <AdminInput type='file' multiple name='accomImage' className='accom-image' />
          </div>
        </div>
        {/* 숙박업소 설명 */}
        <div className='accom-form-item'>
          <h2 className='accom-form-item-header'>숙박업소 설명</h2>
          <div className='accom-form-item-content accom-desc__container'>
            <textarea className='accom-desc' placeholder='숙박업소 설명을 작성해주세요...' value={word} onChange={checkWordCountHandler} />
            <span className='accom-desc-count'>
              {wordCount >= 1330 && <span className='accom-desc-warning'>최대 1330자입니다!</span>}
              <span>{wordCount}</span> / 1330자
            </span>
          </div>
        </div>
        {/* 숙박업소 주소 */}
        <div className='accom-form-item'>
          <h2 className='accom-form-item-header'>숙박업소 주소</h2>
          <div className='accom-form-item-content content__container'>
            <div className='map-area'>
              <div>{/* 맵 영역 */}</div>
            </div>
            <div className='map-input'>
              <AdminInput type='text' name='accomZipCode' className='accom-zip-code' placeholder={'우편번호'} />
              <AdminInput type='text' name='accomAddr' className='accom-addr' placeholder={'주소지'} />
            </div>
          </div>
        </div>
        {/* 숙박업소 시설 정보 */}
        <div className='accom-form-item'>
          <h2 className='accom-form-item-header'>숙박업소 시설 정보</h2>
          <div className='accom-form-item-content'>
            {/* 아이콘은 추후 수정 예정 */}
            <div className='fac-content__container'>
              {publicFac.map((value, idx) => (
                <AccomFacButton key={idx} type='button' title={value} icon={<IoCart />} onClick={addPubFacHandler} />
              ))}
            </div>
            <div className='fac-content__container'>
              {inRoomFac.map((value, idx) => (
                <AccomFacButton key={idx} type='button' title={value} icon={<IoCart />} onClick={addRoomFacHandler} />
              ))}
            </div>
            <div className='fac-content__container'>
              {etcFac.map((value, idx) => (
                <AccomFacButton key={idx} type='button' title={value} icon={<IoCart />} onClick={addEtcFacHandler} />
              ))}
            </div>
          </div>
        </div>
        {/* 숙박업소 객실관리(목록) */}
        <div></div>
      </form>
    </div>
  );
};

export default AccommodationForm;
