/*
		By Osvaldas Valutis, www.osvaldas.info
		Available for use under the MIT License
	*/

	
	;( function ( document, window, index )
	{
		'use strict';

		var elSelector	= '.nav-bar',
			element		= document.querySelector( elSelector );

		/*    Load tijd voor de NavBar	

			window.addEventListener('load', function () {
				setTimeout (function () {
					element.style.top = '0px';
				}, 2000)
			}
			)
		*/

		if( !element ) return true;

		var elHeight		= 0,
			elTop			= 0,
			dHeight			= 0,
			wHeight			= 0,
			wScrollCurrent	= 0,
			wScrollBefore	= 0,
			wScrollDiff		= 0;

		window.addEventListener( 'scroll', function()
		{
			elHeight		= element.offsetHeight;
			dHeight			= document.body.offsetHeight;
			wHeight			= window.innerHeight;
			wScrollCurrent	= window.pageYOffset;
			wScrollDiff		= wScrollBefore - wScrollCurrent;
			elTop			= parseInt( window.getComputedStyle( element ).getPropertyValue( 'top' ) ) + wScrollDiff;
			/*if( wScrollCurrent <= 60 ) // scrolled to the very top; element sticks to the top
				element.style.top = '0px';

			else*/ if( wScrollDiff > 0 ) // scrolled up; element slides in
				element.style.top = ( elTop > 0 ? 0 : elTop ) + 'px';

			else if( wScrollDiff < 0 ) // scrolled down
			{
				if( wScrollCurrent + wHeight >= dHeight - elHeight )  // scrolled to the very bottom; element slides in
					element.style.top = ( ( elTop = wScrollCurrent + wHeight - dHeight ) < 0 ? elTop : 0 ) + 'px';

				else // scrolled down; element slides out
					element.style.top = ( Math.abs( elTop ) > elHeight ? -elHeight : elTop ) + 'px';
			}

			wScrollBefore = wScrollCurrent;
		});

	}( document, window, 0 ));



	
// Portfolio Items Dialog

const portfolioItems = Array.from(document.querySelectorAll('.portfolio .portfcontainer'));
const portfolioDialogs = Array.from(document.querySelectorAll('.portfolio .dialog'));
const portfolioDialogContents = Array.from(document.querySelectorAll('.portfolio .dialog .dialog-content'));
const closeButtons = Array.from(document.querySelectorAll('.portfolio .close'));
const dialogImg = Array.from(document.querySelectorAll('.dialogimg'));

const dialogActiveClass = 'active';

function closeDialog(dialog) {
  dialog.classList.remove(dialogActiveClass);
}

function openDialog(dialog) {
  dialog.classList.add(dialogActiveClass);
}

portfolioItems.forEach(function(el) {
  el.addEventListener('click', function() {
    const dialog = portfolioDialogs.find(function(d) {
      return d.id === el.id;
    });
    if(dialog) {
      openDialog(dialog);
    }
  });
});

closeButtons.forEach(function(el) {
  el.addEventListener('click', function() {
	portfolioDialogs.forEach(closeDialog);
  });
});

dialogImg.forEach(function(el) {
	el.addEventListener('click', function() {
	  portfolioDialogs.forEach(closeDialog);
	});
  });

portfolioDialogs.forEach(function(el) {
  el.addEventListener('click', function() {
    closeDialog(el);
  });
});


portfolioDialogContents.forEach(function(el) {
  el.addEventListener('click', function(e) {
    e.stopPropagation();
    e.stopImmediatePropagation();
  });
});
