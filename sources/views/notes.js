import {JetView} from "webix-jet";
export default class NotesPopup extends JetView {
	config(){
		const _ = this.app.getService("locale")._;
		

		return {
			view:"window",
			position:"center",
			modal:true,
			head:_("Today's work"),
			body:{
				view:"form",
				localId:"form",
				elementsConfig:{ labelPosition:"top" },
				rows:[
					{ view:"richtext", name:"task", width:500, height: 300, value:"" },
					
					{
						cols:[
							{
								view:"button", value:_("Cancel"),
								click:() => this.getBack()
							},
							{
								view:"button", value:_("Add"), type:"form",
								click:() => this.saveTask()
							}
						]
					}
				],
				rules:{
					user:webix.rules.isNotEmpty,
					task:webix.rules.isNotEmpty
				}
			}
		};
	}
	showWindow(){
		this.getRoot().show();
	}
	getBack(){
		this.getRoot().hide();
		this.$$("form").clear();
		this.$$("form").clearValidation();
	}
	saveTask(){
		const task = this.$$("form").getValues();
		if (this.$$("form").validate()){
			this.app.callEvent("add:task",[task]);
			this.getBack();
		}
	}
}
