import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const AdminTableBody = ({ dataList, onClickRow }) => {
  const id = useParams();
  return (
    <tbody className='admin-table-body'>
      {dataList?.map((value, idx) => {
        // console.dir('===> value : ' + JSON.stringify(value));
        return (
          <tr
            key={idx}
            className='t-body-item'
            onClick={() => onClickRow(value.no, id?.id)}
          >
            {Object.keys(dataList[idx]).map((v, i) => (
              <td
                key={i}
                className='t-body-item-col'
              >
                {value[v]}
              </td>
            ))}
          </tr>
        );
      })}
    </tbody>
  );
};

export default AdminTableBody;
