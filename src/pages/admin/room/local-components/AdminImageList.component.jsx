import React, { useEffect, useRef, useState } from 'react';
import { VITE_SERVER_BASE_URL } from '../../../../../env.config';
import { useDeleteImageInfoStore } from '../../../../states/image-info/imageInfoStore';
import './adminImageList.style.scss';

const AdminImageList = ({ data, handleDeleteImageModal }) => {
  const { images, setImages } = useDeleteImageInfoStore((state) => state);
  const [selectedAll, setSelectedAll] = useState(false);

  // 전체 선택
  const handleCheckAll = () => {
    setImages([...data.imageList]);
    setSelectedAll(true);
  };

  const handleCheckAllClear = () => {
    setImages([]);
    setSelectedAll(false);
  };

  const handleCheck = (value) => {
    const exists = images.some((item) => item.hashCode === value.hashCode);

    if (exists) {
      setImages(images.filter((item) => item.hashCode !== value.hashCode));
    } else {
      setImages([...images, value]);
    }
  };

  const handleDelete = () => {
    handleDeleteImageModal(images);
  };

  return (
    <div className='image-list__container'>
      <div className='image-check-option__container'>
        <span
          className='check-all__true'
          onClick={handleCheckAll}
        >
          전체선택
        </span>
        <span
          className='check-all__false'
          onClick={handleCheckAllClear}
        >
          전체해제
        </span>
        <span
          className='check-all__false'
          onClick={handleDelete}
        >
          삭제
        </span>
      </div>
      {data?.imageList && data?.imageList.length > 0 ? (
        data?.imageList.map((value, idx) => {
          console.log(value);
          const isChecked = images.some(
            (item) => item.hashCode === value.hashCode
          );
          return (
            <div
              key={idx}
              className={`preview-img ${isChecked ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handleCheck(value);
              }}
            >
              <img
                src={`${VITE_SERVER_BASE_URL}${value.imagePath}`}
                alt={`이미지 ${idx + 1}`}
              />
            </div>
          );
        })
      ) : (
        <p>등록된 이미지가 없습니다.</p>
      )}
    </div>
  );
};

export default AdminImageList;
