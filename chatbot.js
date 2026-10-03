(() => {
	const launcher = document.createElement("button");
	launcher.className = "chat-launcher";
	launcher.type = "button";
	launcher.setAttribute("aria-expanded", "false");
	launcher.setAttribute("aria-controls", "site-chat");
	launcher.setAttribute("aria-label", "Open Echoes assistant");
	launcher.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H5l1.2-3.3A7.5 7.5 0 1 1 20 11.5Z"/><path d="M8.5 11.5h.01M12.5 11.5h.01M16.5 11.5h.01"/></svg><span>Chat with us</span>';

	const panel = document.createElement("section");
	panel.className = "chat-panel";
	panel.id = "site-chat";
	panel.setAttribute("aria-label", "Echoes assistant");
	panel.hidden = true;
	panel.innerHTML = `
		<div class="chat-header">
			<div><strong>Echoes assistant</strong><span>Quick answers about our services</span></div>
			<button class="chat-close" type="button" aria-label="Close chat">&times;</button>
		</div>
		<div class="chat-messages" role="log" aria-live="polite" aria-relevant="additions">
			<div class="chat-message chat-message--bot">Hi! I can help you find information about laboratory solutions, quality programs, training, and support. What would you like to know?</div>
		</div>
		<div class="chat-prompts" aria-label="Suggested questions">
			<button type="button">Equipment</button>
			<button type="button">EQA programs</button>
			<button type="button">Training</button>
		</div>
		<form class="chat-form">
			<label class="visually-hidden" for="chat-input">Type your question</label>
			<input id="chat-input" name="message" type="text" placeholder="Type your question..." autocomplete="off" required>
			<button type="submit" aria-label="Send message"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m21 3-7.2 18-3.5-7.3L3 10.2 21 3Z"/><path d="m10.3 13.7 4.4-4.4"/></svg></button>
		</form>
		<a class="chat-contact" href="contact.html">Need more help? Contact our team</a>
	`;

	document.body.append(launcher, panel);

	const messages = panel.querySelector(".chat-messages");
	const form = panel.querySelector(".chat-form");
	const input = panel.querySelector("#chat-input");

	function addMessage(text, sender) {
		const message = document.createElement("div");
		message.className = `chat-message chat-message--${sender}`;
		message.textContent = text;
		messages.append(message);
		messages.scrollTop = messages.scrollHeight;
	}

	function getReply(question) {
		const text = question.toLowerCase();

		if (/\b(eqa|external quality|quality assessment|quality assurance|iso)\b/.test(text)) {
			return "Echoes supports external quality assessment programs, including hematology, chemistry, microbiology, immunology, and blood bank. Visit the Quality Assurance page or contact our team about enrollment.";
		}
		if (/\b(training|train|course|workshop)\b/.test(text)) {
			return "We offer executive corporate training and laboratory-focused support. Tell us what your team needs on the contact page and we can follow up with options.";
		}
		if (/\b(consult|advis|troubleshoot|method|validation|verification)\b/.test(text)) {
			return "Our technical consulting and laboratory medicine advisory services can help with diagnostic processes, method verification, validation, and troubleshooting. Contact us to discuss your needs.";
		}
		if (/\b(rca|root cause|resource)\b/.test(text)) {
			return "We provide Root Cause Analysis (RCA) resources. Visit Solutions & Services for details, or contact our team for help finding the right resource.";
		}
		if (/\b(service|support|repair|spare|engineer|maintenance)\b/.test(text)) {
			return "Our team supports laboratories with technical service, genuine spare parts, and responsive assistance. Share your equipment and support needs through the contact page.";
		}
		if (/\b(equipment|analyzer|instrument|device|hematology|chemistry|immunology|microbiology|point.of.care|reagent|consumable)\b/.test(text)) {
			return "We help laboratories find analyzers, diagnostic systems, reagents, and consumables, including hematology, chemistry, immunology, microbiology, and point-of-care solutions. Contact our team for a tailored recommendation or quote.";
		}
		if (/\b(price|pricing|cost|quote|quotation|buy|purchase)\b/.test(text)) {
			return "For pricing or a quote, tell us which products or services your laboratory needs using our contact form. Our team can follow up with a tailored recommendation.";
		}
		if (/\b(contact|email|phone|reach|talk|human|person|team)\b/.test(text)) {
			return "You can reach the Echoes team by email at info@echoes.example or by phone at +254 700 000 000. You can also send details through the contact form.";
		}

		return "I can help with equipment, EQA programs, training, consulting, or technical support. Try one of those topics, or contact our team for a tailored answer.";
	}

	function setOpen(open) {
		panel.hidden = !open;
		launcher.setAttribute("aria-expanded", String(open));
		if (open) input.focus();
		else launcher.focus();
	}

	launcher.addEventListener("click", () => setOpen(panel.hidden));
	panel.querySelector(".chat-close").addEventListener("click", () => setOpen(false));
	panel.querySelector(".chat-prompts").addEventListener("click", event => {
		const button = event.target.closest("button");
		if (!button) return;
		addMessage(button.textContent, "user");
		addMessage(getReply(button.textContent), "bot");
	});
	form.addEventListener("submit", event => {
		event.preventDefault();
		const question = input.value.trim();
		if (!question) return;
		addMessage(question, "user");
		input.value = "";
		addMessage(getReply(question), "bot");
		input.focus();
	});
	document.addEventListener("keydown", event => {
		if (event.key === "Escape" && !panel.hidden) setOpen(false);
	});
})();
