import { useRef, useState } from 'react'
import style from './DropDown.module.scss'
const DropDown = ({ default_arg, args }) => {
	const [clicked, setClicked] = useState(false)
	const [clickedHidden, setClickedHidden] = useState(false)

	// Create a ref for each li element
	const refsLi = useRef([])

	const [selectedElement, setSelectedElement] = useState('')
	const [counter, setCounter] = useState(0)
	const handleClickedElement = (element, index) => {
		setClicked(!clicked)

		setSelectedElement(element)
		if (selectedElement === element && counter === 1) {
			refsLi.current.forEach(el => (el.style.backgroundColor = 'transparent'))
			refsLi.current.forEach(el => (el.style.color = '#99a8b2'))
			setCounter(0)
			return
		}
		setCounter(1)
		refsLi.current.forEach(el => (el.style.backgroundColor = 'transparent'))
		refsLi.current.forEach(el => (el.style.color = '#99a8b2'))

		refsLi.current[index].style.backgroundColor = '#00a5e9'

		refsLi.current[index].style.color = '#fff'
	}
	const handleClickedHidden = () => {
		setClickedHidden(!clickedHidden)
	}
	return (
		<div className={style.wrapperDropDown}>
			<button onClick={() => handleClickedHidden()}>
				{!clicked ? default_arg : selectedElement}
			</button>
			{clickedHidden && (
				<ul>
					{args.map((element, index) => {
						return (
							<li
								ref={el => (refsLi.current[index] = el)}
								onClick={() => {
									handleClickedElement(element, index)
								}}
							>
								{element}
							</li>
						)
					})}
				</ul>
			)}
		</div>
	)
}

export default DropDown
