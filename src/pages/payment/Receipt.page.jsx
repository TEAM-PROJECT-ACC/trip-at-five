import ReceiptArea from './local-components/ReceiptArea.component';
import { PageContainer } from '../../components';
import { orderResultAPI } from '../../services/reservation/reservationService';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import './Receipt.style.scss';

const Receipt = () => {
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ['resultPayment'],
    queryFn: async () => {
      console.log(id);
      const { data } = await orderResultAPI(id);
      console.log(data);
      return data;
    },
    staleTime: 1000 * 60,
  });
  return (
    <PageContainer className='receipt__container'>
      {isLoading ? <p>로딩중...</p> : <ReceiptArea orderInfo={data} />}
    </PageContainer>
  );
};

export default Receipt;
