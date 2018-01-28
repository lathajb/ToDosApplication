import { Component,OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {Task} from './app.task';
import { TodoDataService} from './todo-data.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers :[Task,TodoDataService]
})
export class AppComponent implements OnInit{
	columnDefs;
	taskslist = [];
	taskStatus = ["Completed",
				"Created",
				"InProgress"];
	currentStatus = "";
	
	public loginForm = this.builder.group({
		name: ["", Validators.required],
		description: ["", Validators.required],
		status:["", Validators.required]
	});

	
	constructor(private task : Task,
				private todoDataService : TodoDataService,private builder:FormBuilder) {
        			
		this.columnDefs = [
            {headerName: "Title Name", field: "task.name", width: 300},
            {headerName: "Description", field: "task.description", width: 300}
        ];
	}
	

	saveTask(task : Task,currentStatus : String):void{
		if (this.loginForm.valid) {
			
			if(currentStatus == 'Completed'){
				
				if(typeof task.status == "undefined") {
					task.status = 3;
					this.todoDataService.saveTask(task);
				}else{
					task.status = 3;
					this.todoDataService.updateTask(task);
				}
				
			}else if(currentStatus == 'Created'){
				task.status = 1;
				this.todoDataService.saveTask(task);
			}else{
				
				if(typeof task.status == "undefined") {
					task.status = 2;
					this.todoDataService.saveTask(task);
				}else{
					task.status = 2;
					this.todoDataService.updateTask(task);
				}
				
			}
			
			
			console.log("Form Submitted!");
			this.loginForm.reset();
			window.location.reload();
			//location.reload();
		}
		
	}
	
	editTask(task :Task):void{
		this.task.id = task.id;
		this.task.name = task.name;
		//this.task.description = task.description;
		this.task.status = task.status;
		console.log("edit");
		
	}
	
	
	deleteTask(task : Task):void{
		this.todoDataService.deleteTask(task);
		window.location.reload();		
	}
	
	updateTask(task : Task):void{
		this.todoDataService.updateTask(task);
	}
		
	
	ngOnInit(){
		this.todoDataService.getDataObservable()
		.subscribe(Response => {
		this.taskslist = Response;
		console.log("I CANT SEE DATA HERE: ", Response,this.taskslist);});
		
	}
	
	
  title = 'app';
}
