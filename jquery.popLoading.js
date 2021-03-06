(function($) {
  $.popLoading = function(options) {
    var option = $.extend({
      screenMode : 'full'
    }, options);

    $('body').popLoading(option);
  };
  
  $.hideLoading = function() {
    $('body').hideLoading();
  };
  
  $.fn.hideLoading = function() {
    this.find('#modalDiv, #loadingDiv').remove();
  };
  
  $.fn.popLoading = function(options) {
    var option = $.extend({
      message : 'now loading...',
      width : '50%',
      height : '50%',
      isModal : true,
      existBackground : true,
      textPosition : 'right',
      imgUrl : 'http://go.wdu.ac.kr/images/common/ajaxLoading.gif',
      imgWidth : '80',
      imgHeight : '80',
      screenMode : 'element'
    }, options);
    
    var eee = $('#modalDiv, #loadingDiv');
    eee.remove();  
    
    var left, top, winWidth, winHeight;
    
    switch(option.screenMode) {
      case 'full':
        left  = '0px';
        top   = '0px';
        winWidth = $(window).outerWidth();
        winHeight = $(window).outerHeight();
        break;
      case 'element':
        left  = this.offset().left + 'px';
        top   = this.offset().top + 'px';
        winWidth = this.outerWidth() + 'px';
        winHeight = this.outerHeight() + 'px';
        break;
    }

    if(option.isModal) {
      var $backDiv = $('<div />', {
        id : 'modalDiv',
        css : {
          backgroundColor:"#000", 		// 배경색 회색
          filter:"alpha(opacity=30)",
          opacity:".3",
          position:"fixed",
          top:top,
          left:left,
          width:winWidth,
          height:winHeight,
          zIndex:"100"									    	
        }
      });

      $backDiv.appendTo(this);
    }

    var $div = $('<div />', {
      id: 'loadingDiv',
      css : {
        "position":"fixed",
        /*"top":'50%',
        "left":'50%',*/
        /*"width":option.width,
        "height":option.height,*/
        "z-index":"200",					// 최상위 레이어
        "-webkit-border-radius":"7px",
        "-webkit-background-clip":"padding-box",
        "-moz-border-radius":"7px",
        "-moz-background-clip":"padding",
        "border-radius":"7px",
        "background-clip":"padding-box"
      }
    }); 
    
    // 배경색 지정
    if(option.existBackground) {
      $div.css("background-color","#fff");  
    } 
    
    var $loadingContent = $('<div />',{
      css : {
        display : 'table',
        position : 'relative',
        top : '50%', left : '50%'
        /*border : 'solid 1px red'*/
      }
    });
    
    
    var $loadingImg = $('<img />',{
      src : option.imgUrl,
      css : {
        /*display : 'table-row',*/
        /*top : '50%', left : '50%',
        marginLeft : option.imgWidth/-2 ,
        marginTop : option.imgHeight/-2 ,*/
        margin : '0 auto',
        width : option.imgWidth,
        height : option.imgHeight
        /*border : 'solid 1px red'*/
      }
    });
    
    var $loadingTxt = $('<span />',{
      text : option.message,
      css : {
        /*display : 'table-row',*/
        fontSize : '16pt',
        fontWeight : 'bold',
        color : '#000',
        verticalAlign : 'middle',
        boxSizing : 'border-box'
        /*lineHeight : '120px',*/
        /*border : 'solid 1px red'*/
      }
    });
    
    switch(option.textPosition) {
      case 'up':
        $loadingImg.css("display","table-row");
        $loadingTxt.css({
         "display":"table-row",
         "line-height":"30px"
        });
        $loadingTxt.appendTo($loadingContent);    
        $loadingImg.appendTo($loadingContent);
        break;
      case 'down':
        $loadingImg.css("display","table-row");
        $loadingTxt.css({
         "display":"table-row",
         "line-height":"30px"
        });
        $loadingImg.appendTo($loadingContent);
        $loadingTxt.appendTo($loadingContent);    
        break;
      case 'left':
        $loadingImg.css("display","table-cell");
        $loadingTxt.css({
         "display":"table-cell",
         "line-height":option.imgHeight+'px',
         "padding-right" : "10px"
        });
        $loadingTxt.appendTo($loadingContent);    
        $loadingImg.appendTo($loadingContent);
        break;
      case 'right':
        $loadingImg.css("display","table-cell");
        $loadingTxt.css({
         "display":"table-cell",
         "line-height":option.imgHeight+'px',
         "padding-left" : "10px"
        });
        $loadingImg.appendTo($loadingContent);
        $loadingTxt.appendTo($loadingContent);    
        break;
    }
    
    $loadingContent.appendTo($div);
    
    $div.appendTo(this);				
    
    
    $loadingContent.css({
      'margin-left' : ($loadingContent.width() / -2) + 'px',
      'margin-top' : ($loadingContent.height() / -2) + 'px'
    });
    
    $div.css({
      'top' : (this.offset().top + parseInt(winHeight,10) / 2) + "px",
      'left' : (this.offset().left + parseInt(winWidth,10) / 2) + "px",
      'width' : $loadingContent.width() + 120 + 'px',
      'height' : $loadingContent.height() + 60 + 'px'
    }).css({
      'margin-left' : ($div.width() / -2) + 'px',
      'margin-top' : ($div.height() / -2) + 'px'
    });
    
  };
})(jQuery);

$(function() {
  $('div.box').popLoading();
  window.setTimeout(function() {
    $.hideLoading();
  }, 5000);
  //$.popLoading();
});

function startLoading() {
  
  var isModal = $('input#modal').is(':checked') ? true : false;
  var existBg = $('input#bg').is(':checked') ? true : false;
  var screenMode = $('#screenMode').val();
  var textPosition = $('#textPosition').val();
  var message = $('#loadingMsg').val();
  var imgUrl = $('#loadingImg').val();
  
  console.log("message : "+message);
  
  var options = {
    isModal : isModal,
    existBackground : existBg,
    textPosition : textPosition,
    screenMode : screenMode
  };
  
  if(message != '') {
    options = $.extend({message : message}, options);
  }
  if(imgUrl != '') {
    options = $.extend({imgUrl : imgUrl}, options);
  }
  
  var $target;
  switch(screenMode) {
    case 'full':
      $target = $('body');
      break;
    case 'element':
      //$target = $('#test');
      $target = $('div.box');
      break;      
  }
  $target.popLoading(options);
  
  window.setTimeout(function() {
    $target.hideLoading();
  }, 4000);
}
