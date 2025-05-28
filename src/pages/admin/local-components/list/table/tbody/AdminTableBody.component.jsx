import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const AdminTableBody = ({ dataList, onClickRow }) => {
  const id = useParams();
  // const onClick = (value) => {
  //   if (onClickRow) onClickRow(value);
  // };

  useEffect(() => {
    console.log(id);
    // console.log(Object.keys(dataList));
    // dataList.map((value, idx) => console.log(value));
    // Object.keys(dataList[0]).map((v, i) => console.log(v));
    // dataList.map((value, idx) => Object.keys(dataList[0]).map((v, i) => console.log(value[idx][`${}`])));
  });
  return (
    <tbody className='admin-table-body'>
      {dataList.map((value, idx) => (
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
      ))}
      {/* {dataList.map((value, idx) => (
        <tr key={idx} className='t-body-item' onClick={() => onClickRow(value.accom_sq)}>
          {Object.keys(dataList[idx]).map((v, i) => {
            console.log(value[v]);
            return (
              i > 0 && (
                <td key={i} className='t-body-item-col'>
                  {value[v]}
                </td>
              )
            );
          })}
        </tr>
      ))} */}
    </tbody>
  );
};

export default AdminTableBody;
