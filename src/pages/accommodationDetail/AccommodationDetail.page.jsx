import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { PageContainer } from '../../components/page-container/PageContainer.component';
//import AccommodationHeader from './components/AccommodationHeader.component';
import './accommodationDetail.style.scss';
import Script from '../accommodation/local-components/map/Script';
import RoomList from './components/room-list-component/RoomList.component';
import { Modal, Pagination } from '../../components';
import FacilityFilterView from './components/room-icon-component/FacilityFilterView.component';
import { RoomDetailText } from './components/room-detail-text/RoomDetailText.component';
const AccommodationDetail = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const mapRef = useRef(null);

  const lat = 37.559945;
  const lon = 126.994601;

  const init = () => {
    if (window.kakao && window.kakao.maps && mapRef.current) {
      const map = new window.kakao.maps.Map(mapRef.current, {
        center: new window.kakao.maps.LatLng(lat, lon),
        level: 3,
      });

      new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(lat, lon),
        map,
      });
    }
  };

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(() => {
        init();
      });
    }
  }, []);

  return (
    <PageContainer>
      <section className='accom-header'>
        <img className='accom-header__image' />
        <div className='accom-header__text'>
          서울신라호텔
          <div className='accom-header__price'>
            150,000원 / <p>1박</p>
          </div>
        </div>
        <p className='accom-location'>서울 중구 장충동2가 202</p>
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
      
      {/* 후기 섹션 */}
      <section id='ancher-review' className='review-section'>
        <div className="review-section__header">
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
          <div className="review-text-box">
            <span className='nickname'>코알라잉</span>
            <span className='stars'>⭐⭐⭐⭐⭐</span>
            <div className='inner-card-comment'>
              리조트는 멋진 산책로와 수영장이 있었고 매우 조용해서 힐링할 수
              있었습니다. 직원도 매우 친절했어요!리조트는 멋진 산책로와 수영장이 있었고 매우 조용해서 힐링할 수
              있었습니다. 직원도 매우 친절했어요!
              리조트는 멋진 산책로와 수영장이 있었고 매우 조용해서 힐링할 수
              있었습니다. 직원도 매우 친절했어요!
            </div>
            <div className="see-more-comment">더보기</div>
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
          <div className="review-text-box">
            <span className='nickname'>코알라잉</span>
            <span className='stars'>⭐⭐⭐⭐⭐</span>
            <div className='inner-card-comment'>
              리조트는 멋진 산책로와 수영장이 있었고 매우 조용해서 힐링할 수
              있었습니다. 직원도 매우 친절했어요!리조트는 멋진 산책로와 수영장이 있었고 매우 조용해서 힐링할 수
              있었습니다. 직원도 매우 친절했어요!
              리조트는 멋진 산책로와 수영장이 있었고 매우 조용해서 힐링할 수
              있었습니다. 직원도 매우 친절했어요!
            </div>
            <div className="see-more-comment">더보기</div>
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
          <div className="review-text-box">
            <span className='nickname'>코알라잉</span>
            <span className='stars'>⭐⭐⭐⭐⭐</span>
            <div className='inner-card-comment'>
              리조트는 멋진 산책로와 수영장이 있었고 매우 조용해서 힐링할 수
              있었습니다. 직원도 매우 친절했어요!리조트는 멋진 산책로와 수영장이 있었고 매우 조용해서 힐링할 수
              있었습니다. 직원도 매우 친절했어요!
              리조트는 멋진 산책로와 수영장이 있었고 매우 조용해서 힐링할 수
              있었습니다. 직원도 매우 친절했어요!
            </div>
            <div className="see-more-comment">더보기</div>
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
          <div className="review-text-box">
            <span className='nickname'>코알라잉</span>
            <span className='stars'>⭐⭐⭐⭐⭐</span>
            <div className='inner-card-comment'>
              리조트는 멋진 산책로와 수영장이 있었고 매우 조용해서 힐링할 수
              있었습니다. 직원도 매우 친절했어요!리조트는 멋진 산책로와 수영장이 있었고 매우 조용해서 힐링할 수
              있었습니다. 직원도 매우 친절했어요!
              리조트는 멋진 산책로와 수영장이 있었고 매우 조용해서 힐링할 수
              있었습니다. 직원도 매우 친절했어요!
            </div>
            <div className="see-more-comment">더보기</div>
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
          <div className="review-text-box">
            <span className='nickname'>코알라잉</span>
            <span className='stars'>⭐⭐⭐⭐⭐</span>
            <div className='inner-card-comment'>
              리조트는 멋진 산책로와 수영장이 있었고 매우 조용해서 힐링할 수
              있었습니다. 직원도 매우 친절했어요!리조트는 멋진 산책로와 수영장이 있었고 매우 조용해서 힐링할 수
              있었습니다. 직원도 매우 친절했어요!
              리조트는 멋진 산책로와 수영장이 있었고 매우 조용해서 힐링할 수
              있었습니다. 직원도 매우 친절했어요!
            </div>
            <div className="see-more-comment">더보기</div>
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
