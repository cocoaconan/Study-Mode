"use strict";
function _toConsumableArray(t){
	if(Array.isArray(t)){
		for(var e=0,r=Array(t.length);
			e<t.length;e++)r[e]=t[e];
			return r
	}
	return Array.from(t)
}

var htmlRenderInto=function(t,e){
	return document.getElementById(t).innerHTML=e,!0
},
elementInsertInto=function(t,e){
	var r=document.getElementById(t);
	return r.innerHTML="",r.appendChild(e),!0
},
elementInsertIntoElement=function(t,e){
	return t.innerHTML="",t.appendChild(e),!0
},
elementAppendToElement=function(t,e){
	return t.appendChild(e),!0
},
elementInsertAfterElement=function(t,e){
	return t.parentNode.insertBefore(e,t.nextSibling),!0
},
tplHtmlTable=function(t){
	var e,r,n,a,s,i=[];
	for(i.push("<thead>"),
		i.push("<tr>"),
		i.push('<td colspan="4">'),
		t.range===RANGE_TODAY?
		i.push("Today data "):
		t.range===RANGE_AVERAGE?
		i.push("Daily averages since "+t.dateStart+" ("+t.daysSinceStart+" day"+(t.daysSinceStart>1?"s":"")+")"):t.range===RANGE_ALLTIME&&
		i.push("Aggregate data since "+t.dateStart+" ("+t.daysSinceStart+" day"+(t.daysSinceStart>1?"s":"")+")"),
		i.push("</td>"),
		i.push("</tr>"),
		i.push("</thead>"),
		i.push("<tbody>"),
		e=0;
		e<t.domains.length;
		e++)r=t.domains[e],
		n=helperGetTimeObj(r.time,t.resolution),
	a=r.graphed?r.name:"other",
	s=r.graphed?r.color:GRAPH_COLOR_OTHER,
	i.push('<tr class="domain" data-connect-id="'+a+'" data-url="'+r.name+'" data-percentage-string="'+r.percentageString+'">'),
	i.push('<td class="label">'),
	i.push('<span style="color: '+s+';">&#x2b24;</span>'),
	i.push("</td>"),
	i.push('<td class="name">'),
	i.push("            "+r.name),
	i.push("        </td>"),
	i.push('<td class="percentage">'),
	i.push("            "+r.percentageString),
	i.push("        </td>"),
	i.push('<td class="time">'),"h"!==t.resolution&&
	i.push('<span class="time-day">'+tplHtmlTableTimeFragment(n.day)+"</span>"),
	i.push('<span class="time-hour">'+tplHtmlTableTimeFragment(n.hour)+"</span>"),
	i.push('<span class="time-minute">'+tplHtmlTableTimeFragment(n.minute)+"</span>"),
	i.push('<span class="time-second">'+tplHtmlTableTimeFragment(n.second)+"</span>"),
	i.push("        </td>"),
	i.push("    </tr>");
	return i.push("</tbody>"),
	i.push("<tfoot>"),
	t.domains.length>0?(n=helperGetTimeObj(t.total.time,t.resolution),
	i.push('<tr class="padder">'),
	i.push('<td colspan="4">'),
	i.push("        </td>"),
	i.push("    </tr>"),
	i.push('<tr class="domain">'),
	i.push('<td class="label">'),
	i.push("        </td>"),
	i.push('<td class="name">'),
	i.push("            Total"),
	i.push("        </td>"),
	i.push('<td class="percentage">'),
	i.push("            100.00 %"),
	i.push("        </td>"),
	i.push('<td class="time">'),"h"!==t.resolution&&
	i.push('<span class="time-day">'+tplHtmlTableTimeFragment(n.day)+"</span>"),
	i.push('<span class="time-hour">'+tplHtmlTableTimeFragment(n.hour)+"</span>"),
	i.push('<span class="time-minute">'+tplHtmlTableTimeFragment(n.minute)+"</span>"),
	i.push('<span class="time-second">'+tplHtmlTableTimeFragment(n.second)+"</span>"),
	i.push("        </td>"),
	i.push("    </tr>")):(i.push('    <tr class="nodata">'),
	i.push('<td colspan="4">'),
	i.push("            No data collected for this period yet."),
	i.push("        </td>"),
	i.push("    </tr>")),
	i.push("</tfoot>"),i.join("")
},
tplHtmlTableTimeFragment=function(t){
	var e=[];
	return e.push('<span class="digit-tens '+(t.implicitlyActive||t.tens>0?"active":"")+'">'),
	e.push(""+t.tens),e.push("</span>"),
	e.push('<span class="digit-units '+(t.implicitlyActive||t.tens>0||t.units>0?"active":"")+'">'),
	e.push(""+t.units),e.push(t.unit),
	e.push("</span>"),
	e.join("")
},
tplHtmlTimeObjectFragment=function(t){
	var e=[],
	r=helperGetTimeObj(t.value,t.resolution);
	return"h"!==t.resolution&&
	e.push('<span class="time-day">'+tplHtmlTableTimeFragment(r.day)+"</span>"),
	e.push('<span class="time-hour">'+tplHtmlTableTimeFragment(r.hour)+"</span>"),
	e.push('<span class="time-minute">'+tplHtmlTableTimeFragment(r.minute)+"</span>"),
	e.push('<span class="time-second">'+tplHtmlTableTimeFragment(r.second)+"</span>"),
	e.join("")
},

