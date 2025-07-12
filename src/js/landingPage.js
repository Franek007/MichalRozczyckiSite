let opinionsCards
let opinionsProgressDots
let opinionsBtnRight
let opinionsBtnLeft
let opinionsBtns
let opinionsSlider

const main2 = () => {
	prepareDOMElements()
	prepareDOMEvents()
}

const prepareDOMElements = () => {
	opinionsCards = document.querySelectorAll('.opinions__card')
	opinionsProgressDots = document.querySelectorAll('.opinions__progress-dot')
	opinionsBtnLeft = document.querySelector('.opinions__btn--left')
	opinionsBtnRight = document.querySelector('.opinions__btn--right')
	opinionsBtns = document.querySelectorAll('.opinions__btn')
	opinionsSlider = document.querySelector('.opinions__slider')
}

const prepareDOMEvents = () => {
	opinionsBtns.forEach(btn => {
		if (btn.classList.contains('opinions__btn--left')) {
			btn.addEventListener('click', handleOpinionLeftSlider)
		} else {
			btn.addEventListener('click', handleOpinionRightSlider)
		}
	})
	handleOpinionsDot()
}

const handleOpinionLeftSlider = () => {
	handleActiveCard('left', -1)
}

const handleOpinionRightSlider = () => {
	handleActiveCard('right', 1)
}

const handleOpinionsDot = () => {
	opinionsProgressDots.forEach(dot => {
		dot.addEventListener('click', () => {
			const targetNumber = parseInt(dot.dataset.cardNumber)
			const activeCard = document.querySelector('.opinions__card--active')
			const currentNumber = parseInt(activeCard.dataset.cardNumber)
			const diff = targetNumber - currentNumber

			if (diff !== 0) {
				handleActiveCard(diff > 0 ? 'right' : 'left', Math.abs(diff))
			}
		})
	})
}

const handleActiveCard = (direction, value) => {
	let activeCard = Array.from(opinionsCards).find(card => card.classList.contains('opinions__card--active'))

	const activeCardDataset = activeCard.dataset.cardNumber
	activeCard.classList.remove('opinions__card--active')

	let newCardNumber = parseInt(activeCardDataset) + value

	if (newCardNumber > 3) newCardNumber = 1
	if (newCardNumber < 1) newCardNumber = 3

	// if (direction == 'right') {
	// 	activeCard.style.transform = 'translateX(-300px)'
	// } else {
	// 	activeCard.style.transform = 'translateX(300px)'
	// }

	const offset = (newCardNumber - 1) * 320 // lub dynamicznie: opinionsCards[0].offsetWidth
	opinionsSlider.style.transform = `translateX(-${offset}px)`

	const newActiveCard = Array.from(opinionsCards).find(card => parseInt(card.dataset.cardNumber) === newCardNumber)
	newActiveCard.classList.add('opinions__card--active')

	const activeDot = Array.from(opinionsProgressDots).find(
		dot => parseInt(dot.dataset.cardNumber) === parseInt(activeCardDataset)
	)
	activeDot.classList.remove('opinions__progress-dot--active')

	const newActiveDot = Array.from(opinionsProgressDots).find(dot => parseInt(dot.dataset.cardNumber) === newCardNumber)
	newActiveDot.classList.add('opinions__progress-dot--active')
}

document.addEventListener('DOMContentLoaded', main2)
