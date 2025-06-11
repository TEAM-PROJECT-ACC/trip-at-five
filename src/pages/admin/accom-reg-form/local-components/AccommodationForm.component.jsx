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
  deleteAccomImageAPI,
} from '../../../../services/accom/apiService';
import { FaTrashAlt } from '../../../../assets/icons/index';
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
import AdminImageList from '../../room/local-components/AdminImageList.component';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteImageAPI } from '../../../../services/room/roomService.api';
import { useDeleteImageInfoStore } from '../../../../states/image-info/imageInfoStore';
import { toast, ToastContainer } from 'react-toastify';
import { toastInfo } from '../../room/local-components/data/roomRegFrom.constant';
import { Modal } from '../../../../components';
import { HttpStatusCode } from 'axios';

const accomTypeMap = {
  21: '모텔',
  22: '호텔',
  23: '리조트',
  24: '펜션',
  25: '캠핑',
  26: '게하/한옥',
  999: '미지정',
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
  const queryClient = useQueryClient();
  const { id } = useParams();
  const navigate = useNavigate();
  const mapRef = useRef(null);
  // 초기화
  const [accomData, setAccomData] = useState({
    accomSq: 0,
    accomName: '',
    accomPhone: '',
    accomDesc: '',
    accomZipCode: '',
    accomAddr: '',
    accomTypeNo: 999,
    accomLon: 0,
    accomLat: 0,
  });

  const [isAccomImageDeleteModalOpen, handleAccomImageDeleteModalOpen] =
    useState(false);
  const [imageFileData, setImageFileData] = useState([]);
  const { images } = useDeleteImageInfoStore((state) => state);

  const [word, setWord] = useState('');
  const [wordCount, setWordCount] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccomData((prev) => ({ ...prev, [name]: value }));
  };

  // 글자 수 세기
  const checkWordCountHandler = (e) => {
    // console.log(e.target.value);
    let value = e.target.value;

    if (value.length <= 1330) {
      setAccomData((prev) => ({ ...prev, accomDesc: value }));
      setWordCount(value.length);
    }
  };

  const [facList, setFacList] = useState({
    pub: [],
    room: [],
    etc: [],
  });

  // 이미지 삭제
  const { mutate: imageMutate } = useMutation({
    mutationKey: ['deleteAccomImageList'],
    mutationFn: async ({ deleteImageList }) => {
      // console.log(deleteImageList);

      const { status } = await deleteAccomImageAPI(id, deleteImageList);
      if (status !== 200) throw new Error('에러발생');
      return status;
    },
    onSuccess: (status, variables, context) => {
      // MutationFn이 성공 시 실행 되는 곳
      console.log('onSuccess', status, variables, context);
      // 변이 성공 시 캐시 무효화로 객실 폼 데이터 갱신!
      queryClient.invalidateQueries({ queryKey: ['deleteAccomImageList'] });

      if (status === HttpStatusCode.Ok) {
        successToastAlterFunc('이미지 삭제');
        setTimeout(() => navigate(0), 2000);
      }
    },
  });

  // 이미지 처리 핸들러
  const handleAccomImage = (e) => {
    const files = Array.from(e.target.files);
    setImageFileData(files);
  };
  const handleDeleteImageModal = (images) => {
    // console.log(imageList);
    if (images.length < 1) return;
    handleAccomImageDeleteModalOpen(true);
  };
  const handleDeleteImage = (imageList) => {
    imageMutate({ deleteImageList: { imageList } });
  };

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
      setAccomData({
        ...accomData,
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
      accomName: accomData.accomName,
      accomDesc: accomData.accomDesc,
      accomLat: parseFloat(accomData.accomLat),
      accomLon: parseFloat(accomData.accomLon),
      accomAddr: accomData.accomAddr,
      accomPhone: accomData.accomPhone,
      pubFacInfo: facList.pub.join(','),
      inRoomFacInfo: facList.room.join(','),
      etcFacInfo: facList.etc.join(','),
      accomTypeNo: parseInt(accomData.accomTypeNo, 10),
    };

    const formData = new FormData();

    for (const [key, val] of Object.entries(updatedData)) {
      if (val === 0 || val === '') {
        errorToastAlterFunc(`${key} 비어 있는 항목이 있습니다!`);
        return;
      }

      formData.append(key, val);
    }

    if (imageFileData.length > 0) {
      imageFileData.forEach((file) => formData.append('images', file));
    }

    console.log(Array.from(formData));

    try {
      await updateAdminAccomDetail(id, formData);
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
      accomName: accomData.accomName,
      accomDesc: accomData.accomDesc,
      accomLat: parseFloat(accomData.accomLat),
      accomLon: parseFloat(accomData.accomLon),
      accomAddr: accomData.accomAddr,
      accomPhone: accomData.accomPhone,
      pubFacInfo: facList.pub.join(','),
      inRoomFacInfo: facList.room.join(','),
      etcFacInfo: facList.etc.join(','),
      accomTypeNo: parseInt(accomData.accomTypeNo, 10),
      accomZipCode: accomData.accomZipCode,
    };

    const formData = new FormData();

    for (const [key, val] of Object.entries(newData)) {
      if (val === 0 || val === '') {
        errorToastAlterFunc(`${key} 비어 있는 항목이 있습니다!`);
        return;
      }

      formData.append(key, val);
    }

    if (imageFileData.length > 0) {
      imageFileData.forEach((file) => formData.append('images', file));
    }

    console.log(Array.from(formData));

    try {
      await createAdminAccom(formData);
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
        const centerLat = parseFloat(accomData.accomLat) || 33.450701;
        const centerLon = parseFloat(accomData.accomLon) || 126.570667;

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
          setAccomData((prev) => ({
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

                setAccomData((prev) => ({
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

  /**
   * 성공 시 toast 함수
   * @param {*} message
   */
  const successToastAlterFunc = (message) => {
    toast.success(`${message} 성공!`, toastInfo);
  };

  /**
   * 실패 시 toast 함수
   * @param {*} error
   */
  const errorToastAlterFunc = (error) => {
    toast.error(error, toastInfo);
  };

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      initKakaoMap();
    }
  }, [accomData.accomAddr]);

  return (
    <>
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
            value={accomData.accomTypeNo}
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
            value={accomData.accomName}
            onChange={handleChange}
          />
          <AdminInput
            type='tel'
            name='accomPhone'
            className='accom-phone'
            placeholder={"'-'없이 입력해주세요"}
            value={accomData.accomPhone}
            onChange={handleChange}
          />
        </FormItem>
        {/* 숙박업소 이미지 등록 */}
        <FormItem title='숙박업소 이미지 등록'>
          <AdminInput
            type='file'
            multiple
            name='imageList'
            className='accom-image'
            onChange={handleAccomImage}
          />
        </FormItem>
        <FormItem>
          <AdminImageList
            data={accomDetail}
            handleDeleteImageModal={handleDeleteImageModal}
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
            value={accomData.accomDesc}
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
              value={accomData.accomLon}
              readOnly
            />
            {/* 위도 */}
            <input
              type='hidden'
              name='accomLat'
              value={accomData.accomLat}
              readOnly
            />

            <AdminInput
              type='text'
              name='accomZipCode'
              className='accom-zip-code'
              placeholder={'우편번호'}
              value={accomData.accomZipCode}
              onChange={handleChange}
            />
            <AdminInput
              type='text'
              name='accomAddr'
              className='accom-addr'
              placeholder={'주소지'}
              value={accomData.accomAddr}
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
      <ToastContainer />
      {isAccomImageDeleteModalOpen && (
        <Modal
          modalHandler={handleAccomImageDeleteModalOpen}
          className='delete-image-modal'
          useCloseIcon={true}
        >
          <div className='delete-image-modal-message__container'>
            <span className='delete-image-modal-message'>
              숙박업소 이미지를 <strong>삭제</strong>하시겠습니까?
            </span>
          </div>
          <button
            className='delete-image-modal-button'
            onClick={() => handleDeleteImage(images)}
          >
            <FaTrashAlt />
          </button>
        </Modal>
      )}
    </>
  );
};

export default AccommodationForm;
