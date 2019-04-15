"use strict";
function _defineProperty(e,t,n){
	return t in e?Object.defineProperty(e,t,{
		value:n,
		enumerable:!0,
		configurable:!0,
		writable:!0
	}):e[t]=n,e
}

var backgroundJS=chrome.extension.getBackgroundPage(),ranks={},data,html,

getDomainsData=function(e,t){
	var n,a,r,s,o,i,d,l,c,u=0;
	if(o=getDateDiffDays(backgroundJS.dates.today,
		backgroundJS.dates.start)+1,n={
			range:e,
			resolution:t,
			dateStart:backgroundJS.dates.start,
			daysSinceStart:o,
			domains:[],
			total:{
				name:"Total",
				time:0,
				percentage:100,
				percentageText:"100.00 %"
			}
		},
		a=backgroundJS.domains,
		e===RANGE_TODAY){
			r=backgroundJS.dates.today,s=backgroundJS.seconds.today;
			for(i in a)
				a.hasOwnProperty(i)&&a[i].days.hasOwnProperty(r)&&(d=a[i].days[r].seconds/s*100,
				l=getPercentageString(d),
				c=d>GRAPH_MIN_PERCENTAGE_TO_INCLUDE,
				u+=c?1:0,n.domains.push({
				name:a[i].name,
				time:a[i].days[r].seconds,
				percentage:d,
				percentageString:l,
				graphed:c
			}))
		}if(e===RANGE_ALLTIME){
			s=backgroundJS.seconds.alltime;
			for(i in a)a.hasOwnProperty(i)&&(d=a[i].alltime.seconds/s*100,
				l=getPercentageString(d),
				c=d>GRAPH_MIN_PERCENTAGE_TO_INCLUDE,
				u+=c?1:0,n.domains.push({
					name:a[i].name,
					time:a[i].alltime.seconds,
					percentage:d,
					percentageString:l,
					graphed:c
				}))
		}for(n.total.time=s,n.domains.sort(function(e,t){
			return t.percentage-e.percentage
		}),
	i=0;
	i<n.domains.length;i++)n.domains[i].graphed&&(n.domains[i].color=getHSL(i,u));
	return n
},

updateDoughnutInfotext=function(e,t,n){
	var a=document.querySelector("#doughnut-"+e+" .foreign-object .name");
	a.innerHTML=t;
	var r=document.querySelector("#doughnut-"+e+" .foreign-object .percentage");
	r.innerHTML=n},
	renderUIRange=function(e,t,n,a,r){
		var s=getDomainsData(e,t);
		n&&renderUIRangeDoughnut(s,e),
		a&&renderUIRangeTable(s,e),
		r&&countRanks(s.domains,e)},
		renderUIRangeTable=function(e,t){
			var n=tplHtmlTable(e);htmlRenderInto("table-"+t,n)
		},
		renderUIRangeDoughnut=function(e,t){
			var n=tplElementDoughnut(e,backgroundJS.settings.graphGap);
			elementInsertInto("doughnut-"+t,n)
		},countRanks=function(e,t){var n;
			for(ranks[t]={
				total:e.length,domains:{}
			},
			n=0;
			n<e.length;n++)ranks[t].domains[e[n].name]=n+1;
				return!0
},

clearOverallStats=function(){
	return document.querySelector("#pseudomodal .container.stats .stats-wrapper .text").innerHTML="",
	document.querySelector("#pseudomodal .container.stats .stats-wrapper .charts").innerHTML="",
	document.querySelector("#pseudomodal .container.stats .stats-wrapper").dataset.statsReady="0",!0
},

renderUI=function(){
	renderUIRange(RANGE_TODAY,RESOLUTION_HOURS,!0,!0,!0),
	renderUIRange(RANGE_ALLTIME,RESOLUTION_DAYS,!0,!0,!0),
	clearOverallStats(),dcl("UI rendered")
},

initialize=function(){
	return renderUI(),
	dcl("Application initialized"),!0
};
initialize(),

