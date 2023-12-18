'use client'

import Image from 'next/image'
import {useEffect, useState} from "react";

type HalfHour = {
    hour: string,
    available: number
}

type HalfHourSelected = {
    hour: string,
    available: number,
    index: number
}

type Hours = {
    hour: string,
    firstHalfHour: HalfHour,
    secondHalfHour: HalfHour
}

type Availabilities = {
    start_date: string,
    end_date: string,
    quantity: number
}

export default function Home() {
    const [position, setPosition] = useState(0)
    const [availableHours, setAvailableHours] = useState<Hours[]>([])
    const [selectedHours, setSelectedHours] = useState<HalfHour[]>([])

    const intervalMinutes = 60

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
    const hours: Hours[] = [
        {
            hour: '00:00',
            firstHalfHour: {hour: '00:00', available: 0},
            secondHalfHour: {hour: '00:30', available: 0}
        },
        {
            hour: '01:00',
            firstHalfHour: {hour: '01:00', available: 0},
            secondHalfHour: {hour: '01:30', available: 0}
        },
        {
            hour: '02:00',
            firstHalfHour: {hour: '02:00', available: 0},
            secondHalfHour: {hour: '02:30', available: 0}
        },
        {
            hour: '03:00',
            firstHalfHour: {hour: '03:00', available: 0},
            secondHalfHour: {hour: '03:30', available: 0}
        },
        {
            hour: '04:00',
            firstHalfHour: {hour: '04:00', available: 0},
            secondHalfHour: {hour: '04:30', available: 0}
        },
        {
            hour: '05:00',
            firstHalfHour: {hour: '05:00', available: 0},
            secondHalfHour: {hour: '05:30', available: 0}
        },
        {
            hour: '06:00',
            firstHalfHour: {hour: '06:00', available: 0},
            secondHalfHour: {hour: '06:30', available: 0}
        },
        {
            hour: '07:00',
            firstHalfHour: {hour: '07:00', available: 0},
            secondHalfHour: {hour: '07:30', available: 0}
        },
        {
            hour: '08:00',
            firstHalfHour: {hour: '08:00', available: 0},
            secondHalfHour: {hour: '08:30', available: 0}
        },
        {
            hour: '09:00',
            firstHalfHour: {hour: '09:00', available: 0},
            secondHalfHour: {hour: '09:30', available: 0}
        },
        {
            hour: '10:00',
            firstHalfHour: {hour: '10:00', available: 0},
            secondHalfHour: {hour: '10:30,', available: 0}
        },
        {
            hour: '11:00',
            firstHalfHour: {hour: '11:00', available: 0},
            secondHalfHour: {hour: '11:30', available: 0}
        },
        {
            hour: '12:00',
            firstHalfHour: {hour: '12:00', available: 0},
            secondHalfHour: {hour: '12:30', available: 0}
        },
        {
            hour: '13:00',
            firstHalfHour: {hour: '13:00', available: 0},
            secondHalfHour: {hour: '13:30', available: 0}
        },
        {
            hour: '14:00',
            firstHalfHour: {hour: '14:00', available: 0},
            secondHalfHour: {hour: '14:30', available: 0}
        },
        {
            hour: '15:00',
            firstHalfHour: {hour: '15:00', available: 0},
            secondHalfHour: {hour: '15:30', available: 0}
        },
        {
            hour: '16:00',
            firstHalfHour: {hour: '16:00', available: 0},
            secondHalfHour: {hour: '16:30', available: 0}
        },
        {
            hour: '17:00',
            firstHalfHour: {hour: '17:00', available: 0},
            secondHalfHour: {hour: '17:30', available: 0}
        },
        {
            hour: '18:00',
            firstHalfHour: {hour: '18:00', available: 0},
            secondHalfHour: {hour: '18:30', available: 0}
        },
        {
            hour: '19:00',
            firstHalfHour: {hour: '19:00', available: 0},
            secondHalfHour: {hour: '19:30', available: 0}
        },
        {
            hour: '20:00',
            firstHalfHour: {hour: '20:00', available: 0},
            secondHalfHour: {hour: '20:30', available: 0}
        },
        {
            hour: '21:00',
            firstHalfHour: {hour: '21:00', available: 0},
            secondHalfHour: {hour: '21:30}', available: 0}
        },
        {
            hour: '22:00',
            firstHalfHour: {hour: '22:00', available: 0},
            secondHalfHour: {hour: '22:30', available: 0}
        },
        {
            hour: '23:00',
            firstHalfHour: {hour: '23:00', available: 0},
            secondHalfHour: {hour: '23:30', available: 0}
        },
    ]

    const initAvailableHalfHours = (availabilities: Availabilities[]) => {
        const availableHalfHours: Hours[] = [];
        hours.forEach(hour => {
            availabilities.forEach(availability => {
                const startDate = new Date(availability.start_date);
                const endDate = new Date(availability.end_date);

                const firstHalfHour = new Date();
                firstHalfHour.setDate(firstHalfHour.getDate() - 1);
                firstHalfHour.setHours(parseInt(hour.firstHalfHour.hour.split(':')[0]));
                firstHalfHour.setMinutes(parseInt(hour.firstHalfHour.hour.split(':')[1]));


                const secondHalfHour = new Date();
                secondHalfHour.setDate(secondHalfHour.getDate() - 1);
                secondHalfHour.setHours(parseInt(hour.secondHalfHour.hour.split(':')[0]));
                secondHalfHour.setMinutes(parseInt(hour.secondHalfHour.hour.split(':')[1]));

                if (firstHalfHour >= startDate && firstHalfHour < endDate) {
                    hour.firstHalfHour.available = availability.quantity;
                }
                if (secondHalfHour >= startDate && secondHalfHour < endDate) {
                    hour.secondHalfHour.available = availability.quantity;
                }
            })
            const tempHour = {
                hour: hour.hour,
                firstHalfHour: hour.firstHalfHour,
                secondHalfHour: hour.secondHalfHour
            }
            availableHalfHours.push(tempHour as Hours);
        })
        return availableHalfHours;
    };

    const frameStyle = {
        width: 64 * 12 + 'px',
    }

    const handleRightClick = () => {
        setPosition(1);
    }

    const handleLeftClick = () => {
        setPosition(0)
    }

    const getMinutesFromDate = (date: Date) => {
        return date.getHours() * 60 + date.getMinutes();
    }

    const currentHour = (getMinutesFromDate(new Date()) * 1528 / 1440) - 64 * position * 12;

    const handleClick = (half: string, index: number) => {
        switch (half) {
            case 'firstHalf':
                if (availableHours[index].firstHalfHour.available) {
                    let selectedHour = availableHours[index].firstHalfHour;
                    selectedHour = {...selectedHour, index: index} as HalfHourSelected;
                    setSelectedHours([...selectedHours, selectedHour]);
                }
                break;
            case 'secondHalf':
                if (availableHours[index].secondHalfHour.available) {
                    let selectedHour = availableHours[index].secondHalfHour;
                    selectedHour = {...selectedHour, index: index} as HalfHourSelected;
                    setSelectedHours([...selectedHours, selectedHour]);
                }
                break;
        }
    }

    const stringToTime = (time: string) => {
        const [hours, minutes] = time.split(':');
        const date = new Date();
        date.setMinutes(parseInt(minutes));
        return date.setHours(parseInt(hours));
    }

    useEffect(() => {
        const hours: Hours[] = initAvailableHalfHours(availabilities);
        setAvailableHours(hours);
    }, [])

    useEffect(() => {
        console.log(selectedHours);
        if (selectedHours.length === 2) {
            const firstHour = stringToTime(selectedHours[0].hour);
            const secondHour = stringToTime(selectedHours[1].hour);
            let diff = secondHour - firstHour;
            if (firstHour > secondHour) {
                diff = firstHour - secondHour;
            }

            if (firstHour === secondHour) {
                console.log('Erreur: la réservation doit être d\'au moins 1 heure');
                setSelectedHours([]);
                return;
            }

            if (diff > 14400000) {
                console.log('Erreur: la réservation doit être d\'au maximum 4 heures');
                setSelectedHours([]);
                return;
            }

            let resultDate = new Date(diff);
            resultDate.setMinutes(resultDate.getMinutes() + 30);

            if (resultDate.getMinutes() % intervalMinutes !== 0) {
                console.log('Erreur: la réservation doit être d\'un interval de ', intervalMinutes, ' minutes');
                setSelectedHours([]);
                return;
            }

            console.log('Réservation de', resultDate.toISOString().substring(11, 16));
            setSelectedHours([]);
        }
    }, [selectedHours])

    return (
        <main className="flex justify-center items-center h-screen">
            <div className={"flex"}>
                <button className={"border border-gray-200 rounded-l h-12 self-end"} onClick={handleLeftClick}>
                    <Image src="/arrow.svg" alt={"fleche gauche"} width={24} height={24}/>
                </button>
                <ul style={frameStyle}
                    className={"flex justify-between items-center h-12 border-t border-gray-200 border-b px-1" +
                        " relative overflow-x-clip"}>
                    <div style={{transform: `translateX(-${64 * position * 12}px)`}}
                         className={"flex gap-2 transition ease-in-out duration-200"}>
                        {availableHours.map((availableHour, index) => (
                            <li key={availableHour.hour} className={"flex flex-col relative w-14"}>
                            <span
                                className={"absolute top-0 left-0 w-full text-center transform -translate-y-full"}>{availableHour.hour}</span>
                                <div className={"flex justify-between items-center gap-1 w-14"}>
                                    <div
                                        onClick={() => handleClick('firstHalf', index)}
                                        className={`h-10 w-1/2 rounded + ${availableHour.firstHalfHour.available ? "halfHourEnabled" : "halfHourDisabled"}`}></div>
                                    <div
                                        onClick={() => handleClick('secondHalf', index)}
                                        className={`h-10 w-1/2 rounded + ${availableHour.secondHalfHour.available ? "halfHourEnabled" : "halfHourDisabled"}`}></div>
                                </div>
                            </li>
                        ))}
                    </div>
                    <Image style={{transform: `translateX(${currentHour}px) translateY(0.25rem)`}}
                           className={"absolute left-0 bottom-0 transform translate-y-2"}
                           src="/triangle.svg"
                           alt={"triangle"} width={12} height={12}/>
                </ul>
                <button className={"py-2 border border-gray-200 rounded-r h-12 self-end"} onClick={handleRightClick}>
                    <Image className={"rotate-180"} src="/arrow.svg" alt={"fleche droite"} width={24} height={24}/>
                </button>
            </div>
        </main>
    )
}
