export default function Field({data, onClick}) {
  return (
      <table className='field' id='field'><tbody>
          {data.map((row, rowIndex) => {return (
              <tr id={rowIndex} key={'row' + rowIndex}>
                  {row.map((column, colIndex) => {return (
                      <td
                          key={colIndex.toString().padStart(2, '0') + rowIndex.toString().padStart(2, '0')}
                          className={column}
                          id={colIndex.toString().padStart(2, '0') + rowIndex.toString().padStart(2, '0')}
                          onClick={onClick}
                      >
                      </td>
                       )})}
              </tr>
          )})}
      </tbody></table>
  );
}