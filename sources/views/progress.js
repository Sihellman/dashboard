import {JetView} from "webix-jet";

export default class ProgressView extends JetView {
	config(){
		const _ = this.app.getService("locale")._;
		return {
			type:"clean", gravity:2,
			rows:[
				{ template:_("Individual employee's progress"), type:"header" },
				{
					view:"chart",
					localId:"progress",
					type:"splineArea",
					value:"#tasks#",
					color:"#1CA1C1",
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
						template:"Week #week#<br>#tasks# tasks completed"
					},
					padding:{
						top:10
					}
				}
			]
		};
	}
	init(){
		let chart = this.$$("progress");
		this.on(this.app,"person:select",(name,progress) => {
			chart.parse(progress);
			this.newLegend(name);
		});
	}
	newLegend(name){
		let chart = this.$$("progress");
		chart.define("legend", {
			values:[
				{text:name, color:"#1CA1C1"}
			],
			align:"right", layout:"x", valign:"bottom", margin:1, padding:10,
			marker:{
				type:"round", width:8, height:9
			}
		});
		chart.refresh();
	}
}