import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AccommodationForm from './local-components/AccommodationForm.component';
import RoomList from './local-components/room-list/RoomList';
import { selectAdminAcommDetail } from '../../../services/accom/accomService.api';
import './AccommodationFormContainer.style.scss';

const AccommodationFormContainer = () => {
  const { id } = useParams();
  const [accomDetail, setAccomDetail] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchDetail = async () => {
        try {
          const data = await selectAdminAcommDetail(id);
          setAccomDetail(data);
        } catch (error) {
          console.log('숙박상세 데이터 조회 실패', error);
        }
      };
      fetchDetail();
    }
  }, [id]);

  return (
    <div className='accom-form__container'>
      <div className='accom-reg-date'>
        <span className='accom-date'>{accomDetail?.accomRegDt}</span>
        <span>에 등록되었습니다.</span>
      </div>
      <AccommodationForm accomDetail={accomDetail} />
      {id !== null && id !== undefined && <RoomList accomNo={id} />}
    </div>
  );
};

export default AccommodationFormContainer;
