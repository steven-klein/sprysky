/**
 * Gallery functionality
 */

import $ from 'jquery'

const   bs = {},
        gallery = $('#gallery'),
		imgBox = $('#gallery-full');

bs.closeGal = function(){
	gallery.removeClass('active');
	$('#gallery-full img.show').removeClass('show');
	imgBox.removeClass(function(index, css){
			return (css.match (/\bcol-\S+/g) || []).join(' ');
	});
}

bs.setPos = function(img){
	var pos = img.data('col');
	if(!imgBox.hasClass('col-' + pos)){
		imgBox.removeClass(function(index, css){
			return (css.match (/\bcol-\S+/g) || []).join(' ');
		}).addClass('col-' + pos);
	}
}

bs.getImage = function(e){
	e.preventDefault();
	$('#gallery-full .show').removeClass('show');
	bs.setPos($(this));

	if(!gallery.hasClass('active')){
		gallery.addClass('active');
	}

	var url = $(this).attr('href');
	var id = $(this).data('id');

	//did we already get this image
	if($('#gallery-full #img-' + id).length == 0){
		var img = "<img id='img-"+ id +"' src='" + url + "'/>";
		imgBox.append(img);
		$(img).bind('load', function(){
			bs.showImage('#img-' + id);
		});
	}else{
		bs.showImage('#img-' + id);
	}
}

bs.showImage = function(img){
	$(img).addClass('show');
}

bs.galleryInit = function() {
    $('#gallery').on('click', 'a', bs.getImage)
    $('.close-img').on('click', bs.closeGal)
}

$(document).ready(bs.galleryInit)
