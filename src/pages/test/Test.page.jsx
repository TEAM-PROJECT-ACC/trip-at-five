import { useState } from 'react';
import {
  Button,
  ButtonPrimary,
  ButtonSecondary,
  LinkButton,
  TextLinkButton,
  InputPrimary,
  InputSecondary,
  InputShrink,
  Label,
  Select,
  Pagination,
  StarRating,
  PageContainer,
  Modal,
} from '../../components';
import { ClassNamesTest } from '../../utils';
import './test.style.scss';
import { useModal } from '../../hooks';

const PAGINATION_PROPS = {
  className: '',
  totalCount: 150,
  pageLength: 7,
  currentPage: 1,
  numOfRows: 10,
};

export const TestPage = () => {
  const { isModalOpen, handleModalOpen } = useModal();
  const [pageNationProps, setPagintionProps] = useState(() => {
    return {
      className: '',
      totalCount: 150,
      pageLength: 7,
      currentPage: 1,
      numOfRows: 10,
    };
  });

  const [starRateScore, setStarRateScore] = useState(() => 2.6);
  const { isModalOpen, handleModalOpen } = useModal();

  const handlePagination = (pageNo) => {
    setPagintionProps((prev) => {
      return {
        ...prev,
        currentPage: pageNo,
      };
    });
  };

  const handleStarRating = (score) => {
    console.log(score);
    setStarRateScore(() => score);
  };

  return (
    <PageContainer>
      <div className='test-page__container'>
        <ClassNamesTest />
        <section className='test-page__section'>
          <h1>전역 (공용) 컴포넌트 확인</h1>
          <ButtonPrimary onClick={handleModalOpen}>
            어느 위치에서든 모달 열기
          </ButtonPrimary>
          <h3>input component</h3>
          <div className='test-page__test-area'>
            <div className='test-page__test-input'>
              <InputPrimary />
            </div>
            <div className='test-page__test-input'>
              <InputSecondary />
            </div>
            <div className='test-page__test-input'>
              <InputShrink
                labelText={'라벨'}
                id='test-input-1'
              />
            </div>
            <div className='test-page__test-input'>
              <InputShrink
                labelText={'라벨'}
                id='test-input-2'
              />
            </div>
            <div className='test-page__test-input'>
              <InputShrink
                labelText={'라벨'}
                id='test-input-3'
              />
            </div>
          </div>
          <h3>button component</h3>
          <div className='test-page__test-area'>
            <ButtonPrimary onClick={handleModalOpen}>
              어느 위치에서든 모달 열기
            </ButtonPrimary>
            <Button>버튼</Button>
            <ButtonPrimary>기본 버튼</ButtonPrimary>
            <ButtonSecondary>두번째 버튼</ButtonSecondary>
            <LinkButton>링크버튼</LinkButton>
            <span className='test-page__text-link-container'>
              <TextLinkButton>텍스트링크버튼</TextLinkButton>
            </span>
          </div>
          <h3>label component</h3>
          <div className='test-page__test-area'>
            <Label className='primary'>primary</Label>
            <Label className='secondary'>secondary</Label>
            <Label className='neutral'>neutral</Label>
            <Label className='danger'>danger</Label>
          </div>
          <h3>select component</h3>
          <div className='test-page__test-area'>
            <form
              method='get'
              action='/enroll'
            >
              <Select
                optionList={[
                  { value: '1', label: 'option1' },
                  { value: '2', label: 'option2' },
                  { value: '3', label: 'option3' },
                  { value: '4', label: 'option4' },
                  { value: '5', label: 'option5' },
                  { value: '6', label: 'option6' },
                  { value: '1', label: 'option1' },
                  { value: '2', label: 'option2' },
                  { value: '3', label: 'option3' },
                  { value: '4', label: 'option4' },
                  { value: '5', label: 'option5' },
                  { value: '6', label: 'option6' },
                  { value: '1', label: 'option1' },
                  { value: '2', label: 'option2' },
                  { value: '3', label: 'option3' },
                  { value: '4', label: 'option4' },
                  { value: '5', label: 'option5' },
                  { value: '6', label: 'option6' },
                ]}
              />
            </form>
          </div>
          <h3>pagination component</h3>
          <div className='test-page__test-area'>
            <Pagination
              onClick={handlePagination}
              useMoveToEnd
              {...pageNationProps}
            />
          </div>
          <h3>starRating component</h3>
          <div className='test-page__test-area'>
            <h3>30px</h3>
            <StarRating
              score={starRateScore}
              onClick={handleStarRating}
            />
            <br></br>
            <h3></h3>
            <StarRating
              className='test'
              score={starRateScore}
              onClick={handleStarRating}
              isDisabled={true}
            />
          </div>
          <h3>modal test</h3>
          <div className='test-page__test-area'>
            <ButtonPrimary onClick={handleModalOpen}>모달 열기</ButtonPrimary>
            {isModalOpen && (
              <Modal modalHandler={handleModalOpen}>
                <>모달 테스트</>
              </Modal>
            )}
          </div>
        </section>
      </div>
    </PageContainer>
  );
};
