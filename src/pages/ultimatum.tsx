import React, {useEffect, useState} from 'react';

const Ultimatum = () => {
    const [today] = useState(new Date());
    const [startEFDate] = useState(new Date('2024-6-16'));
    const [endDateEF] = useState(new Date('2024-11-15'));

    const daysOfYear = 366; /*2024*/
    const daysArray = new Array(daysOfYear).fill(1);

    const dayOfYear = date =>
        Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 86_400_000);

    const todayDayOfYear = dayOfYear(today);
    const startEFDateDayOfYear = dayOfYear(startEFDate);
    const endDateEFDayOfYear = dayOfYear(endDateEF);

    const vacation = 10;
    const secondVacation = 5;
    const livingInNz = 15;

    return <div className="
        w-[100vw]
        h-[100vh]
        text-[0.9rem]
        lg:text-md relative
        fira-mono-medium"
    style={{zIndex: 9}} >
        <div className="w-full flex p-4 justify-between">
            <div className="p-2 mr-4 flex flex-col">
                <div className="text-lg font-bold text-white">Hoy es:</div>
                <div className="text-xs font-bold text-white">{today.toLocaleDateString()}</div>
            </div>
            <div className="p-2 mr-4 flex flex-col">
                <div className="text-lg font-bold text-white">Dias restantes</div>
                <div className="text-xs font-bold text-white">{startEFDateDayOfYear - todayDayOfYear}</div>
            </div>
            <div className="p-2 mr-4 flex flex-col">
                <div className="text-lg font-bold text-white">Dias en NZ</div>
                <div className="text-xs font-bold text-white">{endDateEFDayOfYear + livingInNz - startEFDateDayOfYear}</div>
            </div>

        </div>
        <div className="w-full flex flex-wrap">
            {
                daysArray.map((day, index) => {
                    let realIndex = index + 1;
                    return <div key={index} className={`
                    w-12 h-12
                    border border-gray-400
                    rounded-full
                    flex justify-center items-center
                    text-white
                    
                    Dias_pasados
                    ${realIndex <= todayDayOfYear ? 'bg-yellow-600' : ''}
                    Hoy
                    ${realIndex === todayDayOfYear ? 'twinkle' : ''}
                    Dias_antes_de_iniciar_EF
                    ${realIndex < startEFDateDayOfYear ? 'bg-green-600' : '' }
                    Dias_de_vacaciones_antes_de_iniciar_EF
                    ${realIndex > (startEFDateDayOfYear - vacation) && realIndex < startEFDateDayOfYear ? 'bg-rose-500' : ''}
                    Fecha_de_inicio_EF_(17_Jun_24)
                    ${realIndex === startEFDateDayOfYear ? 'twinkle' : ''}
                    Estancia_En_NZ
                    ${realIndex >= startEFDateDayOfYear && realIndex <= endDateEFDayOfYear ? 'bg-blue-600' : ''}
                    Tiempo_en_NZ_despues_de_EF
                    ${realIndex > endDateEFDayOfYear && realIndex <= (endDateEFDayOfYear + livingInNz) ? 'bg-blue-900' : ''}
                    Timpo_vacaciones_2
                    ${realIndex > (endDateEFDayOfYear + livingInNz) && 
                        realIndex <= (endDateEFDayOfYear + livingInNz + secondVacation) ? 'bg-rose-900' : ''}
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