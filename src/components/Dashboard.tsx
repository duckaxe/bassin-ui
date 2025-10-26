import './Dashboard.scss';
import React, { useState, useLayoutEffect, useEffect } from 'react';
import Tiles from './Tiles';
import Divider from './Divider';
import Message from './Message';
import Table from './Table';
import Chart from './Chart';
import { Pool } from '../interfaces/pool';
import { User } from '../interfaces/users';

interface DashboardProps {
	pool: Pool;
	users: User[];
	chart: number[];
}

const LS_KEY = 'userTablesVisible';

const Dashboard: React.FC<DashboardProps> = ({ pool, users, chart }) => {
	const hasUsers = users.length > 0;
	const hasChartData = chart.length > 0;

	const [visibleTables, setVisibleTables] = useState<Record<string, boolean>>({});

	useLayoutEffect(() => {
		const stored = window.localStorage.getItem(LS_KEY);
		const initialState: Record<string, boolean> = {};

		if (stored) {
			const storedObj = JSON.parse(stored) as Record<string, boolean>;
			users.forEach(user => {
				const shortName = user.username.slice(0, 21);
				initialState[shortName] = storedObj[shortName] !== undefined ? storedObj[shortName] : true;
			});
		} else {
			users.forEach(user => {
				const shortName = user.username.slice(0, 21);
				initialState[shortName] = true;
			});
		}

		setVisibleTables(initialState);
	}, [users]);

	useEffect(() => {
		window.localStorage.setItem(LS_KEY, JSON.stringify(visibleTables));
	}, [visibleTables]);

	const toggleTable = (username: string) => {
		const shortName = username.slice(0, 21);
		setVisibleTables(prev => ({
			...prev,
			[shortName]: !prev[shortName],
		}));
	};

	return (
		<>
			{hasUsers ? (
				<div className='dashboard'>
					<Tiles pool={pool} />

					{hasChartData && <Chart chart={chart} />}

					{users.map(user => {
						const shortName = user.username.slice(0, 21);

						return (
							<section className='user' key={shortName}>
								<Divider
									username={user.username}
									onToggle={() => toggleTable(user.username)}
									isExpanded={visibleTables[shortName]}
								/>
								{visibleTables[shortName] && <Table user={user} />}
							</section>
						);
					})}
				</div>
			) : (
				<Message msg='Awaiting Shares from Miner ...' />
			)}
		</>
	);
};

export default React.memo(Dashboard);
