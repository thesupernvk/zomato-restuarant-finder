import { ZomatoService } from './../zomato.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/**
 * @author @thesupernvk
 */

@Component({
  selector: 'zomato',
  templateUrl: './zomato.component.html',
  styleUrls: ['./zomato.component.css']
})
export class ZomatoComponent extends ZomatoService implements OnInit {

  city: string;
  locations: any;
  locArray: any = [];
  bestRatedRestaurants: any = [];
  locationDetails: any = {};
  isLocationEmpty: boolean = false;
  flipped: boolean = false;
  hideCityTitle: boolean = false;
  topCuisines: any = [];

  constructor(http: HttpClient) {
    super(http);
  }

  ngOnInit() {
  }

  /**
   * @description searches city name or place entered by user
   * @param event
   */
  search(event) {
    //enter key
    if (event.keyCode == 13) {
      this.getLocation(this.city)
        .subscribe(response => {
          this.locations = response;
          if (this.locations) {
            this.locArray = [];
            this.bestRatedRestaurants = [];
            this.isLocationEmpty = false;
            this.locArray = this.locations.location_suggestions;
            if (this.locArray.length === 0) {
              this.isLocationEmpty = true;
            }
            this.hideCityTitle = true;
            this.getLocDetails(this.locArray[0].entity_id, this.locArray[0].entity_type);
          }
        });
    }
  }

  /**
   * @description service called to get further details of the place or city
   * @param entity_id 
   * @param entity_type 
   */
  getLocDetails(entity_id, entity_type) {
    this.getLocationDetails(entity_id, entity_type)
      .subscribe(res => {
        this.bestRatedRestaurants = [];
        this.topCuisines = [];
        this.hideCityTitle = false;
        this.locationDetails = res;
        if (this.locationDetails) {
          for (let i = 0; i < 3; i++) {
            this.bestRatedRestaurants.push(this.locationDetails.best_rated_restaurant[i].restaurant);
            this.bestRatedRestaurants[i].flipped = false;
          };

          for (let j = 0; j < this.locationDetails.top_cuisines.length; j++) {
            this.topCuisines.push(this.locationDetails.top_cuisines[j]);
          }
          this.hideCityTitle = true;
        }
      });
  }

  /**
   * @desc flips the details card
   * @param best 
   */
  flip(best) {
    best.flipped = !best.flipped;
  }

}
