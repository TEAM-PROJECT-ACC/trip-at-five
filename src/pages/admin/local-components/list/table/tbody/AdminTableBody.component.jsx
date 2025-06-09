import { useParams } from 'react-router-dom';

const AdminTableBody = ({ dataList, onClickRow }) => {
  const id = useParams();
  return (
    <tbody className='admin-table-body'>
      {dataList?.map((item, idx) => (
        <tr
          key={idx}
          className='t-body-item'
          onClick={() => onClickRow(item.accomSq)}
        >
          <td className='t-body-item-col'>{item.accomSq}</td>
          <td className='t-body-item-col'>{item.accomTypeName}</td>
          <td className='t-body-item-col'>{item.accomName}</td>
          <td className='t-body-item-col'>{item.accomAddr}</td>
          <td className='t-body-item-col'>{item.accomPhone}</td>
          <td className='t-body-item-col'>{item.roomPrice}</td>
        </tr>
      ))}
    </tbody>
  );
};

export default AdminTableBody;
