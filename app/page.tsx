'use client'

import Image from 'next/image'
import {useEffect, useState} from "react";

type Hours = {
    hours: string,
    available: number
}

type Availabilities = {
    start_date: string,
    end_date: string,
    quantity: number
}

export default function Home() {
    const [position, setPosition] = useState(0)
    const [availableHours, setAvailableHours] = useState<Hours[]>([])
    const availabilities: Availabilities[] = [
        {
            "start_date": "2023-12-12T00:00:00-05:00",
            "end_date": "2023-12-12T10:00:00-05:00",
            "quantity": 1,
        },
        {
            "start_date": "2023-12-12T10:00:00-05:00",
            "end_date": "2023-12-12T16:00:00-05:00",
            "quantity": 0,
        },
        {
            "start_date": "2023-12-12T16:00:00-05:00",
            "end_date": "2023-12-13T00:00:00-05:00",
            "quantity": 1,
        }
    ]
    const hours = [
        '00:00',
        '01:00',
        '02:00',
        '03:00',
        '04:00',
        '05:00',
        '06:00',
        '07:00',
        '08:00',
        '09:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
        '18:00',
        '19:00',
        '20:00',
        '21:00',
        '22:00',
        '23:00',
    ]

    const initAvailableHours = (availabilities: Availabilities[]) => {
        let availableHours = [];

        for (const hour of hours) {
            const availability = availabilities.find(item => {
                const startDate = new Date(item.start_date).getHours();
                let endDate = new Date(item.end_date).getHours();

                if (startDate > endDate) {
                    endDate = 24;
                }

                return parseInt(hour.split(":")[0]) >= startDate && parseInt(hour.split(":")[0]) < endDate;
            });

            const available = availability ? availability.quantity : 0;

            availableHours.push({hours: hour, available});
        }
        return availableHours;
    };

    const currentHour = (new Date().getHours() * 60 + new Date().getMinutes()) / 1440

    const frameStyle = {
        width: 64 * 12 + 'px',
    }

    const handleRightClick = () => {
        setPosition(1);
    }

    const handleLeftClick = () => {
        setPosition(0)
    }

    useEffect(() => {
        const hours = initAvailableHours(availabilities);
        setAvailableHours(hours);
    }, [])

    return (
        <main className="flex justify-center items-center h-screen">
            <div className={"flex"}>
                <button className={"border border-gray-600 rounded-l h-12 self-end"} onClick={handleLeftClick}>
                    <Image src="/arrow.svg" alt={"fleche gauche"} width={24} height={24}/>
                </button>
                <ul style={frameStyle}
                    className={"flex justify-between items-center h-12 border-t border-gray-600 border-b px-1" +
                        " relative overflow-x-clip"}>
                    <div style={{transform: `translateX(-${64 * position * 12}px)`}}
                         className={"flex gap-2 transition ease-in-out duration-200"}>
                        {availableHours.map((availableHour) => (
                            <li key={availableHour.hours} className={"flex flex-col relative w-14"}>
                            <span
                                className={"absolute top-0 left-0 w-full text-center transform -translate-y-full"}>{availableHour.hours}</span>
                                <div className={"flex justify-between items-center gap-1 w-14"}>
                                    <div style={{backgroundColor: availableHour.available ? 'lightgray' : 'red'}}
                                         className={"h-10 w-1/2 rounded"}></div>
                                    <div style={{backgroundColor: availableHour.available ? 'lightgray' : 'red'}}
                                         className={"h-10 w-1/2 rounded"}></div>
                                </div>
                            </li>
                        ))}
                    </div>
                    <Image style={{transform: `translateX(${currentHour}%)`}}
                           className={"absolute bottom-0 left-0 transform translate-y-1"}
                           src="/triangle.svg"
                           alt={"triangle"} width={12} height={12}/>
                </ul>
                <button className={"py-2 border border-gray-600 rounded-r h-12 self-end"} onClick={handleRightClick}>
                    <Image className={"rotate-180"} src="/arrow.svg" alt={"fleche droite"} width={24} height={24}/>
                </button>
            </div>
        </main>
    )
}
