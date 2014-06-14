Array.prototype.shuffle = function() {
  var i = this.length, j, temp;
  if ( i == 0 ) return this;
  while ( --i ) {
     j = Math.floor( Math.random() * ( i + 1 ) );
     temp = this[i];
     this[i] = this[j];
     this[j] = temp;
  }
  return this;
}

function uploadData(i) {
    $.ajax({
        type: "GET",
        url: "Home/InsertDataViaAjax",
        async: false,
        data: { title: objectProduct[i][1], des: objectProduct[i][2], linkimg: objectProduct[i][3], cost: objectProduct[i][4], link: objectProduct[i][5], type: objectProduct[i][6], style: objectProduct[i][7], material: objectProduct[i][8], weight: objectProduct[i][9], date: objectProduct[i][10], author: objectProduct[i][11], tag: objectProduct[i][12] }
    })
    .done(function (msg) {
        if (i < objectProduct.length-1)
            uploadData(i + 1);
    });
}
function createProductObject(id,title,des,linkimg,cost,link,type,style,material,weight,date,author,tag,parentObject){
	var product = new Array(id,title,des,linkimg,cost,link,type,style,material,weight,date,author,tag);
	parentObject[parentObject.length] = product;
}
function GetURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}
function _createPopup(){
	$('body').append('<div id="containPopup"></div>\
							<div id="popup">\
							</div>');
	$('#containPopup').click(function(){
		$(this).remove();
		$("#popup").remove();
	});
}
function signinForm(){
	$('#contentPage').append('<div id="containLogin"><div class="title">Login</div>\
							<form id="loginForm" name="loginForm" method="POST" action="Account/Login">\
								<p class="message">Fill out the form below to login to Jewelry Site</p>\
								<input class="loginElement" type="text" name="loginName" value="" placeholder="User name" />\
								<input class="loginElement" type="password" name="loginPass" value="" placeholder="Password" />\
								<a class="forgotPass" href="#">Forgot your password ?</a>\
								<a class="crateAccount" href="#">Create a free account</a>\
								<a href="#" class="button2">Ok, Let me in! <i class="icon-chevron-right">></i></a>\
							</form></div>');
}
function registerForm(){
	$('#contentPage').append('<div id="containLogin"><div class="title">Register</div>\
							<form id="loginForm" name="registerForm" method="POST" action="Account/Register">\
								<p class="message">Fill out the form below to register to Jewelry Site</p>\
								<input class="loginElement" type="text" name="loginName" value="" placeholder="User name" />\
								<input class="loginElement" type="password" name="loginPass" value="" placeholder="Password" />\
								<input class="loginElement" type="text" name="loginEmail" value="" placeholder="Email" />\
                                <input class="loginElement" type="text" name="loginBirthday" value="" placeholder="Birthday" />\
                                <input class="loginElement" type="text" name="loginAddress" value="" placeholder="Address" />\
                                <input class="loginElement" type="text" name="loginPhone" value="" placeholder="Phone number" />\
								<a class="alreadyAccount" href="#">Already account? Login here!</a>\
								<a href="#" class="button2">Sign up me NOW! <i class="icon-chevron-right">></i></a>\
							</form></div>');
}
function prepare(){
	createNav("header");
	createMenu("CONTACT",getRealPath()+"/temp/contact.html",'contact');
	createMenu("SIGN IN","#",'signin');
	createMenu("REGISTER","#",'register');
	createMenu("ABOUT",getRealPath()+"/temp/about.html",'about');
	createSearch(getRealPath()+"/Search","GET",getRealPath()+'/img/sbicon.png');
	createLogo(getRealPath()+"/img/jewelry.png",getRealPath());
	createSubMenu();
}
function init(){
	$('#filterMenu').hover(function(){
		$(this).animate({left:'0'});
	},function(){
		$(this).animate({left:'-10%'});
	},5000);
	$('#signin').click(function(){
		_createPopup();
		$('#popup').append('<div class="title">Login</div>\
							<form id="loginForm" name="loginForm" method="POST" action="">\
								<p class="message">Fill out the form below to login to Jewelry Site</p>\
								<input class="loginElement" type="text" name="loginName" value="" placeholder="User name" />\
								<input class="loginElement" type="password" name="loginPass" value="" placeholder="Password" />\
								<a class="forgotPass" href="#">Forgot your password ?</a>\
								<a class="crateAccount" href="#">Create a free account</a>\
								<a href="#" class="button2">Ok, Let me in! <i class="icon-chevron-right">></i></a>\
							</form>');
		$('#popup').css({ "height": "300px", "width": "40%", "left": "30%" });
		$('#popup').fadeIn(1000);
		$('.crateAccount').click(function () {
		    $('#containPopup').remove();
		    $("#popup").remove();
		    $('#register').trigger('click');
		});
	});
	$('#register').click(function(){
		_createPopup();
		$('#popup').append('<div class="title">Register</div>\
							<form id="registerForm" name="registerForm" method="POST" action="' + getRealPath() + '/Account/Register">\
								<p class="message">Fill out the form below to register to Jewelry Site</p>\
								<input class="loginElement" type="text" name="loginName" value="" placeholder="User name" />\
								<input class="loginElement" type="password" name="loginPass" value="" placeholder="Password" />\
								<input class="loginElement" type="text" name="loginEmail" value="" placeholder="Email" />\
                                <input class="loginElement" type="text" name="loginBirthday" value="" placeholder="Birthday" />\
                                <input class="loginElement" type="text" name="loginAddress" value="" placeholder="Address" />\
                                <input class="loginElement" type="text" name="loginPhone" value="" placeholder="Phone number" />\
								<a class="alreadyAccount" href="#">Already account? Login here!</a>\
								<a href="#" onclick="document.registerForm.submit();" class="button2">Sign up me NOW! <i class="icon-chevron-right">></i></a>\
							</form>');
		$('#popup').fadeIn(1000);
		$('.alreadyAccount').click(function () {
		    $('#containPopup').remove();
		    $("#popup").remove();
		    $('#signin').trigger('click');
		});
		$('[name="loginBirthday"]').datepicker();
	});
	$('#search_query_top').click(function(){
		$('#advanceSearchContainer').html("<div id='suggestContain'><div class='containArrow'><div class='arrow-up'></div></div><a style='text-decoration:none;' href='"+getRealPath()+"/Search?action=advanceSearch'><div id='adSearchBox'>Advanced Search</div></a></div>");
		$("#suggestContain").fadeIn(1000);
	});
	$('#search_query_top').blur(function(){
		$("#suggestContain").fadeOut(1000);
	});
}
function createNav(elementID){
	$("#"+elementID).prepend('<div class="nav" >\
								<div class="container" >\
									<div class="row">\
										<nav>\
										</nav>\
									</div>\
								</div>\
							</div>');
}
function createMenu(name,link,id){
	var content = 	'<div class="header_user_info">\
						<a class="item" id="'+id+'" href="'+link+'"> '+name+' </a> \
					</div>'	;
	$('nav').append(content);
}
function createLogo(fname,link){
	var content = '<div class="row">\
						<div id="header_logo">\
							<a title="Jewelry" href="'+link+'">\
								<img alt="Jewelry" src="'+fname+'">\
							</a>\
						</div>\
					</div>';
	$('header').append(content);
}
function createSearch(action,method,link){
	var content = '<form action="'+action+'" method="'+method+'" id="searchbox"> \
		<input type="text" value="" placeholder="Search" name="search_query" id="search_query_top" autocomplete="off"> \
		<button class="btn btn-default button-search" name="submit_search" type="submit"><img src="'+link+'" />\
		</button> \
	</form><div id="advanceSearchContainer"></div>';
	$('nav').append(content);
}
function createSubMenu(){
	var content = '<div id="block_top_menu">\
						<ul class="menu-content">';
		content += decrateMenu('Home',getRealPath(),'active');							
		content += decrateMenu('Bracelets',getRealPath()+'?Category=bracelets','','bracelets');
		content += decrateMenu('Necklaces', getRealPath() + '?Category=necklaces','','necklaces');
		content += decrateMenu('Earring', getRealPath() + '?Category=earrings','','earrings');
		content += decrateMenu('Rings', getRealPath() + '?Category=rings','','rings');
		content += decrateMenu('Gifts', getRealPath() + '?Category=gifts','','gifts');
		content += decrateMenu('Couple', getRealPath() + '?Category=couple','','couple');
		content += decrateMenu('Crowns', getRealPath() + '?Category=crowns','','crowns');
		content +=		'</ul>\
					</div>';	
		$('header').append(content);
		if (GetURLParameter("Category")) {
		    $('.subMenu').each(function () {
		        $(this).removeClass('active');
		    });
		    $('[name="' + GetURLParameter("Category") + '"]').addClass('active');
		}
}
function decrateMenu(name,link,flag,category){
	if(flag == 'active'){
		$('.subMenu').each(function(){
			$(this).removeClass('active');
		});
		return '<li class="subMenu active" name="'+category+'"><a title="'+name+'" href="'+link+'">'+name+'</a></li>';
	}
	return '<li class="subMenu" name="' + category + '"><a title="' + name + '" href="' + link + '">' + name + '</a></li>';
}
function processSlide(){
	$('#homeslider').bxSlider({
		useCSS: false,
		maxSlides: 1,
		slideWidth: $('#productList').width(),
		hideControlOnEnd: true,
		pager: false,
		auto: true,
		autoHover: true,
		controls: true
	}); 
	$(".bx-viewport").css("height","auto")
}
function createSlideElement(link,linkimg,linktitle,title,descrip,cost){
	var content = '<li><a href="'+link+'">\
							<img src="'+linkimg+'" title="'+linktitle+'">\
						</a>\
						<a href="'+link+'">\
							<div class="homeslider-description">\
								<h2>'+title+'</h2>\
								<h3>'+descrip+'</h3>\
								<p>\
									<span class="price">$'+cost+'</span>\
									<span class="button2">add to cart!</span>\
								</p>\
							</div>\
						</a>\
					</li>';
	$("#homeslider").append(content);
}
function createFilterMenu(){
	var content = '<ul class="menu-content">';
		content += decrateFilter('Newest','#','active');							
		content += decrateFilter('Popular','#');
		content += decrateFilter('Best Sellers','#');
		content += decrateFilter('Sale Off','#');
		content += decrateFilter('My Favorite','#');
		content +=		'</ul>';
	$('#filterMenu').append(content);
}
function decrateFilter(name,link,flag){
	if(flag == 'active'){
		$('.subFilter').each(function(){
			$(this).removeClass('active');
		});
		return '<li class="subFilter active"><a title="'+name+'" href="'+link+'">'+name+'</a></li>';
	}
	return '<li class="subFilter"><a title="'+name+'" href="'+link+'">'+name+'</a></li>';
}
function createProductList(){
	var content = '<ul class="htmlcontent-home">';
		content += decrateProductItem('bracelets','img/bracelets.png','200','#');
		content += decrateProductItem('earrings','img/earrings.png','150','#');
		content += decrateProductItem('earrings','img/necklaces.png','150','#');
		content += decrateProductItem('earrings','img/earrings.png','150','#');
		content += decrateProductItem('bracelets','img/bracelets.png','200','#');
		content += decrateProductItem('earrings','img/earrings.png','150','#');
		content += decrateProductItem('earrings','img/aa.jpg','150','#');
		content += '</ul>';
	$('#productList').append(content);
}
function decrateProductItem(name,linkimg,cost,link){
	content = '<li><a href="'+link+'">\
							<img width="360" height="244" src="'+linkimg+'">\
						</a>\
						<a href="'+link+'">\
							<div class="item-html">\
								<h2>'+name+'</h2>\
								<span class="price">$'+cost+'</span>\
								<span class="button2">add to cart!</span>\
							</div>\
						</a>\
					</li>';
	return content;
}
function splitOnPage(target, total) {
    var content = "<div id='splitPageContain'><ul>";
    var currentPage = GetURLParameter("Page");
    if (total < 10) {
        for (var i = 1; i <= total; i++) {
            if(i==1 && currentPage == null)
            content += "<li><a href='" + updateQueryStringParameter(window.location.toString(), "Page", i) + "'><div class='activePage'>" + i + "</div><a></li>";
            else if(i!=currentPage)
                content += "<li><a href='" + updateQueryStringParameter(window.location.toString(), "Page", i) + "'><div>" + i + "</div><a></li>";
            else if (i == currentPage && currentPage != null)
                content += "<li><a href='" + updateQueryStringParameter(window.location.toString(), "Page", i) + "'><div class='activePage'>" + i + "</div><a></li>";
        }
        content += "</ul></div>";
    }
    $(target).append(content);
}
function updateQueryStringParameter(uri, key, value) {
    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = uri.indexOf('?') !== -1 ? "&" : "?";
    if (uri.match(re)) {
        return uri.replace(re, '$1' + key + "=" + value + '$2');
    }
    else {
        return uri + separator + key + "=" + value;
    }
}
function createProductV2(object) {
    var c = GetURLParameter("Category");
    if ( c == null)
        var title = "HOME JEWELRY";
    else title = c.toUpperCase();
	var content = '<div id="productContain">';
	content += '<div id="productMessage">' + title + '</div><div id="__products">';
		for(var i=0; i<object.length;i++){
			content += decrateProductItemV2(object[i][0],object[i][1],object[i][2],object[i][3],object[i][4],object[i][5],object[i][6],object[i][7]);
		}
		/*content += decrateProductItemV2(1,"Color isn't the only way  to express yourself",'Bracelet is an article of jewelry that is worn around the wrist','img/bracelet.png','99','temp/detail.html',2,"border-left:none");
		content += decrateProductItemV2(2,"Silver wedding rings",'NO TARNISH, NEVER GREEN Bridal Matching Bands Ring Sets','img/silver-wedding-ring.png','199','temp/detail.html',1,'border-left:none;border-right:none');
		content += decrateProductItemV2(3,"The Lord Of The Rings",'The best ring from Dark Lord Sauron, Had no limit power, very stronger','img/One_Ring.png','999','temp/detail.html',1,'border-top:none;border-left:none');
		content += decrateProductItemV2(4,"Pageant's not only way to have miss crown",'The Miss Universe crown used from 2002-2007 was designed by Mikimoto','img/crown1.png','499','temp/detail.html',2,'border-left:none;border-top:none;border-right:none');
		content += decrateProductItemV2(5,"The Spirit of the north",'A necklace is an article of jewellery which is worn around the neck.','img/SNC106.png','199','temp/detail.html',3,'border-top:none;border-left:none');
		content += decrateProductItemV2(6,"Canadian Ice Silver Diamond Crossover Earrings",'These sterling silver crossover stud earrings from our Canadian Ice Silver Collection each feature a brilliant round diamond','img/earring.png','99','temp/detail.html',1,'border-left:none;border-top:none');
		content += decrateProductItemV2(7,"Canadian Ice Silver Diamond Cross Stud Earrings",'From our Canadian Ice Silver collection these sterling silver stud earrings are in style of a cross each set with a sparkling brilliant round diamond','img/earring2.png','99','temp/detail.html',1,'border-left:none;border-top:none;border-right:none');
		content += decrateProductItemV2(8,"Stealing sliver crown ring",'From our Canadian Ice Silver collection these sterling silver stud earrings are in style of a cross each set with a sparkling brilliant round diamond','img/sterling-silver-crown-ring-2.png','99','temp/detail.html',1,'border-left:none;border-top:none');
		content += decrateProductItemV2(9,"Stealing sliver crown ring",'From our Canadian Ice Silver collection these sterling silver stud earrings are in style of a cross each set with a sparkling brilliant round diamond','img/h-necklace.png','99','temp/detail.html',3,'border-left:none;border-top:none;float:right;border-right:none');
		content += decrateProductItemV2(10,"Elvish Love Ring Silver One Ring",'From our Canadian Ice Silver collection these sterling silver stud earrings are in style of a cross each set with a sparkling brilliant round diamond','img/ring5.png','99','temp/detail.html',1,'border-left:none;border-top:none');
		content += decrateProductItemV2(11,"Silver Color Spike Bracelet",'From our Canadian Ice Silver collection these sterling silver stud earrings are in style of a cross each set with a sparkling brilliant round diamond','img/Silver-Color-Spike-Bracelet.png','99','temp/detail.html',1,'border-left:none;border-top:none');*/
	content += "</div><div class='clear'></div></div>";
	$('#productList').append(content);
	$('#productList div').hover(function(){
		$(this).children('.controlBox').slideDown("fast");
	},function(){
		$(this).children('.controlBox').slideUp("fast");
	});
	likeAction();
	commentAction();
}
function createAuthorProfile(){
	var content = '<div id="productContain">';
		content += '<div id="productMessage">Jewelry\'s Author</div>';
		content += decrateProductItemV2('aone',"Vũ Mạnh Tú - 1112376",'Everything has change',getRealPath()+'/img/vmt.jpg','99999999999999999999999999999999','#',2,"border-left:none;");
		content += decrateProductItemV2('atwo',"Trường Xuân - 1112521",'Sale Off',getRealPath()+'/img/txuan.jpg','9','#',1,'border-left:none;border-right:none');
	content += "<div class='clear'></div></div>";
	$('#productList').append(content);
}
function decrateProductItemV2(id,title,des,linkimg,cost,link,type,style){
	var cls = "one";
//	if(type == 2) cls = "two";
//	if(type == 3) cls = "three";
	var content = '<a href="'+link+'?id='+id+'"><div name="'+id+'" class="'+cls+'" >';
		content +='<div class="controlBox"> \
						<div class="controlIcon"> \
							<img class="like" name="'+id+'" src="'+getRealPath()+'/img/like.png" alt="like" /> \
							<img class="cmt" name="'+id+'" src="'+getRealPath()+'/img/cmt.png" /> \
						</div> \
					</div>';		
		content += '<img src="'+linkimg+'">\
					<div class="info">\
						<h3>'+title+'</h3>\
						<div class="price">$'+cost+'</div>\
						<p>'+des+'</p>\
					</div>\
					</div></a>';
	return content;
}
function detailProduct(title,des,linkimg,cost,link,material,weight,date,author){
	var content = '<a href="'+link+'"><div class="detailProduct">';
	content += '<img src="' + getRealPath()+"/" + linkimg + '" style="max-width:' + $('#contentPage').width() / 1.8 + 'px;"></a>\
					<div class="detailInfo">\
						<h3>'+title+'</h3>\
						<p>'+des+'</p>\
						<ul class="details">\
							<li>Cost : $'+cost+'</li>\
							<li>Material : '+material+'</li>\
							<li>Weight : '+weight+'</li>\
							<li>Release date : '+date+'</li>\
							<li>Developer : '+author+'</li>\
						</ul>\
						<span class="button2">add to cart!</span>\
					</div>\
					<div style="clear:both"></div>\
					<div id="commentBox">\
						<input type="text" class="loginElement" placeholder="Your Name" />\
						<textarea placeholder="Write a comment"></textarea>\
						<span id="commentPost" class="button2">Post</span>\
					</div>\
					<div id="commentList"><div style="height:25px"></div></div>\
					</div>';
	$('#contentPage').append(content);
	commentAction();

}
function initFooter(){
	createFooterMenu('information','INFORMATION');
		createrFooterSubMenu('information','JEWELRY NEWEST','#');
		createrFooterSubMenu('information','TOP SELLERS','#');
		createrFooterSubMenu('information','ABOUT','#');
		createrFooterSubMenu('information','CONTACT US','#');
	createFooterMenu('myAccount','MY ACCOUNT');
		createrFooterSubMenu('myAccount','MY ORDERS',"#");
		createrFooterSubMenu('myAccount','MY ADDRESS','#');
		createrFooterSubMenu('myAccount','MY PERSONAL INFO','#');
	createFooterMenu('followUs','FOLLOW US');
		createrFooterSubMenu('followUs','FACEBOOK','#');
		createrFooterSubMenu('followUs','GOOGLE+','#');
		createrFooterSubMenu('followUs','TWITTER','#');
	createFooterMenu('storeInfi','STORE INFORMATION','#');
}
function createFooterMenu(id,name){
	var content = '<li class="footerMenu" >\
				<h1>'+name+'</h1>\
				<ul id="'+id+'"></ul>\
			</li>';
		$('#footerContain').append(content);
}
function createrFooterSubMenu(id,name,link){
	var content = '<li class="footerSubSubMenu">\
					<a href="'+link+'">'+name+'</a>\
					</li>';
		$('#'+id).append(content);
}
function likeAction(){
	$('.like').click(function(e){
		if($(this).attr('alt') == 'like'){
			$(this).attr('src',getRealPath()+'/img/red-heart.png');
			$(this).attr('alt','liked');
		}else{
			$(this).attr('src',getRealPath()+'/img/like.png');
			$(this).attr('alt','like');
		}
		e.preventDefault();
    	return false;
	});
}
function commentAction(){
	$("#commentPost").click(function(){
		var name = $('#commentBox .loginElement').val();
		var content = $('#commentBox textarea').val();
		if (name.length > 2 && content.length > 10) {
		    $.ajax({
		        type: "GET",
		        url: "Home/Comment",
		        data: { name: name, content: content, id: GetURLParameter("id") }
		    })
            .done(function (msg) {
                pushComment(name, content);
                $('#commentBox textarea').val('');
            });
		}else if(name.length<=2) alert('Your name must be have at least 3 character !');
		else alert('Your comment must be have at least 10 character !');
	});
}
function pushComment(name,content){
	var content = "<div class='cmtContainer'>\
						<span>"+name+"</span>\
						<p>"+content+"</p>\
					</div>";
	$('#commentList').prepend(content);
	$('.cmtContainer p').css('margin-left',$('.cmtContainer span').width()+"px");
}
function searchAction(objectProduct){ 
	var searchName = $('#searchName').val();
	var searchType = $('#searchType').val();
	var searchMaterial = $('#searchMaterial').val();
	var searchCostFrom = $('#searchCostFrom').val();
	var searchCostTo = $('#searchCostTo').val();
	var searchDeveloper = $('#searchDeveloper').val();
	$('#searchResult').html(' ');
	var found=false;
	for(var i=0;i<objectProduct.length;i++){
		pushElement(objectProduct[i]);
		found = true;
	}
	if(!found){
		$('#searchResult').append('<div style="width:90%;margin:auto;">No item found. Please check your search\'s option to find out</div>');
	}
}
function compareElement(e1,e2){
	if(e1=='') return true;
	e1 = e1.toLowerCase();
	e2 = e2.toLowerCase();
	if(e2.indexOf(e1)== -1 ) return false;
	else if(e2.indexOf(e1) >-1 ) return true;
}
function compareNumber(e1,e2,type){
	if(e1=='') return true;
	if(isNaN(e1)) return false;
	if(isNaN(e2)) return false;
	if(type==1){
		if(parseInt(e1) < parseInt(e2)) return true;
		return false;
	}else{
		if(parseInt(e1) > parseInt(e2)) return true;
		return false;
	}
}
function pushElement(objectProductElement){
	var width = $('#contentPage').width();
	var divWidth = Math.round(width/5)-3;
	$('#searchResult').append('<a href="'+getRealPath()+'/Detail?id='+objectProductElement[0]+'"><div class="searchResultContain" style="width:'+divWidth+'px">	\
								<img src="'+getRealPath()+'/'+objectProductElement[3]+'"> \
								<span>$'+objectProductElement[4]+'</span>\
								<div class="searchResultTitle">'+objectProductElement[1]+'</div>\
								</div></a>');
}
