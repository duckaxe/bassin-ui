import './Divider.scss';
import { useState, useEffect } from 'react';

interface DividerProps {
    username: string;
    onToggle: () => void;
    isExpanded: boolean;
}

export default function Divider({ username, onToggle, isExpanded }: DividerProps) {
    const LS_KEY = `userVisible_${username.slice(0, 21)}`;

    const [isUserVisible, setIsUserVisible] = useState<boolean>(() => {
        const stored = localStorage.getItem(LS_KEY);
        return stored !== null ? JSON.parse(stored) : true;
    });

    useEffect(() => {
        localStorage.setItem(LS_KEY, JSON.stringify(isUserVisible));
    }, [LS_KEY, isUserVisible]);

    const toggleUserVisibility = () => {
        setIsUserVisible(prev => !prev);
    };

    return (
        <div className='divider'>
            <div>
                <span>User</span>
                <strong className={isUserVisible ? '' : 'hidden'}>
                    {username}
                </strong>
            </div>
            <div className='controls'>
                <button onClick={toggleUserVisibility} title='Toggle user visibility'>
                    <i className={`eye ${isUserVisible ? '' : 'hidden'}`}></i>
                </button>
                <button onClick={onToggle} title='Toggle table visibility'>
                    <i className={`arrow ${isExpanded ? 'down' : 'up'}`}></i>
                </button>
            </div>
        </div>
    );
}
