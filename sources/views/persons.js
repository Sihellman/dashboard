import {JetView} from "webix-jet";
import {persons} from "models/persons";

export default class PersonsView extends JetView {
	config(){
		const _ = this.app.getService("locale")._;
		return {
			rows:[
				{
					view:"toolbar", elements:[
						{ view:"label", label:_("Persons") },
						{},
						{
							view:"button", type:"icon", icon:"arrow-down",
							width:37, css:"toolbar_button",
							click:function(){
								let dir = "";
								if (this.config.icon.indexOf("down") !== -1){
									dir = "desc";
									this.config.icon = "arrow-up";
								}
								else {
									dir = "asc";
									this.config.icon = "arrow-down";
								}
								this.$scope.$$("list").sort("fname",dir);
								this.refresh();
							}
						}
					]
				},
				{
					view:"list",
					localId:"list",
					css:"persons_list",
					width:230,
					select:true,
					type:{
						template:(data,common) => {
							return common.userPic(data) +
								"<span class='username'>" + data.fname + " " + data.lname + "</span>" +
								common.money(data);
						},
						userPic:data => {
							if (data.photo)
								return "<image class='userphoto' src='data/photos/" + data.photo + ".jpg'>";
							else
								return "<span class='userpic'>" + data.fname.charAt(0) + "</span>";
						},
						money:data => "<span class='money'>$" + data.money + "</span>",
						height:70
					},
					on:{
						onAfterSelect:(id) => {
							const person = persons.getItem(id);
							this.app.callEvent("person:select",[person.value,person.progress,id,person.hours]);
						}
					}
				}
			]
		};
	}
	init(view){
		const list = this.$$("list");
		persons.waitData.then(() => {
			list.sync(persons);
			list.select(list.getFirstId());
		});

		this.on(this.app,"task:select", id => {
			list.select(id);
			list.showItem(id);
		});

		this.on(this.app,"theme:change",theme => {
			let toolbar = view.queryView({ view:"toolbar" });
			//let list = view.queryView({ view:"list" });
			if (theme === "dark")//{
				toolbar.define("css","webix_dark");
				//list.define("css","webix_dark");	// does not work yet
			//}
			else
				webix.html.removeCss(toolbar.getNode(),"webix_dark");
		});
	}
}