addMultipleDelegatedEventListeners("body","click",function(e,t){
	if(e.detail>=2)
		if(document.selection&&document.selection.empty)document.selection.empty();
	else if(window.getSelection){
		var n=window.getSelection();
		n.removeAllRanges()}return!0}),

addMultipleDelegatedEventListeners(".doughnut .group","click,mouseover,mouseout",function(e,t){
	var n,a,r="",s="",o=t.parentNode.getAttribute("wt:range"),
	i=t.getAttribute("wt:connect-id"),
	d=t.getAttribute("wt:url"),l=t.getAttribute("wt:no-data"),
	c=!1;
	if("click"===e.type)"other"!==d&&window.open("http://"+d);
	else{
		var u=document.querySelectorAll("#table-"+o+' tr.domain[data-connect-id="'+i+'"]');
		if("mouseover"===e.type){
			var m=document.querySelectorAll("#doughnut-"+o+" .group");
			for(n=0;n<m.length;n++)m[n].classList.remove("active");
				t.classList.add("active"),
				r=t.getAttribute("wt:name"),
				s=t.getAttribute("wt:percentage-string");
				var g=document.querySelectorAll("#table-"+o+" tr.domain");
			if(g)for(a=0;a<g.length;a++)g[a].classList.remove("active");
			if(u)for(a=0;a<u.length;a++)u[a].classList.add("active")
		}
		else if(t.classList.remove("active"),u.length>0)
		for(a=0;a<u.length;a++)u[a].classList.remove("active");
			"false"===l&&c===!1&&updateDoughnutInfotext(o,r,s)}return!0}),

addMultipleDelegatedEventListeners(".datatable tbody tr","click,mouseover,mouseout",function(e,t){
	var n,a="",r="",s=t.parentNode.parentNode.dataset.range,o=t.dataset.connectId,i=t.dataset.url;
	if("click"===e.type&&t.classList.contains("domain"))renderDomainStats({contextEl:t,range:s,connectId:o,url:i});
	else{
		var d=document.querySelector("#doughnut-"+s+' .group[wt\\:connect-id="'+o+'"]');
		if(d){
			if("mouseover"===e.type){
				var l=document.querySelectorAll("#table-"+s+" tr.domain");
				if(l)for(n=0;n<l.length;n++)l[n].classList.remove("active");
				d.classList.add("active"),
				a=d.getAttribute("wt:name"),
				r=d.getAttribute("wt:percentage-string")
			}
			if("mouseout"===e.type&&d.classList.remove("active"),t.classList.contains("stats")){
				var c=document.querySelector("#table-"+s+' tr.domain[data-url="'+i+'"]');
				"mouseover"===e.type?c.classList.add("active"):c.classList.remove("active")}updateDoughnutInfotext(s,a,r)
		}
	}
	return!0
}),

addMultipleDelegatedEventListeners(".chart-days .chart .days g.group","mouseover,mouseout",function(e,t){
	var n=t.closest(".chart-days").querySelector(".info .date"),
	a=t.closest(".chart-days").querySelector(".info .time"),
	r=t.getAttribute("wt:date"),s=t.getAttribute("wt:time");
	return"mouseover"===e.type?(n.innerHTML=r,a.innerHTML=tplHtmlTimeObjectFragment({value:s,resolution:RESOLUTION_HOURS})):"mouseout"===e.type&&(n.innerHTML="&nbsp;",a.innerHTML="&nbsp;"),!0
}),

addMultipleDelegatedEventListeners(".chart-daynames .chart .daynames g.group","mouseover,mouseout",function(e,t){
	var n=t.closest(".chart-daynames").querySelector(".info .percentage"),
	a=t.closest(".chart-daynames").querySelector(".info .time"),
	r=t.getAttribute("wt:percentage-string"),
	s=t.getAttribute("wt:time");return"mouseover"===e.type?(a.innerHTML=tplHtmlTimeObjectFragment({value:s,resolution:RESOLUTION_DAYS}),
		n.innerHTML=r):"mouseout"===e.type&&(a.innerHTML="&nbsp;",n.innerHTML="&nbsp;"),!0
}),

