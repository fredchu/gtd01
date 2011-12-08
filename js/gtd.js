/*
//<Funtion 宣告區>

function save(id,edit_before) {  //儲存
		$(id+' button.save').click(function(){
			if(!$.isEmptyObject($(id+' input').val())){ var input_value = $(id+' input').val(); $(id).empty().prepend(input_value);
			} else {
				$(id).empty().prepend(edit_before);
			}
		});
		
		$(id + " button.cancel").click(function(){
			$(id).empty().prepend(edit_before);
		});
}

function edit(id) { //幫各個button bind event
	$(id + " span.list-item-content").dblclick( function(){ //p雙擊編輯
		var edit_before = $(id + " span.list-item-content").text()
		$(id + " .edit").css("display","none");
		$(id + " span.list-item-content").empty();
		$(id).css('background','yellow');
		$(id + " span.list-item-content").prepend("<input type='text'   /><button class='save'>儲存</button><button class='cancel'>取消</button>");
		$(id + " span.list-item-content input").focus();
		save(id+" span.list-item-content",edit_before);
		$(id + " span.list-item-content button.save").click(function(){
			$(id+" button.edit").css("display","initial")
		});
		$(id + " span.list-item-content button.cancel").click(function(){
			$(id+" button.edit").css("display","initial")
		});
	});
	
	$(id + " button.edit").click( function(){ //edit click編輯
var edit_before = $(id + " span.list-item-content").text()
		$(id + " .edit").css("display","none");
		$(id + " span.list-item-content").empty();
		$(id).css('background','yellow');
		$(id + " span.list-item-content").prepend("<input type='text'   /><button class='save'>儲存</button><button class='cancel'>取消</button>");
		$(id + " span.list-item-content input").focus();
		save(id+" span.list-item-content",edit_before);
		$(id + " span.list-item-content button.cancel").click(function(){
			$(id + " span.list-item-content").empty().prepend(edit_before);
		})
		$(id + " span.list-item-content button.save").click(function(){
			$(id+" button.edit").css("display","initial")
		});
		$(id + " span.list-item-content button.cancel").click(function(){
			$(id+" button.edit").css("display","initial")
		});
	});
	$(id + " button.done").click(function(){
		$(id).remove();
	})
}

function hover(id) {  //hover的時候改div的CSS
	$(id).hover(
		function(){$(id).css('background','red')},
		function(){$(id).css('background','white');}
	)
}

function newone(){  //新增
		var list_item_count = $("#list div").length + 1;
		
		if ( list_item_count < 10 ) 
		var list_item_count = '0' + list_item_count;

		$('div#list').append("<div id='list-item-"+ list_item_count +"'><span id='list-item-content-01' class='list-item-content'>test GTD item</span><button class='edit'>編輯</button><button class='done'>完成</button></div>")
		edit("#list-item-"+list_item_count);
		hover("#list-item-"+list_item_count);
}

function done(){
	var list_item_count = $("#list div").length;
	
}

//</Funtion 宣告區>

$(function(){
	$('button.toggle').click(function(){  //toggle button click
			$('#list').toggle('fast');
	})
});

$(function(){
	$("button.newone").click(function(){
		newone()
	})
})

$(function(){  //幫各個div list-item 綁 edit() 跟 hover()
	for (i = 1; i <= $('#list div').length; i++){ 
		if ( i < 10 ) 
		var ii = '#list-item-0'+i;
		else 
		var ii = '#list-item-'+i;
		edit(ii);
		hover(ii);	
	}	
})
*/

function countChecked() {
  var n = $('input:checked').length;
  $('footer div').text(n + (n <= 1 ? ' is' : ' are') + ' checked!');
}

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
}

$(function(){
	
	countChecked(); //for fun	
	$(':checkbox').click(countChecked); //for fun
	
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
		$('#list').append($('#list div').first().clone(true).css('display',''));			
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

