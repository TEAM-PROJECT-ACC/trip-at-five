import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { PageContainer } from '../../components/page-container/PageContainer.component';
import './accommodationDetail.style.scss';
import Script from '../accommodation/local-components/map/Script';
import RoomList from './components/room-list-component/RoomList.component';
import { Button } from '../../components';
import { FaArrowUp } from '../../assets/icons/ys/index';
import FacilityFilterView from './components/room-icon-component/FacilityFilterView.component';
import { RoomDetailText } from './components/room-detail-text/RoomDetailText.component';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { accommodationDetailByAccomSq } from '../../services/accom/accomService.api';
import  {AccomReview}  from './components/room-review-component/AccomReview.component';
import { getAccomLatestReviewAPI } from '../../services/review/reviewService.api';
import { loginStateStore } from '../../states/login/loginStore';
import { StarList } from '../../components/star-rating/components/star-list/StarList.component'; 

const AccommodationDetail = () => {
  const { id } = useParams();

  const [accom, setAccom] = useState({});
  const [latestReview, setLatestReview] = useState(null);
  
  const memNo = loginStateStore.getState().loginInfo.memSq;

  const imageList = [
    '/assets/images/room-page/sampleImg2.png',
    '/assets/images/room-page/bedroom.png',
    '/assets/images/room-page/sample1.png',
    '/assets/images/room-page/waterpark.png',
    '/assets/images/room-page/pool.png',
    '/assets/images/room-page/bedroom.png',
    '/assets/images/room-page/sample1.png',
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: 'flex',
          backgroundColor: '#5500ff',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          justifyContent: 'center',
          alignItems: 'center',
          top: '75px',
          left: '5px',
          zIndex: 100,
        }}
        onClick={onClick}
      />
    );
  }
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: 'flex',
          backgroundColor: '#5500ff',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          justifyContent: 'center',
          alignItems: 'center',
          left: '1195px',
          zIndex: 100,
        }}
        onClick={onClick}
      ></div>
    );
  }

  const [selectedImage, setSelectedImage] = useState(imageList[0]);
  const [showImageList, setShowImageList] = useState(false);

  const toggleImageList = () => setShowImageList((prev) => !prev);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = () => {
    setCurrentPage(pageNo);
  };
  const handleImageSelect = (imgUrl) => {
    setSelectedImage(imgUrl);
    setShowImageList(false);
  };
  const mapRef = useRef(null);

  const init = () => {
    if (window.kakao && window.kakao.maps && mapRef.current) {
      /* 해당 숙박업체의 위도경도에 따라 지도에 마커 위치가 변경*/
      const lat = accom.accomLat;
      const lon = accom.accomLon;
      const markPosition = new window.kakao.maps.LatLng(lat, lon);
      const map = new window.kakao.maps.Map(mapRef.current, {
        center: markPosition,
        level: 3,
      });

      /* 마커의 색상 변경을 위해 커스텀 이지미 사용 */
      const markerImageUrl = '/assets/images/map-marker/FaMapMarkerAlt.svg';

      const markerImage = new window.kakao.maps.MarkerImage(
        markerImageUrl,
        new window.kakao.maps.Size(40, 40),
        { offset: new window.kakao.maps.Point(20, 40) }
      );

      new window.kakao.maps.Marker({
        position: markPosition,
        map,
        image: markerImage,
      });

      const overlayContent = `
        <div class="custom-overlay-bubble">
          <div class="custom-overlay-label">${accom.accomName}</div>
        </div>
      `;
      const customOverlay = new window.kakao.maps.CustomOverlay({
        position: markPosition,
        content: overlayContent,
        yAnchor: 2.15,
      });
      customOverlay.setMap(map);
    }
  };
  const scrollRef = useRef(null);
  let scrollInterval = null;

  const startScroll = (direction) => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    scrollInterval = setInterval(() => {
      scrollElement.scrollLeft += direction === 'left' ? -10 : 10;
    }, 10);
  };

  const stopScroll = () => {
    clearInterval(scrollInterval);
  };

  const handleScrollToReview = () => {
    const target = document.getElementById('ancher-review');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToMap = () => {
    const target = document.getElementById('ancher-map');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 페이지 넘어올때 항상 상단으로 오게 설정
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(() => {
        init();
      });
    }
  }, [accom]);

 useEffect(() => {
  const fetchAccomDetail = async () => {
    try {
      const data = await accommodationDetailByAccomSq(id, memNo);
      // 상세 로그 추가
      console.log('=== [AccomDetail] 서버 응답 데이터 ===');
      console.log('accomSq:', data.accomSq, '| 프론트 id:', id);
      
      setAccom(data);
      if (data && data.images && data.images.length > 0) setSelectedImage(data.images[0]);
    } catch (error) {
      console.error('숙소 상세 데이터 불러오기 실패:', error);
    }
  };
  fetchAccomDetail();
}, [id, memNo]);

  useEffect(() => {
    if (accom.accomSq) {
      getAccomLatestReviewAPI(accom.accomSq).then(setLatestReview);
    }
  }, [accom.accomSq]);

  if (!accom) {
    return <div>Loading...</div>;
  }
  console.log(accom);
  return (
    <PageContainer>
      <Button
        className='scroll-to-top-btn'
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <FaArrowUp />
      </Button>
      <section className='accom-header'>
        <div className='image-wrapper'>
          <img
            className='accom-header__image'
            src={selectedImage}
          />
          <button
            className='accom-header-img-change-btn'
            onClick={toggleImageList}
          ></button>
        </div>

        {showImageList && (
          <div className='slick-container'>
            <Slider {...settings}>
              {imageList.map((img, idx) => (
                <div key={idx}>
                  <img
                    src={img}
                    className='image-box'
                    onClick={() => handleImageSelect(img)}
                  />
                </div>
              ))}
            </Slider>
          </div>
        )}
        <div className='accom-header__text'>
          {accom.accomName}
          <div className='accom-header__price'>
            {accom.roomPrice}원~ / <p className='accom-room-sub__price'>1박</p>
          </div>
        </div>
        <p className='accom-location'>{accom.accomAddr}</p>
      </section>

      {/* 숙소 정보 카드 */}
      <section className='accom-info-detail'>
        <div className='accom-info__map'>
          <button
            onClick={handleScrollToMap}
            className='accom-location-btn'
          >
            위치정보
          </button>
        </div>
        <button
          onClick={handleScrollToReview}
          className='accom-info__review'
        >
           {latestReview
            ? (
              <div className="accom-latest-review">
                <div className="review-header">
                  <span className="nickname-header">{latestReview.memNick}</span>
                  <StarList
                    className="latest-review-stars"
                    score={latestReview.revSco}
                    starList={Array(5).fill(0)}
                    starCount={5}
                    isDisabled={true}
                  />
                </div>
                <div className="review-content">{latestReview.revCont}</div>
              </div>
            )
            : <div className='noReviewYetOnHeader'>아직 후기가 작성되지 않았습니다.</div>
          }
        </button>
        <div className='accom-info__facility'>
          <FacilityFilterView
            selectedFacilities={[
              ...(accom.pubFacInfo
                ? accom.pubFacInfo.split(',').map((f) => f.trim())
                : []),
              ...(accom.etcFacInfo
                ? accom.etcFacInfo.split(',').map((f) => f.trim())
                : []),
            ]}
          />
        </div>
      </section>

      {/* 객실 목록 */}

      <RoomList
        rooms={accom.roomList}
        selectedFacilities={[
          ...(accom.inRoomFacInfo
            ? accom.inRoomFacInfo.split(',').map((f) => f.trim())
            : []),
        ]}
      />

      {/* 앵커 태그가 헤더 영역에 가려져서 빈 태그 추가 */}
      <div
        className='empty_blank'
        id='ancher-review'
      ></div>

      {/* 후기 섹션 */}

      <AccomReview
        resCd={accom.resCd}
        accomSq={accom.accomSq}
        memNo={memNo}
        onReviewSubmitted={() => {
          getAccomLatestReviewAPI(accom.accomSq).then(setLatestReview);
        }}
      />
      {/* 상세 정보 */}

      <RoomDetailText accom={accom}/>

      <section
        id='ancher-map'
        className='accom__map-container'
      >
        <div className='acc-detail-section__title'>위치</div>
        <div className='accom-info-mapContainer'>
          <Script
            async
            src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${
              import.meta.env.VITE_KAKAO_JAVA_API
            }&autoload=false`}
            onLoad={() => {
              if (window.kakao && window.kakao.maps) {
                window.kakao.maps.load(() => {
                  init();
                });
              }
            }}
          />
          <div
            ref={mapRef}
            className='mapStyle'
          />
        </div>
      </section>
    </PageContainer>
  );
};

export default AccommodationDetail;
