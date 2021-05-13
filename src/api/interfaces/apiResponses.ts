export interface FacilityRO {
  id: string;
  name: string;
}

export interface FacilitiesAPIResponse {
  data: {
    results: FacilityRO[];
  };
}
