import React, { useEffect, useRef } from 'react';
import { PageContainer } from '../../components/page-container/PageContainer.component';
import AccommodationHeader from './components/AccommodationHeader.component';
import './AccommodationDetail.style.scss';
import Script from '../accommodation/local-components/map/Script';
import { Button } from '../../components';
import RoomList from './components/RoomList.component';

const AccommodationDetail = () => {
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
          <Button className="accom-location-btn">위치정보</Button>
        </div>
        <div className='accom-info__review'>
          <div className="review-header">
            <p className='nickname'>닉네임</p>
            <div className='stars'>⭐⭐⭐⭐⭐</div>
          </div>
          <p className='comment'>
            편안한 분위기와 친절한 직원들 덕분에 즐거운 여행이었습니다. 위치도
            좋고 청결해서 다시 방문하고 싶어요.
          </p>
        </div>
        <div className='accom-info__facility'>
          <h4>기본 제공 시설</h4>
          <ul>
            <li>WiFi</li>
            <li>욕조</li>
            <li>조식</li>
            <li>헬스장</li>
          </ul>
        </div>
      </section>

      {/* 객실 목록 */}
      <RoomList />

      {/* 후기 섹션 */}
      <section className='review-section'>
        <h2>이용 후기</h2>

        <div className='review-card'>
          <div className='images'>
            <div className='img'></div>
            <div className='img'></div>
            <div className='img'></div>
            <div className='img'></div>
            <div className='img'></div>
          </div>
          <br />
          <p className='nickname'>코알라잉</p>
          <div className='stars'>⭐⭐⭐⭐⭐</div>
          <p className='comment'>
            리조트는 멋진 산책로와 수영장이 있었고 매우 조용해서 힐링할 수
            있었습니다. 직원도 매우 친절했어요!
          </p>
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
          <p className='nickname'>코알라잉</p>
          <div className='stars'>⭐⭐⭐⭐⭐</div>
          <p className='comment'>
            리조트는 멋진 산책로와 수영장이 있었고 매우 조용해서 힐링할 수
            있었습니다. 직원도 매우 친절했어요!
          </p>
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
          <p className='nickname'>코알라잉</p>
          <div className='stars'>⭐⭐⭐⭐⭐</div>
          <p className='comment'>
            리조트는 멋진 산책로와 수영장이 있었고 매우 조용해서 힐링할 수
            있었습니다. 직원도 매우 친절했어요!
          </p>
        </div>
      </section>

      {/* 상세 정보 */}
      <section className='detail-info'>
        <h2>상세정보</h2>
        <p>
          [사계절 온수풀 해온 HE:ON 정기 점검 안내]
          <br />
          항상 롯데호텔 제주에 보내주시는 고객님의 성원에 진심으로 감사드립니다
          <br />
          고객님께 쾌적하고 안락한 여가 공간을 제공해 드리기 위해 해온 수질 관리
          및 정기 점검을 시행합니다
          <br />
          이로 인해 아래 기간 동안 사계절 온수풀 해온 이용이 제한되오니, 이 점
          고객님들의 깊은 양해 부탁드립니다
          <br />
          언제나 최상의 환경에서 고객님을 모실 수 있도록 최선의 노력을
          다하겠습니다
          <br />
          해온 정기 점검 일자 : 2025년 7월 12
          <br />
          <br />
          패밀리트윈 (더블+싱글) 마감 시 트윈(싱글+싱글)+엑스트라베드로 제공 될
          수 있습니다
          <br />
          더블 혹은 트윈 객실은 체크인 시 배정되며, 지정이 불가합니다
          <br />
          자세한 내용은 호텔로 문의바랍니다
          <br />
        </p>
      </section>
      <section className='accom-info-detail'>
        <h2>위치</h2>
        <div className='accom-info__map'>
          <Script
            async
            src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_JAVA_API}&autoload=false`}
            onLoad={() => {
              if (window.kakao && window.kakao.maps) {
                window.kakao.maps.load(() => {
                  init();
                });
              }
            }}
            />
            <div ref={mapRef} style={{ width: '100%', height: '380px' }} />
          </div>
        </section>
    </PageContainer>
  );
};

export default AccommodationDetail;
