import { useState } from 'react'

const DropDown = ({ default_arg, args }) => {
	const [clicked, setClicked] = useState(false)
	const [clickedHidden, setClickedHidden] = useState(false)

	const [selectedElement, setSelectedElement] = useState('')
	const handleClickedElement = element => {
		setClicked(!clicked)
		setSelectedElement(element)
	}
	const handleClickedHidden = () => {
		setClickedHidden(!clickedHidden)
	}
	return (
		<div>
			<button onClick={() => handleClickedHidden()}>
				{!clicked ? default_arg : selectedElement}
			</button>
			{handleClickedHidden &&
				args.map(element => {
					return (
						<ul>
							<li
								onClick={() => {
									handleClickedElement(element)
								}}
							>
								{element}
							</li>
						</ul>
					)
				})}
		</div>
	)
}

export default DropDown
