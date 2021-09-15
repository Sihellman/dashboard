/* eslint-disable no-mixed-spaces-and-tabs */
import {JetView} from "webix-jet";
import PersonsView from "views/persons";
import StatisticsView from "views/statistics";
import TimeView from "views/time";
import ProgressView from "views/progress";
import TasksView from "views/tasks";
import TrainingView from "./training";
import AttendenceView from "./attendence";

export default class DashboardView extends JetView{
	config(){
		return {
			type:"space", paddingX:0,
			cols:[
				PersonsView,
				{
					view:"scrollview",
					borderless:true,
					body:{
						type:"wide",
						rows:[
							StatisticsView,
							{
								id:"time-and-progress-layout",
								type:"wide",
								rows:[
									{
										type:"wide",
										responsive:"time-and-progress-layout",
										cols:[
											 ProgressView
										]
									}
								]
							},
							{
								
								cols:[
									TimeView,{
										height:300,
										width: 15,
									},
									TrainingView,{
										height:300,
										width: 15,
									},
									AttendenceView,{
										height:300,
										width: 15,
									}
								]
							},

							{
								
								cols:[
									TasksView,{
										height:300,
										width: 15,
									}
								]
							}
						]
					}
				},
				{ width:1 }
			]
		};
	}
}
