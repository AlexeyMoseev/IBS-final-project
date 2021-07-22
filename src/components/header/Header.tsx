import s from './index.module.scss';
import image from '../../assets/img/logo2.png';
import { Link } from 'react-router-dom';
import { useActions } from '../../hooks/useAction';

const Header = () => {
	const { data__nulifyItem } = useActions();
	const handleOnClick = () => {
		data__nulifyItem();
	};
	return (
		<header className={s.header}>
			<Link to={`/`}>
				<img onClick={handleOnClick} className={s.logo} src={image} alt='логотип' />
			</Link>
			<h2 className={s.heading}>
				Сервис анализа рынка труда на основе портала hh.ru с визуализацией данных
			</h2>
		</header>
	);
};

export { Header };
