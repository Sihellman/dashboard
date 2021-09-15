/* eslint-disable no-mixed-spaces-and-tabs */
import {JetView} from "webix-jet";

export default class ProgressView extends JetView {
	config(){
		const _ = this.app.getService("locale")._;
		return {
			type:"clean", //gravity:2,
			minWidth:500,
			width: 1095,
			height:300,
			rows:[
				{ template:_("Individual employee's progress"), type:"header", css:"chart_header" },
				{
					view:"chart",
					border:true,
					localId:"progress",
					type:"area",
					value:"#tasks#",
					color:"#1CA1C1",
					borderWidth:2,
					alpha:0.1,
					line:{
						width:3
					},
					xAxis:{
						template:"#week#", lines:false, color:"#EDEFF0"
					},
					yAxis:{
						start:0, end:100, step:20, color:"#fff", lineColor:"#EDEFF0"
					},
					tooltip:{
						template:_("Week") + " #week#<br>#tasks# " + _("tasks completed")
					},
					padding:{
						top:10
					},
					series:[
						{
						  alpha:0.7,
						  value:"#tasks#",
						  color: "#1CA1C1",
						  tooltip:{
								template:_("Week") + " #week#<br>#tasks# " + _("tasks completed")
						  }
						},
						{
						  alpha:0.5,
						  value:"#bombs#",
						  color:"#F8643F",
						  tooltip:{
								template:_("Week") + " #week#<br>#bombs# " + _("tasks overdue")
						  }
						}
					  ],
				}
			]
		};
	}
	init(){
		let chart = this.$$("progress");
		this.on(this.app,"person:select",person => {
			chart.parse(webix.copy(person.progress));
			const name = person.fname + " " + person.lname;
			this.newLegend(name);
		});
	}
	newLegend(name){
		let chart = this.$$("progress");
		chart.define("legend", {
			values:[
				{ text:"tasks completed", color:"#1CA1C1" },
				{ text:"tasks overdue", color:"#F8643F" }
			],
			align:"right", layout:"x", valign:"bottom", margin:4, padding:10,
			marker:{
				type:"round", width:7, height:8
			}
		});
		chart.refresh();
	}
}
