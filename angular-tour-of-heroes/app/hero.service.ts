import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';


@Injectable()
export class HeroService {
    private heroesUrl = 'api/heroes';
    private heroUrl = 'api/heroes/';
    constructor(private http: Http) { }
    private headers = new Headers({ 'Content-Type': 'application/json' });
    getHeroes(): Promise<Hero[]> {
        return this.http.get(this.heroesUrl)
            .toPromise()
            .then(response => response.json().data as Hero[])
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('an error occurred', error);
        return Promise.reject(error.message || error);
    }

    getHero(id: number): Promise<Hero> {
        return this.http.get(this.heroUrl + id)
            .toPromise()
            .then(response => response.json().data as Hero)
            .catch(this.handleError);
    }
    update(hero: Hero): Promise<Hero> {
        return this.http.put(this.heroUrl + hero.id, JSON.stringify(hero), { headers: this.headers })
            .toPromise()
            .then(() => hero)
            .catch(this.handleError);
    }
    add(heroName: string): Promise<Hero> {
        return this.http.post(this.heroesUrl, JSON.stringify({ name: heroName }), { headers: this.headers })
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }
    delete(heroId: number): Promise<Hero> {
        return this.http.delete(this.heroUrl + heroId, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }
}