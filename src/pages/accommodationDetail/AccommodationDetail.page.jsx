import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { PageContainer } from '../../components/page-container/PageContainer.component';
//import AccommodationHeader from './components/AccommodationHeader.component';
import './accommodationDetail.style.scss';
import Script from '../accommodation/local-components/map/Script';
import RoomList from './components/room-list-component/RoomList.component';
import { Modal, Pagination } from '../../components';
import { FaMapMarkerAlt } from '../../assets/icons/ys/index';
import FacilityFilterView from './components/room-icon-component/FacilityFilterView.component';
import { RoomDetailText } from './components/room-detail-text/RoomDetailText.component';
import { accomData } from '../../assets/sample-data/accomSampleData';

const AccommodationDetail = () => {
  const { id } = useParams();
  const accom = accomData.accommodation_tb.find(
    (item) => String(item.accom_sq) === String(id)
  );
  const [modalOpen, setModalOpen] = useState(false);

  const mapRef = useRef(null);

  const init = () => {
    if (window.kakao && window.kakao.maps && mapRef.current) {
      /* 해당 숙박업체의 위도경도에 따라 지도에 마커 위치가 변경*/
      const lat = accom.accom_lat;
      const lon = accom.accom_lon;

      const map = new window.kakao.maps.Map(mapRef.current, {
        center: new window.kakao.maps.LatLng(lat, lon),
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
        position: new window.kakao.maps.LatLng(lat, lon),
        map,
        image: markerImage,
      });
    }
  };

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(() => {
        init();
      });
    }
  }, [accom]);

  return (
    <PageContainer>
      <section className='accom-header'>
        <img className='accom-header__image' />
        <div className='accom-header__text'>
          {accom?.accom_name}
          <div className='accom-header__price'>
            {accom &&
              Math.min(
                ...accom.rooms.map((room) => room.room_price)
              ).toLocaleString()}
            원~ / <p className='accom-room-sub__price'>1박</p>
          </div>
        </div>
        <p className='accom-location'>{accom?.accom_location}</p>
      </section>

      {/* 숙소 정보 카드 */}
      <section className='accom-info-detail'>
        <div className='accom-info__map'>
          <a href='#ancher-map' className='accom-location-btn'>
            위치정보
          </a>
        </div>
        <a href='#ancher-review' className='accom-info__review'>
          <div className='review-header'>
            <p className='nickname'>닉네임</p>
            <div className='stars'>⭐⭐⭐⭐⭐</div>
          </div>
          <p className='comment'>
            편안한 분위기와 친절한 직원들 덕분에 즐거운 여행이었습니다. 위치도
            좋고 청결해서 다시 방문하고 싶어요.
          </p>
        </a>
        <div className='accom-info__facility'>
          <FacilityFilterView />
        </div>
      </section>

      {/* 객실 목록 */}

      <RoomList />

      {/* 앵커 태그가 헤더 영역에 가려져서 빈 태그 추가 */}
      <div className='empty_blank' id='ancher-review'></div>
      {/* 후기 섹션 */}
      <section className='review-section'>
        <div className='review-section__header'>
          <div className='acc-detail-section__title'>이용 후기</div>
          <div className='review-stars'>⭐3.0</div>
          <button
            onClick={() => {
              setModalOpen(true);
            }}
            className='accom-modal-btn'
          >
            후기 등록
          </button>
          {modalOpen && (
            <Modal>
              <>모달 테스트</>
            </Modal>
          )}
        </div>
        <div className='review-card'>
          <div className='images'>
            <div className='img'></div>
            <div className='img'></div>
            <div className='img'></div>
            <div className='img'></div>
            <div className='img'></div>
          </div>
          <br />
          <div className='review-text-box'>
            <span className='nickname'>코알라잉</span>
            <span className='stars'>⭐⭐⭐⭐⭐</span>
            <div className='inner-card-comment'>
              리조트는 멋진 산책로와 수영장이 있었고 매우 조용해서 힐링할 수
              있었습니다. 직원도 매우 친절했어요!리조트는 멋진 산책로와 수영장이
              있었고 매우 조용해서 힐링할 수 있었습니다. 직원도 매우 친절했어요!
              리조트는 멋진 산책로와 수영장이 있었고 매우 조용해서 힐링할 수
              있었습니다. 직원도 매우 친절했어요!
            </div>
            <div className='see-more-comment'>더보기</div>
          </div>
        </div>
        <div className='review-card'>
          <div className='images'>
            <div className='img'></div>
            <div className='img'></div>
            <div className='img'></div>
            <div className='img'></div>
            <div className='img'></div>
          </div>
          <br />
          <div className='review-text-box'>
            <span className='nickname'>코알라잉</span>
            <span className='stars'>⭐⭐⭐⭐⭐</span>
            <div className='inner-card-comment'>
              리조트는 멋진 산책로와 수영장이 있었고 매우 조용해서 힐링할 수
              있었습니다. 직원도 매우 친절했어요!리조트는 멋진 산책로와 수영장이
              있었고 매우 조용해서 힐링할 수 있었습니다. 직원도 매우 친절했어요!
              리조트는 멋진 산책로와 수영장이 있었고 매우 조용해서 힐링할 수
              있었습니다. 직원도 매우 친절했어요!
            </div>
            <div className='see-more-comment'>더보기</div>
          </div>
        </div>
        <div className='review-card'>
          <div className='images'>
            <div className='img'></div>
            <div className='img'></div>
            <div className='img'></div>
            <div className='img'></div>
            <div className='img'></div>
          </div>
          <br />
          <div className='review-text-box'>
            <span className='nickname'>코알라잉</span>
            <span className='stars'>⭐⭐⭐⭐⭐</span>
            <div className='inner-card-comment'>
              리조트는 멋진 산책로와 수영장이 있었고 매우 조용해서 힐링할 수
              있었습니다. 직원도 매우 친절했어요!리조트는 멋진 산책로와 수영장이
              있었고 매우 조용해서 힐링할 수 있었습니다. 직원도 매우 친절했어요!
              리조트는 멋진 산책로와 수영장이 있었고 매우 조용해서 힐링할 수
              있었습니다. 직원도 매우 친절했어요!
            </div>
            <div className='see-more-comment'>더보기</div>
          </div>
        </div>
        <div className='review-card'>
          <div className='images'>
            <div className='img'></div>
            <div className='img'></div>
            <div className='img'></div>
            <div className='img'></div>
            <div className='img'></div>
          </div>
          <br />
          <div className='review-text-box'>
            <span className='nickname'>코알라잉</span>
            <span className='stars'>⭐⭐⭐⭐⭐</span>
            <div className='inner-card-comment'>
              리조트는 멋진 산책로와 수영장이 있었고 매우 조용해서 힐링할 수
              있었습니다. 직원도 매우 친절했어요!리조트는 멋진 산책로와 수영장이
              있었고 매우 조용해서 힐링할 수 있었습니다. 직원도 매우 친절했어요!
              리조트는 멋진 산책로와 수영장이 있었고 매우 조용해서 힐링할 수
              있었습니다. 직원도 매우 친절했어요!
            </div>
            <div className='see-more-comment'>더보기</div>
          </div>
        </div>
        <div className='review-card'>
          <div className='images'>
            <div className='img'></div>
            <div className='img'></div>
            <div className='img'></div>
            <div className='img'></div>
            <div className='img'></div>
          </div>
          <br />
          <div className='review-text-box'>
            <span className='nickname'>코알라잉</span>
            <span className='stars'>⭐⭐⭐⭐⭐</span>
            <div className='inner-card-comment'>
              리조트는 멋진 산책로와 수영장이 있었고 매우 조용해서 힐링할 수
              있었습니다. 직원도 매우 친절했어요!리조트는 멋진 산책로와 수영장이
              있었고 매우 조용해서 힐링할 수 있었습니다. 직원도 매우 친절했어요!
              리조트는 멋진 산책로와 수영장이 있었고 매우 조용해서 힐링할 수
              있었습니다. 직원도 매우 친절했어요!
            </div>
            <div className='see-more-comment'>더보기</div>
          </div>
        </div>
        <Pagination />
      </section>

      {/* 상세 정보 */}

      <RoomDetailText />

      <section id='ancher-map' className='accom__map-container'>
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
          <div ref={mapRef} className='mapStyle' />
        </div>
      </section>
    </PageContainer>
  );
};

export default AccommodationDetail;
