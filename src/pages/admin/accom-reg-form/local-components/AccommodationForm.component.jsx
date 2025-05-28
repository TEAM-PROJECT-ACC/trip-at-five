import React, { useState } from 'react';
import './AccommodationForm.style.scss';
import FormItem from './form/FormItem.component';
import AdminInput from '../../../../components/inputs/input-admin/AdminInput.component';
import {
  FaSpa,
  FaSwimmer,
  FaDrumstickBite,
  MdOutlineRestaurant,
  FaDumbbell,
  FaSwimmingPool,
  FaShower,
  FaRestroom,
  FaStore,
  FaBath,
  MdLocalBar,
  MdOutlineRssFeed,
  MdAcUnit,
  FaPumpSoap,
  MdShower,
  FaPlug,
  MdFreeBreakfast,
  FaParking,
  FaBurn,
  MdOutlineFoodBank,
  FaShuttleVan,
  WiFire,
  MdLuggage,
  FaSmoking,
  FaDog,
  BiCabinet,
  FaHotTub,
} from '../../../../assets/icons/ys/index';
import AccomFacButton from '../../../../components/buttons/admin-fac-button/AccomFacButton.component';
import AdminPrimaryButton from '../../../../components/buttons/admin-primary-button/AdminPrimaryButton.component';
import { useParams } from 'react-router-dom';

const accomType = [
  '모텔',
  '호텔/리조트',
  '펜션',
  '홈/빌라',
  '캠핑',
  '게하/한옥',
];
const publicFac = [
  { icon: <FaSpa />, title: '사우나' },
  { icon: <FaSwimmer />, title: '수영장' },
  { icon: <FaDrumstickBite />, title: '바베큐' },
  { icon: <MdOutlineRestaurant />, title: '레스토랑' },
  { icon: <FaDumbbell />, title: '피트니스' },
  { icon: <FaSwimmingPool />, title: '물놀이시설' },
  { icon: <FaShower />, title: '공용샤워실' },
  { icon: <FaRestroom />, title: '공용화장실' },
  { icon: <FaStore />, title: '매점' },
];
const inRoomFac = [
  { icon: <FaHotTub />, title: '스파/월풀' },
  { icon: <FaBath />, title: '객실스파' },
  { icon: <MdLocalBar />, title: '미니바' },
  { icon: <MdOutlineRssFeed />, title: '무선인터넷' },
  { icon: <MdAcUnit />, title: '에어컨' },
  { icon: <FaPumpSoap />, title: '욕실용품' },
  { icon: <MdShower />, title: '샤워실' },
  { icon: <FaPlug />, title: '개인콘센트' },
];
const etcFac = [
  { icon: <MdFreeBreakfast />, title: '조식제공' },
  { icon: <FaParking />, title: '무료주차' },
  { icon: <FaDog />, title: '반려견동반' },
  { icon: <FaShuttleVan />, title: '픽업서비스' },
  { icon: <FaSmoking />, title: '객실내흡연' },
  { icon: <MdLuggage />, title: '짐보관가능' },
  { icon: <BiCabinet />, title: '개인사물함' },
  { icon: <WiFire />, title: '캠프파이어' },
  { icon: <FaBurn />, title: '찜질방' },
  { icon: <MdOutlineFoodBank />, title: '객실내취사' },
];

