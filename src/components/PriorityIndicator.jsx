import React from 'react';

const PriorityIndicator = ({ priority }) => {

    // Bu fonksiyon gelen priority değerine göre üç farklı öncelik türünden birine karar verir.
    const getPriorityConfig = (priority) => {
        switch (priority) {
            case 'high':
                return {
                    text: 'Yüksek',
                    bgColor: 'bg-red-100',
                    textColor: 'text-red-700',
                    icon: '🔴'
                };
            case 'medium':
                return {
                    text: 'Orta',
                    bgColor: 'bg-yellow-100',
                    textColor: 'text-yellow-700',
                    icon: '🟡'
                };
            default:
                return {
                    text: 'Düşük',
                    bgColor: 'bg-green-100',
                    textColor: 'text-green-700',
                    icon: '🟢'
                };
        }
    };

    // Priority değerine bağlı olarak ilgili metin, arka plan rengi, yazı rengi ve ikonu alır.
    const { text, bgColor, textColor, icon } = getPriorityConfig(priority);

    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor} flex items-center gap-1`}>
            <span>{icon}</span>
            {text}
        </span>
    );
};

export default PriorityIndicator; 