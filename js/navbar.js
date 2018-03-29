function showAbout() {
	$('button#current-section').removeAttr('id');
	$('button.about').attr('id', 'current-section');
	$('div .content .about').show(700);
	$('div .content .education').hide(700);
	$('div .content .skills').hide(700);
	$('div .content .experience').hide(700);
}

function showEducation() {
	$('button#current-section').removeAttr('id');
	$('button.education').attr('id', 'current-section');
	$('div .content .about').hide(700);
	$('div .content .education').show(700);
	$('div .content .skills').hide(700);
	$('div .content .experience').hide(700);
}

function showSkills() {
	$('button#current-section').removeAttr('id');
	$('button.skills').attr('id', 'current-section');
	$('div .content .about').hide(700);
	$('div .content .education').hide(700);
	$('div .content .skills').show(700);
	$('div .content .experience').hide(700);
}

function showExperience() {
	$('button#current-section').removeAttr('id');
	$('button.experience').attr('id', 'current-section');
	$('div .content .about').hide(700);
	$('div .content .education').hide(700);
	$('div .content .skills').hide(700);
	$('div .content .experience').show(700);
}

function removeCurrentSection() {
	$('button#current-section').removeAttr('id');
}