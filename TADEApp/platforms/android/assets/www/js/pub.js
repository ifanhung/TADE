//deivce
var devicePlatform = "";

function doDummy(){
    //window.localStorage.clear();
}
function isEmpty(value){
    return (typeof value === "undefined" || value === null);
}
function searchChk(){
    if(document.getElementById('SearchStr').value==''){
        navigator.notification.alert(
                                     '請輸入關鍵字',  // message
                                     doDummy,         // callback
                                     '搜尋',            // title
                                     '確定'                  // buttonName
                                     );
        document.getElementById('SearchStr').focus();
        event.returnValue = false;
    }else{
        window.localStorage.setItem('SearchStr',document.getElementById('SearchStr').value);
        
        location = 'search.html';
        event.returnValue = false;
    }
}

//in app browser
function OpenExternal(url){
    
    //var ref = window.open(url, '_system', 'location=yes');
    
    var ref = window.open(url, '_blank', 'location=no');
    var myCallback = function() { alert(event.url); }
    ref.addEventListener('loadstart', myCallback);
    ref.removeEventListener('loadstart', myCallback);
    
}
//open browser
function OpenBrowser(url){
    if(url != "") var ref = window.open(url, '_system', 'location=yes');
    
}
//open url by device platform
function OpenUrlByDevice(url){
    
    if(devicePlatform == "iOS") OpenExternal(url);
    else OpenBrowser(url);
    
}
function gotoPage(url){
    
    location = url;
    
}

