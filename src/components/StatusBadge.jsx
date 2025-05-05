import React from 'react';

const StatusBadge = ({ status }) => {
    const getStatusConfig = (status) => {
        switch (status) {
            case 'completed':
                return {
                    text: 'Tamamlandı',
                    bgColor: 'bg-green-100',
                    textColor: 'text-green-700'
                };
            case 'in_progress':
                return {
                    text: 'Devam Ediyor',
                    bgColor: 'bg-blue-100',
                    textColor: 'text-blue-700'
                };
            case 'cancelled':
                return {
                    text: 'İptal Edildi',
                    bgColor: 'bg-red-100',
                    textColor: 'text-red-700'
                };
            default:
                return {
                    text: 'Beklemede',
                    bgColor: 'bg-yellow-100',
                    textColor: 'text-yellow-700'
                };
        }
    };

    const { text, bgColor, textColor } = getStatusConfig(status);

    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
            {text}
        </span>
    );
};

export default StatusBadge; 