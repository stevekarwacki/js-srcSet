;(document.onreadystatechange = function () {
    if (document.readyState == "interactive") { // wait for document ready
		var screenWidth = window.innerWidth;
		if(!document.querySelectorAll) { // add IE7 support for document.querySelectorAll
			(function(d,s){d=document,s=d.createStyleSheet();d.querySelectorAll=function(r,c,i,j,a){a=d.all,c=[],r=r.replace(/\[for\b/gi,'[htmlFor').split(',');for(i=r.length;i--;){s.addRule(r[i],'k:v');for(j=a.length;j--;)a[j].currentStyle.k&&c.push(a[j]);s.removeRule(0)}return c}})()
		}
		if (!String.prototype.trim) { // create regex trim if trim is not supported by browser
		  String.prototype.trim = function () {
		    return this.replace(/^\s+|\s+$/g, '');
		  };
		}
		Array.prototype.sortDesc = function (index) { // sort 2 dimensional array by specified index (data[i][index])
			this.sort(function (a, b) { // javascript sort magic
				if(a[index] < b[index]) {
					return 1;
				}
				else if(a[index] > b[index]) {
					return -1;
				}
				else {
					return 0;
				}
			});
			return this;
		};
		function selectSrc(element,dataArray) {
			var dataCount = dataArray.length;
			for(var i = 0;i < dataCount;i++) { // loop through array until a src size smaller than screen width is found, then stop
				if(dataArray[i][1] < screenWidth) {
					element.setAttribute('src',dataArray[i][0]); // set src attribute
					break;
				}
				else if(i == dataCount - 1) { // if screen size is smaller than all src sizes, select smallest src
					element.setAttribute('src',dataArray[i][0]);
				}
			}
		}
		var imgElements = document.querySelectorAll("img[data-srcset]"); // get all elements with data-srcset attribute
		for(var i = 0; i < imgElements.length;i++) { // loop through selected elements
			var el = imgElements[i];
			var data = el.getAttribute('data-srcset').replace(/ +/g," ").split(','); // cleanup and split set of src's (each coupled with a size)
			for(var i = 0;i < data.length;i++) {
				data[i] = data[i].trim().split(' '); // split src and size into multidimensional array
				try {
					data[i][1] = parseInt(data[i][1].replace(/\D/g,'')); // cleanup
				}
				catch (err) {
					throw('Malformed data-srcset attribute');
				}
				if(isNaN(data[i][1])) {
					throw('Malformed data-srcset attribute: src size must be a number');
				}
			}
			data.sortDesc(1); // sort array by descending src size (data[i][1])
			selectSrc(el,data); // select correct src
		}
	}
});
