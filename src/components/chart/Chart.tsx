import s from './index.module.scss';
import 'antd/dist/antd.css';
import { FC } from 'react';
import { IChart } from '../../models/chart';
import { Button } from 'antd';

import {
	BarChart,
	Bar,
	LabelList,
	Label,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts';

import { useCallback } from 'react';
import FileSaver from 'file-saver';
import { useCurrentPng } from 'recharts-to-png';
import { useTypedSelector } from '../../hooks/useTypedSelector';

interface ICharts {
	item: IChart;
	name: string;
}

const Chart: FC<ICharts> = ({ item, name }) => {
	const { data } = useTypedSelector((state) => state);

	//Преобразуем переданные данные в удобный для нас формат, чтобы можно было отобразить на графике
	const convertedData = item.intervals.map((elem: any) => {
		let rObj = {
			name: '',
			count: 0,
		};
		rObj.name = elem.from + '-' + elem.to;
		rObj.count = elem.count;
		return rObj;
	});
	convertedData.push({ name: `Max: ${item.max}`, count: 1 });
	convertedData.unshift({ name: `Min: ${item.min}`, count: 1 });

	//График в png
	const [getPng, { ref: areaRef }] = useCurrentPng();

	const handleDownlaod = useCallback(async () => {
		const png = await getPng();
		if (png) {
			FileSaver.saveAs(png, 'myChart.png');
		}
	}, [getPng]);

	const handleClickButtonCsv = () => {
		let csvItem;
		if (name === 'vacancies') {
			csvItem = data.reportVacancies;
		} else {
			csvItem = data.reportResumes;
		}

		const element = document.createElement('a');

		var universalBOM = '\uFEFF';

		element.setAttribute(
			'href',
			'data:text/plain;charset=utf-8,' + encodeURIComponent(universalBOM + csvItem)
		);
		element.setAttribute('download', 'file.csv');

		element.style.display = 'none';
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	};

	return (
		<div className={s.chart}>
			<div className={s.messageMobile}>
				Показывать график на таком маленьком экране не имеет смысла, но вы можете
				скачать отчет :)
			</div>
			<div className={s.barChart}>
				<ResponsiveContainer width='100%' aspect={4.0 / 1.2}>
					<BarChart
						className={s.barChart}
						data={convertedData}
						margin={{ top: 15, right: 30, left: 20, bottom: 5 }}
						ref={areaRef}
					>
						<CartesianGrid strokeDasharray='3 3' />
						<XAxis dataKey='name'>
							<Label
								className={s.label}
								value='шаг зарплатной вилки (руб)'
								offset={0}
								position='bottom'
							/>
						</XAxis>
						<YAxis>
							<Label
								className={s.label}
								value='количество вакансий'
								angle={-90}
								position='center'
							></Label>
						</YAxis>
						<Tooltip wrapperStyle={{ width: 150, backgroundColor: '#ccc' }} />
						<Legend
							width={100}
							wrapperStyle={{
								top: 40,
								right: 20,
								backgroundColor: '#f5f5f5',
								border: '1px solid #d5d5d5',
								borderRadius: 3,
								lineHeight: '40px',
							}}
						/>
						<Bar isAnimationActive={false} dataKey='count' fill='#8884d8'>
							<LabelList dataKey='count' position='top' />
						</Bar>
					</BarChart>
				</ResponsiveContainer>
			</div>
			<div className={s.wrapButton}>
				<Button onClick={handleDownlaod} className={s.buttonPng} type='primary'>
					Скачать график в формате png
				</Button>
				<Button
					onClick={handleClickButtonCsv}
					className={s.buttonPdf}
					type='primary'
				>
					Скачать отчет в формате csv
				</Button>
				<div className={s.messageReport}>
					<p>Для подготовки отчета может уйти некоторое время до 3 минут </p>
				</div>
			</div>
		</div>
	);
};

export { Chart };
