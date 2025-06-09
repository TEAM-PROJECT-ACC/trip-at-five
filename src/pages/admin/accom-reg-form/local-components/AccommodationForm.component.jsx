import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FormItem from './form/FormItem.component';
import AdminInput from '../../../../components/inputs/input-admin/AdminInput.component';
import AccomFacButton from '../../../../components/buttons/admin-fac-button/AccomFacButton.component';
import AdminPrimaryButton from '../../../../components/buttons/admin-primary-button/AdminPrimaryButton.component';
import {
  updateAdminAccomDetail,
  deleteAdminAccomDetail,
  createAdminAccom,
} from '../../../../services/accom/apiService';
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
import './AccommodationForm.style.scss';
import Script from '../../../accommodation/local-components/map/Script';

const accomTypeMap = {
  21: '모텔',
  22: '호텔',
  23: '리조트',
  24: '펜션',
  25: '캠핑',
  26: '게하/한옥',
};

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

const AccommodationForm = ({ accomDetail }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const mapRef = useRef(null);
  // 초기화
  const [formData, setFormData] = useState({
    accomSq: '',
    accomName: '',
    accomPhone: '',
    accomDesc: '',
    accomZipCode: '',
    accomAddr: '',
    accomTypeNo: '',
    accomLon: '',
    accomLat: '',
  });

  const [word, setWord] = useState('');
  const [wordCount, setWordCount] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 글자 수 세기
  const checkWordCountHandler = (e) => {
    // console.log(e.target.value);
    let value = e.target.value;

    if (value.length <= 1330) {
      setFormData((prev) => ({ ...prev, accomDesc: value }));
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

  useEffect(() => {
    window.scrollTo(0, 0);
    if (accomDetail) {
      setFormData({
        ...formData,
        accomSq: accomDetail.accomSq || '',
        accomName: accomDetail.accomName || '',
        accomPhone: accomDetail.accomPhone || '',
        accomDesc: accomDetail.accomDesc || '',
        accomZipCode: accomDetail.accomZipCode || '',
        accomAddr: accomDetail.accomAddr || '',
        accomTypeNo: accomDetail.accomTypeNo || '',
        accomLon: accomDetail.accomLon || '',
        accomLat: accomDetail.accomLat || '',
        accomPubFacInfo: accomDetail.accomPubFacInfo || '',
        accomInRoomFacInfo: accomDetail.accomInRoomFacInfo || '',
        accomEtcFacInfo: accomDetail.accomEtcFacInfo || '',
      });
      setWord(accomDetail.accomDesc || '');
      setWordCount(accomDetail.accomDesc ? accomDetail.accomDesc.length : 0);

      setFacList({
        pub: accomDetail.pubFacInfo ? accomDetail.pubFacInfo.split(',') : [],
        room: accomDetail.inRoomFacInfo
          ? accomDetail.inRoomFacInfo.split(',')
          : [],
        etc: accomDetail.etcFacInfo ? accomDetail.etcFacInfo.split(',') : [],
      });
    }
  }, [accomDetail]);

  const handleUpdate = async () => {
    const updatedData = {
      accomSq: parseInt(id, 10),
      accomName: formData.accomName,
      accomDesc: formData.accomDesc,
      accomLat: parseFloat(formData.accomLat),
      accomLon: parseFloat(formData.accomLon),
      accomAddr: formData.accomAddr,
      accomPhone: formData.accomPhone,
      pubFacInfo: facList.pub.join(','),
      inRoomFacInfo: facList.room.join(','),
      etcFacInfo: facList.etc.join(','),
      accomTypeNo: parseInt(formData.accomTypeNo, 10),
    };
    try {
      await updateAdminAccomDetail(updatedData);
      alert('수정 완료');
      navigate('/admin/accommodations');
      window.scrollTo(0, 0);
    } catch (error) {
      console.error(error);
      alert('수정 실패');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    try {
      await deleteAdminAccomDetail(id);
      alert('삭제 완료');
      navigate('/admin/accommodations');
      window.scrollTo(0, 0);
    } catch (error) {
      alert('삭제 실패');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newData = {
      accomName: formData.accomName,
      accomDesc: formData.accomDesc,
      accomLat: parseFloat(formData.accomLat),
      accomLon: parseFloat(formData.accomLon),
      accomAddr: formData.accomAddr,
      accomPhone: formData.accomPhone,
      pubFacInfo: facList.pub.join(','),
      inRoomFacInfo: facList.room.join(','),
      etcFacInfo: facList.etc.join(','),
      accomTypeNo: parseInt(formData.accomTypeNo, 10),
      accomZipCode: formData.accomZipCode,
    };
    try {
      await createAdminAccom(newData);
      alert('등록 완료');
      navigate('/admin/accommodations');
      window.scrollTo(0, 0);
    } catch (error) {
      alert('등록 실패');
      console.error(error);
    }
  };

  const initKakaoMap = () => {
    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(() => {
        const container = mapRef.current;
        const centerLat = parseFloat(formData.accomLat) || 33.450701;
        const centerLon = parseFloat(formData.accomLon) || 126.570667;

        const mapOption = {
          center: new window.kakao.maps.LatLng(centerLat, centerLon),
          level: 5,
        };

        const map = new window.kakao.maps.Map(container, mapOption);

        const marker = new window.kakao.maps.Marker({
          map,
          position: new window.kakao.maps.LatLng(centerLat, centerLon),
          draggable: true,
        });

        // 지도 클릭 시 마커 이동 + 주소, 우편번호 갱신
        window.kakao.maps.event.addListener(
          map,
          'click',
          function (mouseEvent) {
            const latlng = mouseEvent.latLng;
            marker.setPosition(latlng);
            updateAddressAndCoords(latlng);
          }
        );

        // 지도 위 드래그로 주소, 우편번호 갱신도 가능
        window.kakao.maps.event.addListener(marker, 'dragend', function () {
          const latlng = marker.getPosition();
          updateAddressAndCoords(latlng);
        });

        function updateAddressAndCoords(latlng) {
          setFormData((prev) => ({
            ...prev,
            accomLat: latlng.getLat(),
            accomLon: latlng.getLng(),
          }));

          const geocoder = new window.kakao.maps.services.Geocoder();
          geocoder.coord2Address(
            latlng.getLng(),
            latlng.getLat(),
            (result, status) => {
              if (status === window.kakao.maps.services.Status.OK) {
                const roadAddr = result[0].road_address?.address_name || '';
                const jibunAddr = result[0].address?.address_name || '';
                const zipCode = result[0].road_address?.zone_no || '';

                setFormData((prev) => ({
                  ...prev,
                  accomAddr: roadAddr || jibunAddr,
                  accomZipCode: zipCode,
                }));
              }
            }
          );
        }
      });
    }
  };

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      initKakaoMap();
    }
  }, [formData.accomAddr]);

  return (
    <form
      className='accom-form'
      encType='multipart/form-data'
      onSubmit={handleSubmit}
    >
      {/* 숙박업소 정보 등록 */}
      <FormItem title='숙박업소 정보 등록'>
        <select
          className='accom-type-select'
          name='accomTypeNo'
          value={formData.accomTypeNo}
          onChange={handleChange}
        >
          {Object.entries(accomTypeMap).map(([key, value]) => (
            <option
              key={key}
              value={key}
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
          value={formData.accomName}
          onChange={handleChange}
        />
        <AdminInput
          type='tel'
          name='accomPhone'
          className='accom-phone'
          placeholder={"'-'없이 입력해주세요"}
          value={formData.accomPhone}
          onChange={handleChange}
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
          value={formData.accomDesc}
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
        <Script
          async
          src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${
            import.meta.env.VITE_KAKAO_JAVA_API
          }&autoload=false&libraries=services`}
          onLoad={() => {
            if (window.kakao && window.kakao.maps) {
              window.kakao.maps.load(() => {
                initKakaoMap();
              });
            }
          }}
        />
        <div
          className='map-area'
          ref={mapRef}
          style={{
            width: '100%',
            height: '500px',
            borderRadius: '8px',
          }}
        ></div>
        <div className='map-input'>
          {/* 경도 */}
          <input
            type='hidden'
            name='accomLon'
            value={formData.accomLon}
            readOnly
          />
          {/* 위도 */}
          <input
            type='hidden'
            name='accomLat'
            value={formData.accomLat}
            readOnly
          />

          <AdminInput
            type='text'
            name='accomZipCode'
            className='accom-zip-code'
            placeholder={'우편번호'}
            value={formData.accomZipCode}
            onChange={handleChange}
          />
          <AdminInput
            type='text'
            name='accomAddr'
            className='accom-addr'
            placeholder={'주소지'}
            value={formData.accomAddr}
            onChange={handleChange}
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
              active={facList.pub.includes(value.title)}
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
              active={facList.room.includes(value.title)}
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
              active={facList.etc.includes(value.title)}
            />
          ))}
        </div>
      </FormItem>

      {id ? (
        <div className='accom-reg-button-group'>
          <AdminPrimaryButton
            type={'button'}
            className={'accom-reg-button'}
            onClick={handleUpdate}
          >
            수정
          </AdminPrimaryButton>
          <AdminPrimaryButton
            type={'button'}
            className={'accom-reg-button'}
            onClick={handleDelete}
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
