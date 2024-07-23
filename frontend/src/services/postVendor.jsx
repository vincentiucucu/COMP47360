import api from "../api";

export const postVendor = async (newVendor) => {
    const { licence_id, vendor_name, licence_expiry_date, vendor_email, vendor_phone_number } = newVendor;
  
    const cleanedVendorUnits = {
      licence_id,
      vendor_name,
      licence_expiry_date,
      vendor_email,
      vendor_phone_number,
    };
  
    try {
      const response = await api.post('/api/vendor/', cleanedVendorUnits);
      return response.data;
    } catch (error) {
      console.error('Error adding vendor:', error);
      throw error;
    }
}

export default postVendor