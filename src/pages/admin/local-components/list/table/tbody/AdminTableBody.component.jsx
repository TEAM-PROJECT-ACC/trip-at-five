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
            {Object.keys(dataList[idx]).map((v, i) => {
              // console.log(v, i);
              return (
                <td
                  key={i}
                  className='t-body-item-col'
                >
                  {v === 'resCd' ? value[v].slice(0, 5) : value[v]}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

export default AdminTableBody;
