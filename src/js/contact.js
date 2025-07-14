let contactSendBtn
let emailInput
let nameInput
let msgInput
let checkboxInput
let checkBoxParent

const main = () => {
	prepareDOMElements()
	prepareDOMEvents()
}

const prepareDOMElements = () => {
	contactSendBtn = document.querySelector('.contact__btn')
	emailInput = document.getElementById('email')
	nameInput = document.getElementById('name')
	msgInput = document.getElementById('msg')
	checkboxInput = document.querySelector('.contact__checkbox')
	checkBoxParent = document.querySelector('.contact__checkbox-box')
}

const prepareDOMEvents = () => {
	contactSendBtn.addEventListener('click', handleContactForm)
}

const handleContactForm = () => {
	const msgStatus = document.querySelector('.contact__msg-status')

	if (document.location.search === '?mail_status=sent') {
		msgStatus.classList.add('success')
		msgStatus.textContent = 'Wiadomość wysłana!'

		setTimeout(() => {
			msgStatus.classList.remove('success')
		}, 3000)
	}

	if (document.location.search === '?mail_status=error') {
		msgStatus.classList.add('error')
		msgStatus.textContent = 'Wystąpił błąd.'

		setTimeout(() => {
			msgStatus.classList.remove('error')
		}, 3000)
	}

	const showError = (input, msg) => {
		const formBox = input.parentElement
		const errorText = formBox.querySelector('.contact__form-error')
		errorText.textContent = msg
		formBox.classList.add('contact__form-error-input')
	}

	const clearError = input => {
		const formBox = input.parentElement
		const errorText = formBox.querySelector('.contact__form-error')

		errorText.textContent = ''
		formBox.classList.remove('contact__form-error-input')
	}

	const checkMail = () => {
		const re = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/

		if (re.test(email.value)) {
			clearError(email)
		} else {
			showError(email, 'E-mail jest niepoprawny')
		}
	}

	const checkCheckbox = () => {
		if (checkboxInput.checked == false) {
			checkBoxParent.style.border = '1px solid var(--color-accent)'
			checkBoxParent.style.padding = '0.5em 1em'
		} else {
			checkBoxParent.style.border = 'none'
			checkBoxParent.style.padding = '0'
		}
	}

	const checkForm = input => {
		input.forEach(el => {
			if (el.value === '') {
				showError(el, el.placeholder)
			} else {
				clearError(el)
			}
		})
	}

	checkCheckbox()
	checkForm([emailInput, msgInput, nameInput])
	checkMail()
}

document.addEventListener('DOMContentLoaded', main)