addMultipleDelegatedEventListeners(".chart-types a","click",function(e,t){
	e.preventDefault();
	var n=t.dataset.visibility;
	return document.getElementById("wrapper").dataset.visibility=n,!0
}),

addMultipleDelegatedEventListeners("#pseudomodal .menu a","click",function(e,t){
	e.preventDefault();
	var n=t.getAttribute("id");
	if("screenshot"!==n)document.querySelector("#pseudomodal").dataset.visibility=n;
	else if(SCREENSHOT_MODE){
		document.querySelector("#pseudomodal").dataset.visibility=n;
		var a=htmlTemplates.querySelector("#screenshot-info-instructions-list"),
		r=document.importNode(a.content,!0);
		elementInsertIntoElement(document.querySelector("#pseudomodal .container.screenshot .list"),r)
	}
	return!0
}),

addMultipleDelegatedEventListeners("#pseudomodal .trigger","click",function(e,t){
	e.preventDefault();
	var n=t.parentNode.querySelector(".confirm");
	return n.classList.add("visible"),!0
}),

addMultipleDelegatedEventListeners("#pseudomodal .confirm .cancel","click",function(e,t){
		e.preventDefault();
		var n=t.parentNode;
		return n.classList.remove("visible"),!0
}),

addMultipleDelegatedEventListeners("#pseudomodal .options-clear-all","click",function(e,t){
	var n=t.querySelector(".text"),a=t.querySelector(".loading");
	return e.preventDefault(),t.classList.contains("active")?(t.classList.remove("active"),
	n.innerText=n.dataset["default"],
	a.classList.remove("running"),
	backgroundJS.clearAllGeneratedData(),
	renderUI(),
	dcl("All data cleared")):(t.classList.add("active"),
	n.innerText=n.dataset.active,a.classList.add("running","warning"),
	a.querySelector(".shifter").style.animationDuration=INTERVAL_UI_LOADING+"ms",
	setTimeout(function(){
		t.classList.remove("active"),
		n.innerText=n.dataset["default"],
		a.classList.remove("running")},INTERVAL_UI_LOADING)),!0
}),
		

addMultipleDelegatedEventListeners("#pseudomodal .options-export-csv","click",
	function(e,t){
		e.preventDefault();
		var n=convertArrayToCsv(backgroundJS.domains,backgroundJS.dates.start,backgroundJS.dates.today);
		return initiateDownload([n],"octet/stream","webtime-tracker-"+backgroundJS.dates.today+".csv"),!0
}),

renderControlBadgeDisplay=function()
{
	var e=(checked:backgroundJS.settings.badgeDisplay);
	html=tplHtmlBadgeDisplayControl(e),htmlRenderInto("badge-display",html)

},

addMultipleDelegatedEventListeners("#pseudomodal #badge-display .checkbox","change",
function(e,t){var n=t.checked;return"change"===e.type&&(backgroundJS.setBadgeDisplay(n),
	backgroundJS.saveBadgeDisplay(),backgroundJS.updateDomains(!0),dcl("Badge display saved: "+n)),!0
}),


addMultipleDelegatedEventListeners(".screenshot-capture .capture","click",
	function(e,t){
		return e.preventDefault(),
		console.log("Screenshot - start"),
		screenshotUICaptureHide(),
		setTimeout(function(){
			chrome.tabs.captureVisibleTab(null,{
				format:"png"
			},
			function(e){
				if(chrome.runtime.lastError&&chrome.runtime.lastError.message)dcl("Screenshot - error: "+chrome.runtime.lastError.message);
				else{
					for(var t=e.split(",")[0].split(":")[1].split(";")[0],
						n=window.atob(e.split(",")[1]),
						a=new Uint8Array(n.length),
						r=0;r<n.length;r++)a[r]=n.charCodeAt(r);
						var s=(new Date).toISOString().replace(/[T:]/g,"-").split(".")[0],
					o="webtime-tracker-screenshot-"+s+".png";
					initiateDownload([a],t,o),screenshotUICaptureShow()}})},SCREENSHOT_WAIT),!0
});




		

