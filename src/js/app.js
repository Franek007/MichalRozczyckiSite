import './common.js'
const page = document.body.dataset.page

if (page === 'landingPage') {
	import('./landingPage.js')
} else if (page === 'contact') {
	import('./contact.js')
}