function onBackKey() {
    history.go(-1);
    //navigator.app.backHistory();
}
function update_read_count(type,pk_id){
    //alert(type+"-"+pk_id);
    $.ajax({
           type : "GET",
           dataType : "jsonp",
           url : "http://210.65.89.114/TADE/Xml/UpdateReadCount.aspx",
           crossDomain: true,
           contentType: "application/json; charset=utf-8",
           data : {"Device":"iOS","type":type,"PKValue":pk_id},
           success: doDummy,
           error: function(xhr, status, error) { alert('讀取資料失敗 !!'); },
           async: false,
           cache: false
           });
}
function addFavorite(type,pk_id,MeetingTitle,MeetingFileUrl,MeetingDate,Speaker,SpeakerPhoto){
    
    if(chkFavoriteExist(type,pk_id)){
        /*
        navigator.notification.alert(
                                     '已經收藏過',  // message
                                     doDummy,         // callback
                                     '我的收藏',            // title
                                     '確定'                  // buttonName
                                     );
        */
        var delIndex = getFavoriteIndex(type,pk_id);
        if(delIndex!=-1) removeFavorite(delIndex);
    }else{

        var fav_type = new Array();
        var fav_pk_id = new Array();
        var fav_MeetingTitle = new Array();
        var fav_MeetingFileUrl = new Array();
        var fav_MeetingDate = new Array();
        var fav_Speaker = new Array();
        var fav_SpeakerPhoto = new Array();
        var fav_datetime = new Array();
        
        //get old value and convert to array
        if(window.localStorage.getItem("fav_type") != null){
            fav_type = JSON.parse(window.localStorage.getItem("fav_type"));
            fav_pk_id = JSON.parse(window.localStorage.getItem("fav_pk_id"));
            fav_MeetingTitle = JSON.parse(window.localStorage.getItem("fav_MeetingTitle"));
            fav_MeetingFileUrl = JSON.parse(window.localStorage.getItem("fav_MeetingFileUrl"));
            fav_MeetingDate = JSON.parse(window.localStorage.getItem("fav_MeetingDate"));
            fav_Speaker = JSON.parse(window.localStorage.getItem("fav_Speaker"));
            fav_SpeakerPhoto = JSON.parse(window.localStorage.getItem("fav_SpeakerPhoto"));
            fav_datetime = JSON.parse(window.localStorage.getItem("fav_datetime"));
        }
        var dd = new Date();
        var DateStr = dd.getFullYear() + "/" + eval(dd.getMonth()+1) + "/" + dd.getDate() + " " + dd.getHours() + ":" + dd.getMinutes() + ":" + dd.getSeconds();
        
        //add new one
        fav_type.push(type);
        fav_pk_id.push(pk_id);
        fav_MeetingTitle.push(MeetingTitle);
        fav_MeetingFileUrl.push(MeetingFileUrl);
        fav_MeetingDate.push(MeetingDate);
        fav_Speaker.push(Speaker);
        fav_SpeakerPhoto.push(SpeakerPhoto);
        fav_datetime.push(DateStr);
        
        //save
        window.localStorage.setItem("fav_type", JSON.stringify(fav_type));
        window.localStorage.setItem("fav_pk_id", JSON.stringify(fav_pk_id));
        window.localStorage.setItem("fav_MeetingTitle", JSON.stringify(fav_MeetingTitle));
        window.localStorage.setItem("fav_MeetingFileUrl", JSON.stringify(fav_MeetingFileUrl));
        window.localStorage.setItem("fav_MeetingDate", JSON.stringify(fav_MeetingDate));
        window.localStorage.setItem("fav_Speaker", JSON.stringify(fav_Speaker));
        window.localStorage.setItem("fav_SpeakerPhoto", JSON.stringify(fav_SpeakerPhoto));
        window.localStorage.setItem("fav_datetime", JSON.stringify(fav_datetime));
        
        console.log(window.localStorage.getItem("fav_type"));
        console.log(window.localStorage.getItem("fav_pk_id"));
        console.log(window.localStorage.getItem("fav_MeetingTitle"));
        console.log(window.localStorage.getItem("fav_MeetingFileUrl"));
        console.log(window.localStorage.getItem("fav_MeetingDate"));
        console.log(window.localStorage.getItem("fav_Speaker"));
        console.log(window.localStorage.getItem("fav_SpeakerPhoto"));
        console.log(window.localStorage.getItem("fav_datetime"));
        /*
        navigator.notification.alert(
                                     '加入成功',  // message
                                     doDummy,         // callback
                                     '我的收藏',            // title
                                     '確定'                  // buttonName
                                     );
         */
    }
    
}
function removeFavorite(delIdx){
    var fav_type = new Array();
    var fav_pk_id = new Array();
    var fav_MeetingTitle = new Array();
    var fav_MeetingFileUrl = new Array();
    var fav_MeetingDate = new Array();
    var fav_Speaker = new Array();
    var fav_SpeakerPhoto = new Array();
    var fav_datetime = new Array();
    
    fav_type = JSON.parse(window.localStorage.getItem("fav_type"));
    fav_pk_id = JSON.parse(window.localStorage.getItem("fav_pk_id"));
    fav_MeetingTitle = JSON.parse(window.localStorage.getItem("fav_MeetingTitle"));
    fav_MeetingFileUrl = JSON.parse(window.localStorage.getItem("fav_MeetingFileUrl"));
    fav_MeetingDate = JSON.parse(window.localStorage.getItem("fav_MeetingDate"));
    fav_Speaker = JSON.parse(window.localStorage.getItem("fav_Speaker"));
    fav_SpeakerPhoto = JSON.parse(window.localStorage.getItem("fav_SpeakerPhoto"));
    fav_datetime = JSON.parse(window.localStorage.getItem("fav_datetime"));
    
    //remove value
    fav_type.splice(delIdx,1);
    fav_pk_id.splice(delIdx,1);
    fav_MeetingTitle.splice(delIdx,1);
    fav_MeetingFileUrl.splice(delIdx,1);
    fav_MeetingDate.splice(delIdx,1);
    fav_Speaker.splice(delIdx,1);
    fav_SpeakerPhoto.splice(delIdx,1);
    fav_datetime.splice(delIdx,1);
    
    //save
    window.localStorage.setItem("fav_type", JSON.stringify(fav_type));
    window.localStorage.setItem("fav_pk_id", JSON.stringify(fav_pk_id));
    window.localStorage.setItem("fav_MeetingTitle", JSON.stringify(fav_MeetingTitle));
    window.localStorage.setItem("fav_MeetingFileUrl", JSON.stringify(fav_MeetingFileUrl));
    window.localStorage.setItem("fav_MeetingDate", JSON.stringify(fav_MeetingDate));
    window.localStorage.setItem("fav_Speaker", JSON.stringify(fav_Speaker));
    window.localStorage.setItem("fav_SpeakerPhoto", JSON.stringify(fav_SpeakerPhoto));
    window.localStorage.setItem("fav_datetime", JSON.stringify(fav_datetime));
    
    console.log(window.localStorage.getItem("fav_type"));
    console.log(window.localStorage.getItem("fav_pk_id"));
    console.log(window.localStorage.getItem("fav_MeetingTitle"));
    console.log(window.localStorage.getItem("fav_MeetingFileUrl"));
    console.log(window.localStorage.getItem("fav_MeetingDate"));
    console.log(window.localStorage.getItem("fav_Speaker"));
    console.log(window.localStorage.getItem("fav_SpeakerPhoto"));
    console.log(window.localStorage.getItem("fav_datetime"));
    
}

