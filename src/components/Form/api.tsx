export const fetchProvinces = async () => {
    try {
      const response = await fetch("https://vapi.vnappmob.com/api/province");
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error("Error fetching provinces:", error);
      return [];
    }
  };
  
  export const fetchDistricts = async (provinceId: string) => {
    try {
      const response = await fetch(`https://vapi.vnappmob.com/api/province/district/${provinceId}`);
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error("Error fetching districts:", error);
      return [];
    }
  };
  
  export const fetchWards = async (districtId: string) => {
    try {
      const response = await fetch(`https://vapi.vnappmob.com/api/province/ward/${districtId}`);
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error("Error fetching wards:", error);
      return [];
    }
  };