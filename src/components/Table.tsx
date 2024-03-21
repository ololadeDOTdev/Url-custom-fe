import React from 'react';

interface TableProps {
    data: any[];
    columns: string[];
}

const Table: React.FC<TableProps> = ({ data, columns }) => {
    return (
        <table className='w-full'>
            <thead className=''>
                <tr className='text-left font-semibold border-b-4 border-[#144ee3]'>
                    {columns.map((column, index) => (
                        <th key={index}>{column}</th>
                    ))}
                </tr>
            </thead>
            <tbody className=''>
                {data.map((row, rowIndex) => (
                    <tr className="h-14 border-b-2" key={rowIndex}>
                        {columns.map((column, columnIndex) => (
                            <td key={columnIndex}>{row[column]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;