function chkFavoriteExist(type,pk_id){
    
    var fav_type = new Array();
    var fav_pk_id = new Array();
    
    var retVal = false;
    
    //get old value and convert to array
    if(window.localStorage.getItem("fav_type") != null){
        fav_type = JSON.parse(window.localStorage.getItem("fav_type"));
        fav_pk_id = JSON.parse(window.localStorage.getItem("fav_pk_id"));
    }
    
    for (var i = 0; i < fav_type.length; i++) {
        
        if (fav_type[i] == type && fav_pk_id[i]==pk_id) {
            retVal = true;
            break;
        }
    }
    
    return retVal;
}
function getFavoriteIndex(type,pk_id){
    
    var fav_type = new Array();
    var fav_pk_id = new Array();
    
    var retVal = -1;
    
    //get old value and convert to array
    if(window.localStorage.getItem("fav_type") != null){
        fav_type = JSON.parse(window.localStorage.getItem("fav_type"));
        fav_pk_id = JSON.parse(window.localStorage.getItem("fav_pk_id"));
    }
    
    for (var i = 0; i < fav_type.length; i++) {
        
        if (fav_type[i] == type && fav_pk_id[i]==pk_id) {
            retVal = i;
            break;
        }
    }
    
    return retVal;
}
function registerPush(){
    
    if ( device.platform == 'android' || device.platform == 'Android' || device.platform == "amazon-fireos" ){
        pushNotification.register(
                                  successHandler,
                                  errorHandler,
                                  {
                                  "senderID":"1011504866907",
                                  "ecb":"onNotification"
                                  });
    } else if ( device.platform == 'blackberry10'){
        pushNotification.register(
                                  successHandler,
                                  errorHandler,
                                  {
                                  invokeTargetId : "replace_with_invoke_target_id",
                                  appId: "replace_with_app_id",
                                  ppgUrl:"replace_with_ppg_url", //remove for BES pushes
                                  ecb: "pushNotificationHandler",
                                  simChangeCallback: replace_with_simChange_callback,
                                  pushTransportReadyCallback: replace_with_pushTransportReady_callback,
                                  launchApplicationOnPush: true
                                  });
    } else {
        pushNotification.register(
                                  tokenHandler,
                                  errorHandler,
                                  {
                                  "badge":"true",
                                  "sound":"true",
                                  "alert":"true",
                                  "ecb":"onNotificationAPN"
                                  });
    }
}
// result contains any message sent from the plugin call
function successHandler (result) {
    //alert('result = ' + result);
}
// result contains any error description text returned from the plugin call
function errorHandler (error) {
    //alert('error = ' + error);
}
function tokenHandler (result) {
    // Your iOS push server needs to know the token before it can push to this device
    // here is where you might want to send it the token for later use.
    //alert('device token = ' + result);
    
    $.ajax({
           type : "GET",
           dataType : "jsonp",
           url : "http://210.65.89.114/TADE/Xml/AddDeviceToken.aspx",
           crossDomain: true,
           contentType: "application/json; charset=utf-8",
           data : {"Device":"iOS","device_token":result},
           success: doDummy,
           error: function(xhr, status, error) { alert('讀取資料失敗 !!'); },
           async: false,
           cache: false
           });
}
function RegIDHandler (reg_id) {

    $.ajax({
           type : "GET",
           dataType : "jsonp",
           url : "http://210.65.89.114/TADE/Xml/AddDeviceToken.aspx",
           crossDomain: true,
           contentType: "application/json; charset=utf-8",
           data : {"Device":"Android","device_token":reg_id},
           success: doDummy,
           error: function(xhr, status, error) { alert('讀取資料失敗 !!'); },
           async: false,
           cache: false
           });
}
// iOS
function onNotificationAPN (event) {
    if ( event.alert )
    {
        //navigator.notification.alert(event.alert);
    }
    if (event.type == "Video" && event.pk_id != "0" && event.pk_id != "")
    {
        //navigator.notification.alert(event.url);
        window.localStorage.setItem('VideoID',event.pk_id);
        location = 'index.html';
        
    }
    else if (event.type == "Doc" && event.pk_id != "0" && event.pk_id != "")
    {
        //navigator.notification.alert(event.url);
        window.localStorage.setItem('DocID',event.pk_id);
        location = 'doc_detail.html';
        
    }
    else if (event.type == "AboutUs" && event.pk_id != "0" && event.pk_id != "")
    {
        //navigator.notification.alert(event.url);
        window.localStorage.setItem('AboutUsID',event.pk_id);
        location = 'aboutus_detail.html';
        
    }
    
    if ( event.sound )
    {
        var snd = new Media(event.sound);
        snd.play();
    }
    
    if ( event.badge )
    {
        pushNotification.setApplicationIconBadgeNumber(successHandler, errorHandler, event.badge);
    }
    
}

