import React from 'react';

interface InfoCardProps {
    title: string;
    value: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, value }) => {
    return (
        <div className="p-5 rounded-md shadow-lg bg-[#144ee3]">
            <h3 className='text-4xl text-white'>{title}</h3>
            <p className='text-xl text-white'>{value}</p>
        </div>
    );
};

export default InfoCard;