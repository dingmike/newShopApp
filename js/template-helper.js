template.helper('default', function (str, defaultStr) {
    if(str === ''){
    	return defaultStr;
    }else if(str === null){
    	return defaultStr;
    }else if(typeof(str) === 'undefined'){
    	return defaultStr;
    }
    return str;
});

template.helper('toString', function (json, isKey) {
	if(isKey){
		var data = {
			'data': json,
		};
		return JSON.stringify(data);	
	}
    return JSON.stringify(json);
});

template.helper('timeFormat', function (time, format) {
	format = format || '%y-%M-%d %h:%m:%s';
    return Time(time, format);
});