const AccommodationForm = () => {
  const { id } = useParams();
  const [word, setWord] = useState('');
  const [wordCount, setWordCount] = useState(0);

  // 글자 수 세기
  const checkWordCountHandler = (e) => {
    // console.log(e.target.value);
    let value = e.target.value;

    if (value.length <= 1330) {
      setWord(value);
      setWordCount(value.length);
    }
  };
  const [facList, setFacList] = useState({
    pub: [],
    room: [],
    etc: [],
  });

  // 시설정보 추가 핸들러
  const addFacHandler = (data) => {
    data.preventDefault();
    data.stopPropagation();

    const value = data.currentTarget.title;
    const category = data.currentTarget.dataset.category;

    if (facList[category].length === 0) {
      setFacList((prev) => ({
        ...prev,
        [category]: [value],
      }));
    } else {
      const isExist = facList[category].includes(value);
      // console.log(isExist);

      // 이미 선택했는지 체크
      if (isExist) {
        const removedList = facList[category].filter((item) => item !== value);
        setFacList((prev) => ({
          ...prev,
          [category]: removedList,
        }));
        data.currentTarget.classList.remove('active');
        return;
      }

      setFacList((prev) => ({
        ...prev,
        [category]: [...facList[category], value],
      }));
    }

    data.currentTarget.classList.add('active');
  };
  return (
    <form
      className='accom-form'
      encType='multipart/form-data'
    >
      {/* 숙박업소 정보 등록 */}
      <FormItem title='숙박업소 정보 등록'>
        <select
          className='accom-type-select'
          name='accomTypeNo'
        >
          {accomType.map((value, idx) => (
            <option
              key={idx}
              value={value}
            >
              {value}
            </option>
          ))}
        </select>
        <AdminInput
          type='text'
          name='accomName'
          className='accom-name'
          placeholder={'숙박업소명을 입력해주세요'}
        />
        <AdminInput
          type='tel'
          name='accomPhone'
          className='accom-phone'
          placeholder={"'-'없이 입력해주세요"}
        />
      </FormItem>
      {/* 숙박업소 이미지 등록 */}
      <FormItem title='숙박업소 이미지 등록'>
        <AdminInput
          type='file'
          multiple
          name='accomImageList'
          className='accom-image'
        />
      </FormItem>
      {/* 숙박업소 설명 */}
      <FormItem
        title='숙박업소 설명'
        className='accom-desc__container'
      >
        <textarea
          className='accom-desc'
          name='accomDesc'
          placeholder='숙박업소 설명을 작성해주세요...'
          value={word}
          onChange={checkWordCountHandler}
        />
        <span className='accom-desc-count'>
          {wordCount >= 1330 && (
            <span className='accom-desc-warning'>최대 1330자입니다!</span>
          )}
          <span>{wordCount}</span> / 1330자
        </span>
      </FormItem>
      {/* 숙박업소 주소 */}
      <FormItem
        title='숙박업소 설명'
        className='content__container'
      >
        <div className='map-area'>
          <div>{/* 맵 영역 */}</div>
        </div>
        <div className='map-input'>
          {/* 경도 */}
          <input
            type='hidden'
            name='accomLon'
          />
          {/* 위도 */}
          <input
            type='hidden'
            name='accomLat'
          />

          <AdminInput
            type='text'
            name='accomZipCode'
            className='accom-zip-code'
            placeholder={'우편번호'}
          />
          <AdminInput
            type='text'
            name='accomAddr'
            className='accom-addr'
            placeholder={'주소지'}
          />
        </div>
      </FormItem>
      {/* 숙박업소 시설 정보 */}
      <FormItem title='숙박업소 시설 정보'>
        <div className='fac-content__container'>
          {publicFac.map((value, idx) => (
            <AccomFacButton
              key={idx}
              type='button'
              data-category='pub'
              title={value.title}
              icon={value.icon}
              onClick={addFacHandler}
            />
          ))}
        </div>
        <div className='fac-content__container'>
          {inRoomFac.map((value, idx) => (
            <AccomFacButton
              key={idx}
              type='button'
              data-category='room'
              title={value.title}
              icon={value.icon}
              onClick={addFacHandler}
            />
          ))}
        </div>
        <div className='fac-content__container'>
          {etcFac.map((value, idx) => (
            <AccomFacButton
              key={idx}
              type='button'
              data-category='etc'
              title={value.title}
              icon={value.icon}
              onClick={addFacHandler}
            />
          ))}
        </div>
      </FormItem>

      {id ? (
        <div className='accom-reg-button-group'>
          <AdminPrimaryButton
            type={'submit'}
            className={'accom-reg-button'}
          >
            수정
          </AdminPrimaryButton>
          <AdminPrimaryButton
            type={'submit'}
            className={'accom-reg-button'}
          >
            삭제
          </AdminPrimaryButton>
        </div>
      ) : (
        <AdminPrimaryButton
          type={'submit'}
          className={'accom-reg-button'}
        >
          등록
        </AdminPrimaryButton>
      )}
    </form>
  );
};

export default AccommodationForm;
