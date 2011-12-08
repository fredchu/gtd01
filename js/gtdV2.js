
function edit(e) {
		var edit_before = $(e.target).text();
		var $e = $(e.target);

		$e.empty().append('<input type="text">')
		.nextAll('.edit').addClass('hide')
		.nextAll('.done').removeClass('hide')
		.nextAll('.cancel').removeClass('hide');
		
		$e.children('input:text').val(edit_before).select();

		$e.nextAll('.cancel').click(function(){ //取消
			$e.empty().append(edit_before);
			$e.nextAll('.edit').removeClass('hide')
			.nextAll('.done').addClass('hide')
			.nextAll('.cancel').addClass('hide');
		})

		$e.children('input:text').keydown(function(event){
			if (event.keyCode == '13') {
				$e.nextAll('.done').click();
			}
		})
}

$(function(){
	
	$('input[type=checkbox]').change(function(e){ //打勾後面刪除線
	  if ($(e.target).prop('checked')) {
			$(e.target).next('span').wrap('<del></del>');
			$(e.target).addClass('checked');
    } else {
	    $(e.target).next('del').children('span').unwrap();
			$(e.target).removeClass('checked');
    }
	})
	
	$('.newone').click(function(){ //新增
 		//$('#list').append($('#list div').first().clone(true).removeClass('hide'));			
 		$('#list').append($('#list div').first().clone(true));
		$('#list div').last().slideDown().children('.list-item-content').dblclick();
	})

	$('.clearCompleted').click(function(){ //清除已完成
		var $boxchecked = $('#list div input:checkbox').filter('.checked').parent()
		$boxchecked.slideUp(300, function(){
			$boxchecked.remove()})
	})
	
	$('.list-item-content').dblclick(function(e){edit(e)}) //編輯
	$('.edit').click(function(e){
		$(e.target).prev('.list-item-content').dblclick();
	})



		$('.done').click(function(e){	//儲存
			var $e = $(e.target);
			var $eSpan = $e.prevAll('span')
			var edit_before = $eSpan.text()
			if(!$.isEmptyObject($eSpan.children('input').val())) {
				var input_value = $eSpan.children('input').val();
				$eSpan.empty().append(input_value);
				$e.prevAll('.edit').removeClass('hide')
				.nextAll('.done').addClass('hide')
				.nextAll('.cancel').addClass('hide');
			} else {
				$e.nextAll('.cancel').click();
			};
		});


})

