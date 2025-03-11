import React from 'react';

interface TableColumn {
  key: string;
  header: string;
  width?: string;
}

// Define a type for table cell values that covers common value types
type CellValue = string | number | boolean | null | undefined | React.ReactNode;

interface TableProps {
  columns: TableColumn[];
  data: Record<string, CellValue>[];
  className?: string;
}

const CustomTable: React.FC<TableProps> = ({
  columns,
  data,
  className = '',
}) => {
  return (
    <div className={`w-full overflow-x-auto rounded-lg ${className}`}>
      <table className='w-full border-collapse'>
        <colgroup>
          {columns.map((_, index) => (
            <col key={index} style={{ width: `${100 / columns.length}%` }} />
          ))}
        </colgroup>
        <thead>
          <tr>
            {columns.map((column, idx) => (
              <th
                key={column.key}
                className={`bg-yellow p-5 text-left font-medium text-black border-b border-[#F1F1F3] first:rounded-tl-lg last:rounded-tr-lg ${
                  idx !== columns.length - 1 ? 'border-r border-[#F1F1F3]' : ''
                }`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? 'bg-[#FAFAFA]' : 'bg-[#FCFCFD]'}
            >
              {columns.map((column, colIndex) => (
                <td
                  key={`${index}-${column.key}`}
                  className={`p-5 text-[#656567] border-b border-[#F1F1F3] ${
                    colIndex !== columns.length - 1
                      ? 'border-r border-[#F1F1F3]'
                      : ''
                  } ${index === data.length - 1 ? 'last-row' : ''} ${
                    colIndex === 0 ? 'first:rounded-bl-lg' : ''
                  } ${
                    colIndex === columns.length - 1 ? 'last:rounded-br-lg' : ''
                  }`}
                >
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <style jsx>{`
        table {
          table-layout: fixed;
        }

        .last-row td {
          border-bottom: none;
        }

        .last-row:last-child td:first-child {
          border-bottom-left-radius: 0.5rem;
        }

        .last-row:last-child td:last-child {
          border-bottom-right-radius: 0.5rem;
        }

        @media (max-width: 768px) {
          table {
            font-size: 0.9rem;
          }
          th,
          td {
            padding: 0.75rem !important;
            word-break: break-word;
          }
        }

        @media (max-width: 640px) {
          table {
            font-size: 0.85rem;
          }
          th,
          td {
            padding: 0.5rem !important;
            word-break: break-word;
          }
        }

        @media (max-width: 480px) {
          table {
            font-size: 0.75rem;
          }
          th,
          td {
            padding: 0.4rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default CustomTable;
