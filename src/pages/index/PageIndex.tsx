import s from './index.module.scss';
import 'antd/dist/antd.css';
import { Input, Select, Slider, Radio, Button } from 'antd';
import { useState } from 'react';
import { useActions } from '../../hooks/useAction';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const PageIndex = () => {
	const [state, setState] = useState({
		activeField: null,
		userInput: {
			keywords: '',
			searchType: null,
			location: null,
			step: 0,
			minValue: 0,
			maxValue: 30000,
		},
		keywordsDirty: false,
		keywordsError: 'Поле не может быть пустым',
		formValid: false,
	});

	useEffect(() => {
		data__nulifyItem()
		data__getAllRegionsAndCityes();
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (state.keywordsError) {
			setState((prevState) => ({
				...prevState,
				formValid: false,
			}));
		} else {
			setState((prevState) => ({
				...prevState,
				formValid: true,
			}));
		}
	}, [state.keywordsError]);

	const { data } = useTypedSelector((state) => state);

	const { data__UserInput, data__getAllRegionsAndCityes, data__nulifyItem } = useActions();

	const { Option } = Select; //опции селекта

	const { TextArea } = Input;

	const marksStep = {
		0: '0',
		300000: '300000',
	}; // марки для слайдера шага

	const marksRange = {
		0: '0',
		500000: '500000',
	}; //марки для верхней и нижней границы разбиения графика

	//Дефолтный список городов, если при скачке основного списка произойдет ошибка
	const defaultRegions = [
		'Все регионы',
		'Белгородская область',
		'Брянская область',
		'Владимирская область',
		'Воронежская область',
		'Ивановская область',
		'Костромская область',
		'Московская область',
		'Ярославскяа область',
		'Пермская область',
	];
	const defaultCitys = [
		'Москва',
		'Санкт-Петербург',
		'Новосибирск',
		'Екатеринбург',
		'Казань',
		'Нижний Новгород',
		'Челябинск',
		'Самара',
		'Омск',
		'Ростов-на-Дону',
		'Пермь',
	];

	//Дефолтные города или список с сервера
	let regions;
	let citys;
	if (data.regions === null) {
		regions = defaultRegions;
	} else {
		regions = data.regions;
	}
	if (data.citys === null) {
		citys = defaultCitys;
	} else {
		citys = data.citys;
	}

	function onSearch(val: string) {
	}

	//Ввод ключевых слов
	const handleOnChangeKeywords = (e: any) => {
		const keywords = e.target.value;
		setState((prevState) => ({
			...prevState,
			userInput: {
				...prevState.userInput,
				keywords: keywords,
			},
		}));
		if (keywords.length < 3 || keywords.length > 80) {
			setState((prevState) => ({
				...prevState,
				keywordsError: 'Вводить можно не меньше 2 и не больше 80 символов',
			}));
			if (!keywords) {
				setState((prevState) => ({
					...prevState,
					keywordsError: 'Поле не может быть пустым',
				}));
			}
		} else {
			setState((prevState) => ({
				...prevState,
				keywordsError: '',
			}));
		}
	};

	//Смена типа локации
	const handleOnChangeTypeLocation = (e: any) => {
		setState((prevState) => ({
			...prevState,
			activeField: e.target.value,
			userInput: {
				...prevState.userInput,
				searchType: e.target.value,
			},
		}));
	};

	//Смена локации
	const handleOnChangeLocation = (value: any) => {
		if (value !== 'Все регионы') {
			setState((prevState) => ({
				...prevState,
				userInput: {
					...prevState.userInput,
					location: value,
				},
			}));
		} else {
			setState((prevState) => ({
				...prevState,
				userInput: {
					...prevState.userInput,
					location: null,
				},
			}));
		}
	};

	//Изменение шага
	const handleOnAfterChangeStep = (value: any) => {
		setState((prevState) => ({
			...prevState,
			userInput: {
				...prevState.userInput,
				step: value,
			},
		}));
	};

	//Изменение верхней и нижней границ
	const handleOnAfterChangeRange = (value: any) => {
		setState((prevState) => ({
			...prevState,
			userInput: {
				...prevState.userInput,
				minValue: value[0],
				maxValue: value[1],
			},
		}));
	};

	//Отправка данных формы
	function handleClickButton() {
		let masKeywords = state.userInput.keywords.split(' ');
		const userInput = {
			keywords: masKeywords,
			searchType: state.userInput.searchType,
			location: state.userInput.location,
			step: state.userInput.step === 0 ? 1 : state.userInput.step,
			minValue: state.userInput.minValue,
			maxValue: state.userInput.maxValue,
		};
		data__UserInput(userInput);
	}

	const handleBlur = (e: any) => {
		switch (e.target.name) {
			case 'keywords':
				setState((prevState) => ({
					...prevState,
					keywordsDirty: true,
				}));
				break;
			default:
				break;
		}
	};

	return (
		<div className={s.main}>
			<form className={s.form} noValidate autoComplete='off'>
				<h2 className={s.heading}>Внесите необходимые данные</h2>
				<p className={s.label}>
					Напишите ключевые слова через пробел, по которым будет произведен анализ:
				</p>
				{state.keywordsDirty && state.keywordsError && (
					<div style={{ color: 'red' }}>{state.keywordsError}</div>
				)}
				<TextArea
					value={state.userInput.keywords}
					name='keywords'
					onBlur={(e) => handleBlur(e)}
					autoSize={{ minRows: 2, maxRows: 6 }}
					onChange={handleOnChangeKeywords}
					className={s.keywords}
					placeholder='Ключевые слова'
				/>
				<p className={s.label}>Выберите как будет осуществляться поиск:</p>
				<Radio.Group onChange={handleOnChangeTypeLocation}>
					<Radio value='region'>По регионам</Radio>
					<Radio value='city'>По городам</Radio>
				</Radio.Group>
				{state.activeField ? (
					state.activeField === 'region' ? (
						<>
							<p className={s.label}>Выберите регион:</p>
							<Select
								showSearch
								style={{ width: 200 }}
								placeholder='Регион'
								optionFilterProp='children'
								onChange={handleOnChangeLocation}
								onSearch={onSearch}
								filterOption={(input, option: any) =>
									option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
								}
							>
								{regions.map((elem, index) => (
									<Option key={index} value={elem}>
										{elem}
									</Option>
								))}
							</Select>
						</>
					) : (
						<>
							<p className={s.label}>Выберите город:</p>
							<Select
								showSearch
								style={{ width: 200 }}
								placeholder='Город'
								optionFilterProp='children'
								onChange={handleOnChangeLocation}
								onSearch={onSearch}
								filterOption={(input, option: any) =>
									option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
								}
							>
								{citys.map((elem, index) => (
									<Option key={index} value={elem}>
										{elem}
									</Option>
								))}
							</Select>
						</>
					)
				) : (
					<div className={s.message}>
						<p>
							Если вы не укажите тип поиска или не выберите город/регион,<br></br> то
							поиск будет произведен по всем регионам
						</p>
					</div>
				)}
				<p className={s.label}>
					Выберите шаг разбиения зарплаты на зарплатные вилки (в рублях):
				</p>
				<Slider
					marks={marksStep}
					min={0}
					max={300000}
					step={10000}
					defaultValue={0}
					onAfterChange={handleOnAfterChangeStep}
				/>
				<p className={s.rangeLabel}>
					Выберите нижнюю и вернюю границы, в пределах которых <br /> будет
					производиться разбиение зарплаты на вилки (в рублях):
				</p>
				<Slider
					marks={marksRange}
					range
					min={0}
					max={500000}
					step={10000}
					defaultValue={[0, 30000]}
					onAfterChange={handleOnAfterChangeRange}
				/>
				<Link to={`/chart`}>
					<Button
						disabled={!state.formValid}
						onClick={handleClickButton}
						className={s.button}
						type='primary'
					>
						Отправить данные для анализа
					</Button>
				</Link>
			</form>
		</div>
	);
};

export { PageIndex };
