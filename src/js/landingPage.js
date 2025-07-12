let opinionsCards
let opinionsProgressDots
let opinionsBtnRight
let opinionsBtnLeft
let opinionsBtns
let opinionsSlider

// realization
let realizationCards
let realizationBtnRight
let realizationBtnLeft
let realizationBtns
let realizationSlider
let cardWidth = 300 + 20 // 300px szerokości + np. 20px marginesu/gap między kartami
let currentIndex = 0 // początek

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

	realizationCards = document.querySelectorAll('.realization__card')
	realizationBtnRight = document.querySelector('.realization__btn--right')
	realizationBtnLeft = document.querySelector('.realization__btn--left')
	realizationBtns = document.querySelectorAll('.realization__btn')
	realizationSlider = document.querySelector('.realization__slider')
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

	realizationBtns.forEach(btn => {
		if (btn.classList.contains('realization__btn--left')) {
			btn.addEventListener('click', handleRealizationBtnLeftSlider)
		} else {
			btn.addEventListener('click', handleRealizationBtnRightSlider)
		}
	})

	handleRealizationSlider()
	gsap.from('.header', { duratrion: 1, y: '-100%', ease: 'bounce' })
	
}

const handleOpinionLeftSlider = () => {
	handleOpinionsSlider('left', -1)
}

const handleOpinionRightSlider = () => {
	handleOpinionsSlider('right', 1)
}

const handleOpinionsDot = () => {
	opinionsProgressDots.forEach(dot => {
		dot.addEventListener('click', () => {
			const targetNumber = parseInt(dot.dataset.cardNumber)
			const activeCard = document.querySelector('.opinions__card--active')
			const currentNumber = parseInt(activeCard.dataset.cardNumber)
			const diff = targetNumber - currentNumber

			if (diff !== 0) {
				handleOpinionsSlider(diff > 0 ? 'right' : 'left', Math.abs(diff))
			}
		})
	})
}

const handleOpinionsSlider = (direction, value) => {
	let activeCard = Array.from(opinionsCards).find(card => card.classList.contains('opinions__card--active'))

	const activeCardDataset = activeCard.dataset.cardNumber
	activeCard.classList.remove('opinions__card--active')

	let newCardNumber = parseInt(activeCardDataset) + value

	if (newCardNumber > 3) newCardNumber = 1
	if (newCardNumber < 1) newCardNumber = 3

	const offset = (newCardNumber - 1) * 320
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

const handleRealizationBtnLeftSlider = () => {
	const maxIndex = realizationCards.length - 1
	if (currentIndex <= maxIndex) {
		currentIndex--
		handleRealizationSlider()
	}
}

const handleRealizationBtnRightSlider = () => {
	const maxIndex = realizationCards.length - 1
	if (currentIndex < maxIndex) {
		currentIndex++
		handleRealizationSlider()
	}
}

const handleRealizationSlider = () => {
	console.log(realizationCards.length)
	const maxIndex = realizationCards.length - 1

	if (currentIndex === maxIndex) {
		let cardWidth = 280
		realizationSlider.style.transform = `translateX(-${currentIndex * cardWidth}px)`
		realizationBtnRight.classList.add('realization__btn--active')
	} else {
		realizationSlider.style.transform = `translateX(-${currentIndex * cardWidth}px)`

		if (currentIndex === 0) {
			realizationBtnLeft.classList.add('realization__btn--active')
		} else {
			realizationBtnLeft.classList.remove('realization__btn--active')
		}

		if (currentIndex >= maxIndex) {
			realizationBtnRight.classList.add('realization__btn--active')
		} else {
			realizationBtnRight.classList.remove('realization__btn--active')
		}
	}
}

document.addEventListener('DOMContentLoaded', main2)
