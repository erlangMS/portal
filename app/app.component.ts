import { Component, View} from '@angular/core';
import {NgFor, NgSwitch, NgSwitchWhen, NgSwitchDefault} from '@angular/common';

@Component({
    selector: 'my-app'
	directives:[NgFor, NgSwitch, NgSwitchWhen, NgSwitchDefault]
	template: `
			<navigator></navigator>
	    `
})
export class AppComponent { 
	

}
