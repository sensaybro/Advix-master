import React, { useCallback, useState } from 'react'

import debounce from 'lodash.debounce'
import { useDispatch } from 'react-redux'
import iconSearch from '../../assets/search.svg'
import style from './Search.module.scss'
function Search() {
	// const [inputText, setInputText] = useState('');
	// const dispatch = useDispatch();

	// const { books, counter, isLoading, error, searchValue, index, sortType, categories } = useSelector(
	// 	state => state.book
	// )
	// const getDataInput = (e) => {
	// 	e.preventDefault()
	// 	dispatch(setClearBooks())
	// 	dispatch(setIndex())
	// 	dispatch(setSearchValue(inputDate))
	// 	dispatch(setCounter())
	// 	dispatch(fetchBooks({counter, searchValue, index, sortType, categories }))
	// }
	// const onChangeText = (e) => {
	// 	setInputText(e.target.value)
	// }

	const dispatch = useDispatch()
	const [valueLocal, setValueLocal] = useState('')
	const inputRef = React.useRef()
	const searchEvenet = event => {
		testDebounce(event)
		setValueLocal(event.target.value)
	}
	const testDebounce = useCallback(
		debounce(event => {
			dispatch(setSearchValue(event.target.value))
		}, 250),
		[]
	)

	return (
		<div className={style.search}>
			<img className={style.img_search} src={iconSearch} alt='search' />
			<input
				ref={inputRef}
				value={valueLocal}
				onChange={event => searchEvenet(event)}
				type='text'
				// onChange={(e) => onChangeText(e)}
				placeholder='Поиск'
			/>
		</div>
	)
}

export default Search
