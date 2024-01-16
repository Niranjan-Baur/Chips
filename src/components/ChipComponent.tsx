import React, { useState, useRef, ChangeEvent, KeyboardEvent } from 'react'
import './ChipComponent.css'

interface ChipComponentProps {
	availableItems: {
		id: number
		name: string
		email: string
		profileImage: string
	}[]
}

const users: {
	id: number
	name: string
	email: string
	profileImage: string
}[] = [
	{
		id: 1,
		name: 'Leanne Graham',
		email: 'Sincere@april.biz',
		profileImage: 'https://i.pravatar.cc/150?img=1'
	},
	{
		id: 2,
		name: 'Ervin Howell',
		email: 'Shanna@melissa.tv',
		profileImage: 'https://i.pravatar.cc/150?img=2'
	},
	{
		id: 3,
		name: 'Clementine Bauch',
		email: 'Nathan@yesenia.net',
		profileImage: 'https://i.pravatar.cc/150?img=3'
	},
	{
		id: 4,
		name: 'Patricia Lebsack',
		email: 'Julianne.OConner@kory.org',
		profileImage: 'https://i.pravatar.cc/150?img=4'
	},
	{
		id: 5,
		name: 'Chelsey Dietrich',
		email: 'Lucio_Hettinger@annie.ca',
		profileImage: 'https://i.pravatar.cc/150?img=5'
	},
	{
		id: 6,
		name: 'Mrs. Dennis Schulist',
		email: 'Karley_Dach@jasper.info',
		profileImage: 'https://i.pravatar.cc/150?img=6'
	},
	{
		id: 7,
		name: 'Kurtis Weissnat',
		email: 'Telly.Hoeger@billy.biz',
		profileImage: 'https://i.pravatar.cc/150?img=7'
	},
	{
		id: 8,
		name: 'Nicholas Runolfsdottir V',
		email: 'Sherwood@rosamond.me',
		profileImage: 'https://i.pravatar.cc/150?img=8'
	},
	{
		id: 9,
		name: 'Glenna Reichert',
		email: 'Chaim_McDermott@dana.io',
		profileImage: 'https://i.pravatar.cc/150?img=9'
	},
	{
		id: 10,
		name: 'Clementina DuBuque',
		email: 'Rey.Padberg@karina.biz',
		profileImage: 'https://i.pravatar.cc/150?img=10'
	},
	{
		id: 11,
		name: 'John Doe',
		email: 'john.doe@example.com',
		profileImage: 'https://i.pravatar.cc/150?img=11'
	},
	{
		id: 12,
		name: 'Jane Smith',
		email: 'jane.smith@example.com',
		profileImage: 'https://i.pravatar.cc/150?img=12'
	},
	{
		id: 13,
		name: 'Bob Johnson',
		email: 'bob.johnson@example.com',
		profileImage: 'https://i.pravatar.cc/150?img=13'
	},
	{
		id: 14,
		name: 'Alice Williams',
		email: 'alice.williams@example.com',
		profileImage: 'https://i.pravatar.cc/150?img=14'
	},
	{
		id: 15,
		name: 'Charlie Brown',
		email: 'charlie.brown@example.com',
		profileImage: 'https://i.pravatar.cc/150?img=15'
	}
]

const ChipComponent: React.FC<ChipComponentProps> = ({
	availableItems = users
}) => {
	const [inputValue, setInputValue] = useState('')
	const [inpClicked, setInpClicked] = useState(false)
	const [chips, setChips] = useState<
		{ id: number; name: string; email: string; profileImage: string }[]
	>([])
	const inputRef = useRef<HTMLInputElement>(null)

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value)
	}

	const handleInputClick = () => {
		setInpClicked(true)
		console.log('clicked')
	}

	const handleItemClick = (item: {
		id: number
		name: string
		email: string
		profileImage: string
	}) => {
		setChips([...chips, item])
		setInputValue('')
		setInpClicked(false)
	}

	const handleChipRemove = (chip: {
		id: number
		name: string
		email: string
		profileImage: string
	}) => {
		setChips(chips.filter((currentChip) => currentChip !== chip))
	}

	const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (
			event.key === 'Backspace' &&
			inputValue === '' &&
			chips.length > 0
		) {
			// Highlight the last chip when backspace is pressed on an empty input
			const lastChip = chips[chips.length - 1]
			inputRef.current?.blur() // Unfocus the input to show the highlight effect
			setTimeout(() => {
				inputRef.current?.focus()
			}, 0)
			setChips(chips.filter((chip) => chip !== lastChip))
		}
	}

	return (
		<div className="chip-container">
			<h1>Pick Users</h1>
			<div className="chips-wrapper">
				{chips.map((chip, index) => (
					<div key={index} className="chip">
						<img
							width={30}
							style={{ borderRadius: '50%' ,padding:0}}
							src={chip.profileImage}
							alt="Profile Image"
						/>

						<p style={{ color: 'black' }}>{chip.name}</p>
						<span
							className="remove-icon"
							onClick={() => handleChipRemove(chip)}
						>
							X
						</span>
					</div>
				))}
				<input
					ref={inputRef}
					type="text"
					value={inputValue}
					onChange={handleInputChange}
					onKeyDown={handleInputKeyDown}
					className="input-field"
					placeholder="Add new user"
					style={{
						border: 'none',
						outline: 'none',
						backgroundColor: 'white',
						marginLeft: '10px'
					}}
					onClick={handleInputClick}
				/>
			</div>

			{inpClicked && (
				<div className="scrollable-items">
					{availableItems
						.filter(
							(item) =>
								item.name
									.toLowerCase()
									.includes(inputValue.toLowerCase()) &&
								!chips.some((chip) => chip.id === item.id)
						)
						.map((item, index) => (
							<div
								key={index}
								className="available-item"
								onClick={() => handleItemClick(item)}
							>
								<img
									width={30}
									style={{ borderRadius: '50%' }}
									src={item.profileImage}
									alt="Profile Image"
								/>
								<p style={{fontWeight:'bold'}}>{item.name}</p>
								<p>{item.email}</p>
							</div>
						))}
				</div>
			)}
		</div>
	)
}

export default ChipComponent
