// @ts-nocheck
/* eslint-disable */

gsap.registerPlugin(ScrollTrigger);

// Drodown Variable
var acc = document.getElementsByClassName("title-head");
var i;

// Contact Form Variable
const scriptURL = 'https://script.google.com/macros/s/AKfycbwpm8rKw0RfI2EXI9S-i4O9OTG-jOnKIV0smLoXBRw5QScajDhdpVYS9tA7_e7RR2DRFw/exec'
const form = document.forms['message-form-contact']
const submitBtn = document.querySelector(".submit");
const loadBtn = document.querySelector(".loading");
const alert = document.querySelector(".alert");

// ScrollTo Variable
var linksWithHash = document.querySelectorAll('a[href*=\\#]:not([href=\\#])')
let trigger = document.querySelector(".scroller");

// ScrollTrigger Variable
let hero = trigger.querySelector(".hero-element");
let hello = trigger.querySelector(".hello-text");
let myself = trigger.querySelector(".myself");
let wrapper = trigger.querySelector(".wrapper-text");


// Event, Function and DOM Manipulation.

// Dropdown Event
for (i = 0; i < acc.length; i++) {
	acc[i].addEventListener("click", function () {
		this.classList.toggle("active");
		var panel = this.nextElementSibling;
		if (panel.style.maxHeight) {
			panel.style.maxHeight = null;
			panel.style.marginTop = 0;
		} else {
			panel.style.maxHeight = panel.scrollHeight + "px";
			panel.style.marginTop = "20px";
		}
	});
}


// Contact Form Event
form.addEventListener('submit', e => {
	e.preventDefault();
	// Show The Loading button
	loadBtn.classList.toggle("d-none");
	submitBtn.classList.toggle("d-none");
	fetch(scriptURL, {
			method: 'POST',
			body: new FormData(form)
		})
		.then(response => {
			// Show The Submit button
			loadBtn.classList.toggle("d-none");
			submitBtn.classList.toggle("d-none");
			alert.classList.toggle("d-none");
			form.reset()
			console.log('Success!', response)
		})
		.catch(error => console.error('Error!', error.message))
})


// SrollTrigger Media Query
ScrollTrigger.matchMedia({


	// large
	"(min-width: 960px)": function () {

		// Nav Function
		const showAnim = gsap.from('nav', {
			yPercent: -100,
			paused: true,
			duration: 0.2
		}).progress(1);

		ScrollTrigger.create({
			start: "top+=900px top",
			end: 99999,
			// markers: true,
			onUpdate: (self) => {
				self.direction === -1 ? showAnim.play() : showAnim.reverse()
			}
		});

		// Hero Setting
		gsap.set(".scroller", {
			margin: "0 -5vw"
		});

		// Gsap Hero Timeline
		gsap
			.timeline({
				defaults: {
					duration: 1,
					ease: "none"
				}
			})
			.to(myself, {
				scrollTrigger: {
					trigger: trigger,
					end: "top center",
					scrub: 1
				}
			});
		gsap
			.timeline({
				defaults: {
					duration: 30,
					ease: "none"
				},
				scrollTrigger: {
					trigger: trigger,
					scrub: 1,
					// id: "tahu",
					// markers: true,
					end: "+=1000",
					pin: trigger,
					pinSpacing: true,
				}
			})
			.fromTo(
				hero, {
					width: "100%"
				}, {
					delay: 4,
					width: "0%"
				},
				0
			)
			.fromTo(
				hello, {
					scale: 1,
					// x: "45%"
				}, {
					x: "-100%",
					scale: 1
				},
				0
			)
			.fromTo(
				myself, {
					x: "100%",
					width: "50%",
					// stagger: 1
				}, {
					width: "100%",
					x: 0
				}
			)
			.from(
				wrapper, {
					y: 0,
				},
				">="
			)
			.to({}, {
				duration: 1
			})
			.from(".introduce-text", {
				y: 100,
				opacity: 0,
				ease: "back",
				duration: 90
			}, "<50");


		// Mockup Slideleft
		var allLines = gsap.utils.toArray(".phone-screen");
		allLinesNotLast = allLines.slice(1, 3);
		var next = 1,
			tt = 5000,
			st = 0.3;

		gsap.set(".phone-screen", {
			zIndex: (i, target, targets) => targets.length - i
		});


		console.log(allLines)
		console.log(allLinesNotLast)


		gsap.timeline({
				defaults: {
					duration: 50,
					ease: "none",
					stagger: next,
				},
				scrollTrigger: {
					trigger: ".introducing",
					start: 'top+=50px top',
					end: "+=" + tt,
					markers: true,
					scrub: 0.5,
					pin: true,
					// pinSpacing: true,
				}
			})
			.to(
				allLines, {
					delay: 1,
					x: '-=600',
					duration: 1,
					speed: tt,
					stagger: next
				}
			)
			.to(
				allLinesNotLast, {
					delay: 1,
					x: '-=600',
					duration: 1,
				}
			)
	},


	// all
	"all": function () {

		linksWithHash.forEach((link) => {
			link.addEventListener('click', autoscrollToHere);
		});

		function autoscrollToHere() {

			// https://stackoverflow.com/questions/25987451/javascript-smooth-scroll-explained
			if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {

				event.preventDefault();

				// @ts-ignore
				gsap.to(window, {
					duration: 4.0,
					delay: 0,
					scrollTo: {
						y: this.hash,
						offsetY: 0
					},
				});

			}
		}

		gsap.from('#my-portfolio', {
			y: 50,
			scrollTrigger: '#my-portfolio'
		});
	}

});





/* eslint-disable */