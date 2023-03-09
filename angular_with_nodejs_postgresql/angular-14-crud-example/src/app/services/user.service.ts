import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/users';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private http: HttpClient) { }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  updatePassword(data: any): Observable<any> {
    return this.http.put(`${baseUrl}/update-password/`, data);
  }

  delete(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': data
    });
    const requestOptions = { headers: headers };
    return this.http.delete(`${baseUrl}/delete`, requestOptions);
  }
}

/*
    // Create a new User
    router.post("/", users.create);

    // Retrieve all User
    router.get("/", users.findAll);

    // Retrieve all published User
    //router.get("/published", users.findAllPublished);

    // Retrieve a single User with id
    router.get("/:id", users.findOne);

    // Update a User with id
    router.put("/:id", users.update);

    // Delete a User with id
    router.delete("/:id", users.delete);

    // Delete all user
    router.delete("/", users.deleteAll);

    // Update password
    router.put("/updatePassword", users.updatePassword);

    app.use('/api/users', router);
    */