tplHtmlBadgeDisplayControl=function(t){
	var e=[];
	return e.push("<label>"),
	e.push('<input tabindex="-1" class="checkbox" type="checkbox" '+(t.checked?"checked":"")+" />"),
	e.push("Display time tracker in icon"),e.push("</label>"),
	e.join("")
},

tplElementStatsDomain=function(t,e){
	var r=e.querySelector("tr.stats");
	r.querySelector("td").classList.add("stats"),
	r.classList.add("stats"),
	r.dataset.connectId=t.connectId,
	r.dataset.url=t.url;
	var n=e.querySelector("tr.stats td.label");
	n.querySelector(".border").style.background=t.color;
	var a=e.querySelector("tr.stats td.content");
	return a.querySelector(".url").setAttribute("href","http://"+t.url),
	a.querySelector(".url").textContent=t.url,
	a.querySelector(".rank-"+RANGE_TODAY+"-position").textContent=t.ranks[RANGE_TODAY].position,
	a.querySelector(".rank-"+RANGE_TODAY+"-total").textContent=t.ranks[RANGE_TODAY].total,
	a.querySelector(".rank-"+RANGE_ALLTIME+"-position").textContent=t.ranks[RANGE_ALLTIME].position,
	a.querySelector(".rank-"+RANGE_ALLTIME+"-total").textContent=t.ranks[RANGE_ALLTIME].total,
	e.querySelector(".time-min-date").textContent=t.dates.timeMin,
	e.querySelector(".time-max-date").textContent=t.dates.timeMax,
	e.querySelector(".time-min").innerHTML=tplHtmlTimeObjectFragment({
		value:t.timeValues.min,
		resolution:RESOLUTION_HOURS
	}),
	e.querySelector(".time-max").innerHTML=tplHtmlTimeObjectFragment({
		value:t.timeValues.max,
		resolution:RESOLUTION_HOURS
	}),
	a.querySelector(".days-domain").textContent=t.days.domain,
	a.querySelector(".days-total").textContent=t.days.total,
	a.querySelector(".visits-first").textContent=t.visits.first,
	a.querySelector(".visits-last").textContent=t.visits.last,
	a.querySelector(".time-"+RANGE_TODAY).innerHTML=tplHtmlTimeObjectFragment({
		value:t.times[RANGE_TODAY],
		resolution:RESOLUTION_HOURS
	}),
	a.querySelector(".time-"+RANGE_AVERAGE).innerHTML=tplHtmlTimeObjectFragment({
		value:t.times[RANGE_AVERAGE],
		resolution:RESOLUTION_HOURS
	}),
	a.querySelector(".time-"+RANGE_AVERAGE+"-pure").innerHTML=tplHtmlTimeObjectFragment({
		value:t.times[RANGE_AVERAGE+"-pure"],
		resolution:RESOLUTION_HOURS
	}),
	a.querySelector(".time-"+RANGE_ALLTIME).innerHTML=tplHtmlTimeObjectFragment({
		value:t.times[RANGE_ALLTIME],
		resolution:RESOLUTION_DAYS
	}),
	e
},
tplElementStatsOverall=function(t,e){
	return e.querySelector(".days-visited").textContent=t.days.visited,
	e.querySelector(".days-total").textContent=t.days.total,
	e.querySelector(".visits-first").textContent=t.visits.first,
	e.querySelector(".visits-last").textContent=t.visits.last,
	e.querySelector(".time-min-date").textContent=t.dates.timeMin,
	e.querySelector(".time-max-date").textContent=t.dates.timeMax,
	e.querySelector(".time-min").innerHTML=tplHtmlTimeObjectFragment({
		value:t.timeValues.min,
		resolution:RESOLUTION_HOURS
	}),
	e.querySelector(".time-max").innerHTML=tplHtmlTimeObjectFragment({
		value:t.timeValues.max,
		resolution:RESOLUTION_HOURS
	}),
	e.querySelector(".time-"+RANGE_TODAY).innerHTML=tplHtmlTimeObjectFragment({
		value:t.times[RANGE_TODAY],
		resolution:RESOLUTION_HOURS
	}),
	e.querySelector(".time-"+RANGE_AVERAGE).innerHTML=tplHtmlTimeObjectFragment({
		value:t.times[RANGE_AVERAGE],
		resolution:RESOLUTION_HOURS
	}),
	e.querySelector(".time-"+RANGE_AVERAGE+"-pure").innerHTML=tplHtmlTimeObjectFragment({
		value:t.times[RANGE_AVERAGE+"-pure"],
		resolution:RESOLUTION_HOURS
	}),
	e.querySelector(".time-"+RANGE_ALLTIME).innerHTML=tplHtmlTimeObjectFragment({
		value:t.times[RANGE_ALLTIME],
		resolution:RESOLUTION_DAYS
	}),
	e
},
tplElementStatsCharts=function(t,e){
	var r=e.querySelector(".chart-days");
	return r.querySelector(".info .left strong").textContent=t.dates.start,
	r.querySelector(".info .right strong").textContent=t.dates.today,e
},
tplElementDoughnut=function(t,e){
	var r,n,a,s,i,u,l=GRAPH_SIZE,c=l/2*.6,o=2*c*.9,p=2*c*.5,m=l/2-o/2,d=l/2-p/2,h=0,g={
		name:"other",
		percentage:0,
		color:GRAPH_COLOR_OTHER
	},
	A=!0,b="http://www.w3.org/2000/svg",
	S=document.createElementNS(b,"svg:svg");
	for(S.setAttribute("xmlns:wt","http://www.example.com/webtime-tracker"),
		S.setAttribute("class","doughnut"),
		S.setAttribute("wt:range",t.range),
		S.setAttribute("width",l),
		S.setAttribute("height",l),
		S.setAttribute("viewBox","0 0 "+l+" "+l),
		S.setAttribute("shape-rendering","geometricPrecision"),
		S.style.background="#ffffff",
		u=0;
		u<t.domains.length;u++)A=!1,r=t.domains[u],
		r.graphed?(tplElementDoughnutWedgeFragment(r,{percentageStart:h,noData:A,graphGap:e,graphSize:l,doughnut:S}),
		h+=r.percentage):g.percentage+=r.percentage;
		return g.percentage>0&&(g.percentageString=getPercentageString(g.percentage),
			tplElementDoughnutWedgeFragment(g,{percentageStart:h,noData:A,graphGap:e,graphSize:l,doughnut:S})),
		A&&(g.name="",g.percentage=100,g.percentageString="No data available",
			tplElementDoughnutWedgeFragment(g,{percentageStart:h,noData:A,graphGap:e,graphSize:l,doughnut:S})),
		n=document.createElementNS(b,"circle"),
		n.setAttribute("cx",l/2),
		n.setAttribute("cy",l/2),n.setAttribute("r",c),
		n.setAttribute("fill","#ffffff"),
		S.appendChild(n),a=document.createElementNS(b,"foreignObject"),
		a.setAttribute("x",m),
		a.setAttribute("y",d),
		a.setAttribute("width",o),
		a.setAttribute("height",p),
		a.setAttribute("class","foreign-object"),
		s=document.createElement("body"),
		i=document.createElement("div"),
		i.setAttribute("class","percentage"),A&&(i.innerHTML="No data available"),
		s.appendChild(i),
		i=document.createElement("div"),
		i.setAttribute("class","name"),
		s.appendChild(i),
		a.appendChild(s),
		S.appendChild(a),S

},
tplElementDoughnutWedgeFragment=function(t,e){
	var r,n,a,s,i,u,l,c,o,p,m,d,h,g,A,b="http://www.w3.org/2000/svg",
	S=2*Math.PI/100,
	y=e.graphSize/2,
	E=e.graphSize/2,
	T=e.graphSize/2-4,
	v=e.graphSize/2-2,
	O=e.graphSize/2,
	f=e.graphSize/2-2,
	R=100===t.percentage?0:e.graphGap;
	if(i=S*e.percentageStart,u=S*(e.percentageStart+t.percentage-R),
		a=document.createElementNS(b,"circle"),e.noData)r=document.createElementNS(b,"circle"),
		r.setAttribute("cx",y),
		r.setAttribute("cy",E),
		r.setAttribute("r",O),
		n=document.createElementNS(b,"circle");
	else if(0===i&&100===t.percentage)r=document.createElementNS(b,"circle"),
		r.setAttribute("cx",y),
		r.setAttribute("cy",E),
		r.setAttribute("r",T),
		n=document.createElementNS(b,"circle"),
		n.setAttribute("cx",y),
		n.setAttribute("cy",E),
		n.setAttribute("r",O),
		a.setAttribute("cx",y),
		a.setAttribute("cy",E),
		a.setAttribute("r",f);
	else{
		r=document.createElementNS(b,"path"),
		c=y+T*Math.sin(i),d=E-T*Math.cos(i),
		o=y+T*Math.sin(u),h=E-T*Math.cos(u);
		var H=0;u-i>Math.PI&&(H=1),
		A="M "+y+","+E,A+=" L "+c+","+d,A+=" A "+T+","+T,A+=" 0 "+H+" 1 ",A+=o+","+h,A+=" Z",
		r.setAttribute("d",A),
		n=document.createElementNS(b,"path"),
		l=y+v*Math.sin(i),m=E-v*Math.cos(i),
		c=y+O*Math.sin(i),d=E-O*Math.cos(i),
		o=y+O*Math.sin(u),h=E-O*Math.cos(u),
		p=y+v*Math.sin(u),g=E-v*Math.cos(u);
		var H=0;u-i>Math.PI&&(H=1),
		A="M "+l+","+m,
		A+=" L "+c+","+d,
		A+=" A "+O+","+O,
		A+=" 0 "+H+" 1 ",
		A+=o+","+h,
		A+=" L "+p+","+g,
		A+=" A "+v+","+v,
		A+=" 0 "+H+" 0 ",
		A+=l+","+m,A+=" Z",
		n.setAttribute("d",A)
	}
	return r.setAttribute("class","wedge"),
	r.setAttribute("fill",t.color),
	n.setAttribute("class","edge"),
	n.setAttribute("fill",t.color),
	a.setAttribute("class","white"),
	a.setAttribute("fill","#ffffff"),
	s=document.createElementNS(b,"g"),
	s.setAttribute("class","group"),
	s.setAttribute("wt:connect-id",t.name),
	s.setAttribute("wt:name",t.name),
	s.setAttribute("wt:url",t.name),
	s.setAttribute("wt:percentage-string",
	t.percentageString),
	s.setAttribute("wt:no-data",e.noData),
	s.appendChild(n),
	s.appendChild(a),
	s.appendChild(r),
	e.doughnut.appendChild(s),
	!0
},
tplElementChartStatsDays=function(t){
	var e,r=t.chartWidth,
	n=t.chartHeight,
	a=t.days;
	for(e=0;e<a.length;e++)a[e].height=a[e].seconds/t.timeValueMax*n;
		var s,i,u,l,c="http://www.w3.org/2000/svg",
	o=document.createElementNS(c,"svg:svg");
	o.setAttribute("xmlns:wt","http://www.example.com/webtime-tracker"),
	o.setAttribute("class","chart-stats days"),
	o.setAttribute("width",r),
	o.setAttribute("height",n),
	o.setAttribute("viewBox","0 0 "+r+" "+n),
	o.setAttribute("shape-rendering","geometricPrecision");
	var p=r/t.daysTotal;
	for(e=0;e<a.length;e++)s=Math.max(t.stepHeightMin,
		a[e].height),i=document.createElementNS(c,"rect"),
		i.setAttribute("class","rect active"),
	i.setAttribute("stroke-width",0),
	i.setAttribute("x",e*p),
	i.setAttribute("y",n-s),
	i.setAttribute("width",p),
	i.setAttribute("height",s),
	u=document.createElementNS(c,"rect"),
	u.setAttribute("class","rect inactive"),
	u.setAttribute("stroke-width",0),
	u.setAttribute("x",e*p),
	u.setAttribute("y",0),
	u.setAttribute("width",p),
	u.setAttribute("height",n-s),
	l=document.createElementNS(c,"g"),
	l.setAttribute("class","group"),
	l.appendChild(i),
	l.appendChild(u),
	l.setAttribute("wt:date",a[e].date),
	l.setAttribute("wt:time",a[e].seconds),
	o.appendChild(l);return o
},
tplElementChartStatsDaynames=function(t){
	var e,r=t.chartWidth,
	n=t.chartHeight-20,
	a=Math.max.apply(Math,_toConsumableArray(t.daynames)),
	s=t.daynames.reduce(function(t,e){
		return t+e
	}),
	i=[];
	for(e=0;e<t.daynames.length;e++)i[e]={seconds:t.daynames[e],
		height:t.daynames[e]/a*n};
	var u,l,c,o,p="http://www.w3.org/2000/svg",
	m=document.createElementNS(p,"svg:svg");
	m.setAttribute("xmlns:wt","http://www.example.com/webtime-tracker"),
	m.setAttribute("class","chart-stats daynames"),
	m.setAttribute("width",r),m.setAttribute("height",n),
	m.setAttribute("viewBox","0 0 "+r+" "+n),
	m.setAttribute("shape-rendering","geometricPrecision");
	var d=r/t.daynames.length;
	for(e=0;e<i.length;e++)u=Math.max(t.stepHeightMin,
		i[e].height),l=document.createElementNS(p,"rect"),
		l.setAttribute("class","rect active"),
	l.setAttribute("stroke-width",0),
	l.setAttribute("x",e*d),
	l.setAttribute("y",n-u),
	l.setAttribute("width",d),
	l.setAttribute("height",u),
	c=document.createElementNS(p,"rect"),
	c.setAttribute("class","rect inactive"),
	c.setAttribute("stroke-width",0),
	c.setAttribute("x",e*d),
	c.setAttribute("y",0),
	c.setAttribute("width",d),
	c.setAttribute("height",n-u),
	o=document.createElementNS(p,"g"),
	o.setAttribute("class","group"),
	o.appendChild(l),
	o.appendChild(c),
	o.setAttribute("wt:dayname",e),
	o.setAttribute("wt:time",i[e].seconds),
	o.setAttribute("wt:percentage-string",
	getPercentageString(i[e].seconds/s*100,!0)),
	m.appendChild(o);
	return m
},
helperGetTimeObj=function(t,e){
	e!==RESOLUTION_HOURS&&(e=RESOLUTION_DAYS);
	var r,n=!1,a=getTimeObj();
	return r=parseInt(t/86400),
	a.day.tens=parseInt(r/10),
	a.day.units=r%10,
	a.day.implicitlyActive=!!n,
	n=n||a.day.tens>0||a.day.units>0,
	e===RESOLUTION_DAYS?(r=parseInt(t%86400),
	r=parseInt(r/3600),
	a.hour.tens=parseInt(r/10),
	a.hour.units=r%10,
	a.hour.implicitlyActive=!!n,
	n=n||a.hour.tens>0||a.hour.units>0):(r=parseInt(t/3600),
	a.hour.tens=parseInt(r/10),
	a.hour.units=r%10,
	a.hour.implicitlyActive=!!n,
	n=n||a.hour.tens>0||a.hour.units>0),
	r=parseInt(t%86400),
	r=parseInt(r%3600),
	r=parseInt(r/60),
	a.minute.tens=parseInt(r/10),
	a.minute.units=r%10,
	a.minute.implicitlyActive=!!n,
	n=n||a.minute.tens>0||a.minute.units>0,
	r=parseInt(t%86400),
	r=parseInt(r%3600),
	r=parseInt(r%60),
	a.second.tens=parseInt(r/10),
	a.second.units=r%10,
	a.second.implicitlyActive=!!n,
	a
};
















