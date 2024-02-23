import React, {useEffect, useState} from 'react';

const Ultimatum = () => {
    const [today, setToday] = useState(new Date());
    const [limitDate, setLimitDate] = useState(new Date('2024-6-17'));
    const daysOfYear = 366; /*2024*/
    const daysArray = new Array(daysOfYear).fill(1);

    const dayOfYear = date =>
        Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 86_400_000);

    return <div className="
        w-[100vw]
        h-[100vh]
        text-[0.9rem]
        lg:text-md relative
        fira-mono-medium"
    style={{zIndex: 9}} >

        <div className="w-full flex flex-wrap">
            {
                daysArray.map((day, index) => {
                   return <div key={index} className={`
                    w-12 h-12
                    border border-gray-400
                    rounded-full
                    flex justify-center items-center
                    text-white
                    ${(index +1) <= dayOfYear(today) ? 'bg-yellow-600' :
                       (index + 1) < dayOfYear(limitDate) ? 'bg-green-600 ': 
                           'bg-green-900'
                    }
                    ${(index + 1) === dayOfYear(today) ? 'twinkle' : ''}
                   `}

                   >
                       {index + 1}
                   </div>
                })
            }
        </div>

    </div>
}

export default Ultimatum;