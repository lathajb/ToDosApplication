import { Injectable } from '@angular/core';
import { Headers,Http,Response,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Task } from './app.task';
import 'rxjs/add/operator/map';

@Injectable()
export class TodoDataService {
private headers = new Headers([{'Content-Type': 'application/json'}]);
private saveUrl = 'http://localhost:8080/tasks/getTasks'; 
private addUrl = 'http://localhost:8080/tasks/addTask';
private deleteUrl = 'http://localhost:8080/tasks/deleteTask';
private updateUrl = 'http://localhost:8080/tasks/updateTask';
	
constructor(private http : Http) {
}

public getDataObservable(): Observable<any> {
        return this.http.get(this.saveUrl)
            .map((data:Response )=> {
                data.json();
                console.log("I CAN SEE DATA HERE: ", data.json());
				return data.json();
        });
}

public saveTask(task:Task): Promise<Task> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.addUrl, task, options)
	.toPromise().then((res: Response) => res.json());
}


public updateTask(task:Task): Promise<Task> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.updateUrl,task, options)
	.toPromise().then((res: Response) => res.json());
}


public deleteTask(task:Task): Promise<Task> {
	
	let headers = new Headers({ 'Content-Type': 'application/json' , 			     'Access-Control-Allow-Origin' : '*' });
	let options = new RequestOptions({ headers: headers });
	return this.http
        .delete(this.deleteUrl + "/" + task.id, options)
        .toPromise().then((res: Response) => res.json());
}

public handleError (error: Response) {
        console.log(error);
        return Observable.throw('Internal server error');
}

public extractData(res: Response) {
  let body = res.json();
  return body || {};
}

}