//android
function onNotification(e) {
    
		//alert(e.event);
    switch( e.event )
    {
    case 'registered':
        if ( e.regid.length > 0 )
        {
            
            // Your GCM push server needs to know the regID before it can push to this device
            // here is where you might want to send it the regID for later use.
            
            RegIDHandler(e.regid);
            console.log("regID = " + e.regid);
            
        }
    break;

    case 'message':
        // if this flag is set, this notification happened while we were in the foreground.
        // you might want to play a sound to get the user's attention, throw up a dialog, etc.
        if ( e.foreground )
        {
            // on Android soundname is outside the payload.
            // On Amazon FireOS all custom attributes are contained within payload
            var soundfile = e.soundname || e.payload.sound;
            // if the notification contains a soundname, play it.
            var my_media = new Media("/android_asset/www/"+ soundfile);
            my_media.play();
        }
        else
        {  // otherwise we were launched because the user touched a notification in the notification tray.
            if ( e.coldstart )
            {
                //COLDSTART NOTIFICATION
            }
            else
            {
                //BACKGROUND NOTIFICATION
            }
        }
       	
       	console.log("Msg = " + e.payload.message);
       	
       	if (e.payload.type == "Video" && e.payload.pk_id != "0" && e.payload.pk_id != "")
	    {
	        //navigator.notification.alert(e.payload.url);
	        window.localStorage.setItem('VideoID',e.payload.pk_id);
	        location = 'index.html';
	        
	    }
	    else if (e.payload.type == "Doc" && e.payload.pk_id != "0" && e.payload.pk_id != "")
	    {
	        //navigator.notification.alert(e.payload.url);
	        window.localStorage.setItem('DocID',e.payload.pk_id);
	        location = 'doc_detail.html';
	        
	    }
	    else if (e.payload.type == "AboutUs" && e.payload.pk_id != "0" && e.payload.pk_id != "")
	    {
	        //navigator.notification.alert(e.payload.url);
	        window.localStorage.setItem('AboutUsID',e.payload.pk_id);
	        location = 'aboutus_detail.html';
	        
	    }
				
       //$("#app-status-ul").append('<li>MESSAGE -> MSG: ' + e.payload.message + '</li>');
       //Only works for GCM
       //$("#app-status-ul").append('<li>MESSAGE -> MSGCNT: ' + e.payload.msgcnt + '</li>');
       //Only works on Amazon Fire OS
       //$status.append('<li>MESSAGE -> TIME: ' + e.payload.timeStamp + '</li>');
    break;

    case 'error':
    		console.log("ERROR Msg = " + e.message);
        
    break;

    default:
    		console.log("EVENT -> Unknown, an event was received and we do not know what it is");
        
    break;
  }
}
function LoadCate(VideoTypeID){
    window.localStorage.setItem('VideoTypeID',VideoTypeID);
    location = "video.html";
}
function deleteAllLocalStorage(){
    localStorage.clear();
}

