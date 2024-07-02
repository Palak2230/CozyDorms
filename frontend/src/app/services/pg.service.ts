import { Injectable } from '@angular/core';
import { Pg } from '../shared/models/pg';
import { sample_pgs } from 'src/data';
import { Locality } from '../shared/models/localities';
import { sample_localities } from 'src/localitiesdata';
@Injectable({
  providedIn: 'root'
})
export class PgService {

  constructor() { }
  getAll(): Pg[] {
    return sample_pgs;
  }
  getLocalities(): Locality[] {
    return sample_localities;
  }
  getAllBySearch(searchTerm: string): Pg[] {
    return this.getAll().filter(pg => pg.city.toLowerCase().includes(searchTerm.toLowerCase()));
  }
  getlocalitiesBySearch(searchTerm: string) {
    return this.getLocalities().filter(locality => locality.city.toLowerCase() == (searchTerm.toLowerCase()));
  }

  filter(pgs: Pg[], selectedTenantsValues: any, selectedRoomsValues: any, selectedRatingsValues: any, selectedLocalities: any): Pg[] {

    let pgsample = pgs;
    if (selectedLocalities.length != 0) {
      pgsample = pgsample.filter(function (item) {
        for (let locality of selectedLocalities) {
          if (item.locality === locality) {
            return true;
          }
        }
        return false;
      });
    }
    if (selectedTenantsValues.length != 0) {
      pgsample = pgsample.filter(function (item) {

        for (let tenant of selectedTenantsValues) {
          if (item.tags?.tenantType.includes(tenant.type)) {
            return true;
          }
        }
        return false;
      });
    }
    if (selectedRoomsValues.length != 0) {
      pgsample = pgsample.filter(function (item) {
        for (let room of selectedRoomsValues) {
          if (item.tags?.roomsOccupancy.includes(room.type)) {
            return true;
          }
        }
        return false;
      });
    }
    if (selectedRatingsValues.length != 0) {
      pgsample = pgsample.filter(function (item) {
        for (let rating of selectedRatingsValues) {
          if (item.stars >= rating.type) {
            return true;
          }
        }
        return false;
      });
    }


    return pgsample;
    //   pgsample = pgsample.filter(pg => {
    //     let matchesTenant = selectedTenantsValues.some((index, selected) => selected && pg.tenant_type === this.tenant_type[index].type);
    //     let matchesRoom = this.selectedRooms.some((selected, index) => selected && pg.room_type === this.room_type[index].type);
    //     let matchesRating = this.selectedRatings.some((selected, index) => selected && pg.rating === this.rating_type[index].type);
    //     return matchesTenant && matchesRoom && matchesRating;
    //   });
    // }
    //   // console.log(pgsample);
    //   return pgsample;

  }
}
