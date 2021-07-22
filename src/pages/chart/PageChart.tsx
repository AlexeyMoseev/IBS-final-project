import s from './index.module.scss';
import 'antd/dist/antd.css';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useAction';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Chart } from '../../components/chart/Chart';
import { Button, Spin } from 'antd';

const PageChart = () => {
	const [state, setState] = useState({
		chartSwitch: false,
		buttonTitle: 'соискателям',
		title: 'Вакансии',
		count: 0,
	});
	const { data } = useTypedSelector((state) => state);
	const {
		data__getItemByUserFiltersVacancies,
		data__getItemByUserFiltersResumes,
	} = useActions();

	const history = useHistory();

	useEffect(() => {
		if (data.userInput) {
			data__getItemByUserFiltersVacancies(data.userInput);
		}
		// eslint-disable-next-line
	}, []);

	//Если по ключевым словам ничего не найдется
	if (data.itemVacancies === 'noItems') {
		alert('По введенным параметрам ничего не найдено. Попробуйте еще раз');
		history.push('/');
	}

	//Переход между вакансиями и соискателями
	const handleButton = () => {
		if (data.userId && state.count === 0) {
			data__getItemByUserFiltersResumes(data.userId);
		}
		if (state.title === 'Вакансии') {
			setState((prevState) => ({
				...prevState,
				chartSwitch: !state.chartSwitch,
				buttonTitle: 'вакансиям',
				title: 'Соискатели',
				count: 1,
			}));
		} else {
			if (state.title === 'Соискатели') {
				setState((prevState) => ({
					...prevState,
					chartSwitch: !state.chartSwitch,
					buttonTitle: 'соискателям',
					title: 'Вакансии',
					count: 1,
				}));
			}
		}
	};

	const handleClickButtonExit = () => {
		history.push('/');
	};

	return (
		<div className={s.wrap}>
			{!!data.itemVacancies ? (
				data.itemVacancies !== 'noItems' ? (
					<div>
						<div className={s.wrapHeadingAndButton}>
							<h2 className={s.heading}>{state.title} на рынке</h2>
							<Button className={s.button} onClick={handleButton} type='primary'>
								Получить информацию по {state.buttonTitle}
							</Button>
						</div>
						{!state.chartSwitch ? (
							/* @ts-ignore: Unreachable code error */
							<Chart name={'vacancies'} item={data.itemVacancies} />
						) : !!data.itemResumes ? (
							<div>
								{/* @ts-ignore: Unreachable code error */}
								<Chart name={'resumes'} item={data.itemResumes} />
							</div>
						) : (
							<div className={s.loading}>
								<Spin tip='Загрузка...' />
							</div>
						)}
					</div>
				) : (
					<div>По введенным параметрам ничего не найдено. Попробуйте еще раз</div>
				)
			) : (
				<div className={s.loading}>
					<Spin tip='Загрузка...' />
				</div>
			)}
			<div>
				<Button className={s.buttonExit} onClick={handleClickButtonExit}>
					Выход
				</Button>
			</div>
		</div>
	);
};

export { PageChart };
