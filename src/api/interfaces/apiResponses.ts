interface FacilityRO {
  id: number;
  name: string;
}

export interface FacilitiesAPIResponse {
  data: {
    results: FacilityRO[];
  };
}
