import { useDispatch, useSelector } from 'react-redux'
import { themeReducer } from '../../../redux/reducers/ThemeSlice'
import style from './Switcher.module.scss'

export const SwitchButton = () => {
	//    const [checked, setChecked] = useState(false)

	// const handleChange = () => {
	//   setChecked(!checked)
	// }

	const { theme } = useSelector(state => state.theme)

	const dispatch = useDispatch()
	const handleChange = () => {
		dispatch(themeReducer(!theme))
	}

	return (
		<>
			<label htmlFor='switch' className={style.switchWrapper}>
				<input
					type='checkbox'
					id='switch'
					className={style.round}
					checked={!theme}
					onChange={handleChange}
				/>
			</label>
		</>
	)
}
