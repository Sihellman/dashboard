import {JetView} from "webix-jet";

export default class AttendenceView extends JetView {
	config(){
		const _ = this.app.getService("locale")._;
		return {
			type:"clean", //gravity:2,
			minWidth:500,
			width:300,
			height:300,
			rows:[
				{ template:_("Individual attendence"), type:"header", css:"chart_header" },
				{
					view:"chart",
					border:true,
					localId:"attendence",
					type:"bar",
                    
					value:"#percent#",
                    color:"#color#",
					label: "#percent#",
					radius:0,
					barWidth:40,
					tooltip:{
						template:"#percent#"
					},
					yAxis:{
						template:"",
						start:0, end:100, step:10
					},
					xAxis:{
						title:"Monthly Absences",
                        
						template:"#month#",
						lines: false
					},
					
					
					borderWidth:2,
					
					
					padding:{
						top:10,
						left:10,
						right:10,
                        
						
					},
					
					
					
				},
			]
		};
	}
	init(){
		let chart = this.$$("attendence");
		this.on(this.app,"person:select",person => {
			chart.parse(webix.copy(person.attendence));
			// const name = person.fname + " " + person.lname;
			// this.newLegend(name);
			
		});
	}
	newLegend(name){
		let chart = this.$$("attendence");
		chart.define("legend", {
			values:[
				{ text:name, color:"#1CA1C1" }
			],
			align:"right", layout:"x", valign:"bottom", margin:4, padding:10,
			marker:{
				type:"round", width:7, height:8
			}
		});
		chart.refresh();
	}
}
