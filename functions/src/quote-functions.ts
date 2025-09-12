import * as functions from 'firebase-functions/v2';
import axios from 'axios';

// CSG API Token Management (you'll need to add your token)
const CSG_API_TOKEN = process.env.CSG_API_TOKEN || 'your-csg-api-token';

// Helper function to get current token
async function getCurrentToken(): Promise<string> {
  // This should be replaced with your actual token management logic
  return CSG_API_TOKEN;
}

// 1. MEDIGAP QUOTES FUNCTION
export const getMedigapQuotes = functions.https.onCall(
  async (request: functions.https.CallableRequest<{
    zip5: string;
    age: number;
    gender: "M" | "F";
    tobacco: number;
    plan: string;
  }>) => {
    if (!request || typeof request !== "object" || !request.data) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "Request must be made using Firebase Callable Functions and include a data property."
      );
    }

    functions.logger.info("getMedigapQuotes called", { data: request.data });

    try {
      const { zip5, age, gender, tobacco, plan } = request.data;

      // Validate required parameters
      if (!zip5 || !age || !gender || tobacco === undefined || !plan) {
        throw new functions.https.HttpsError(
          "invalid-argument",
          "ZIP code, age, gender, tobacco status, and plan are required"
        );
      }

      const token = await getCurrentToken();
      const apiUrl = "https://csgapi.appspot.com/v1/med_supp/quotes.json";

      const params = {
        zip5,
        age,
        gender,
        tobacco,
        plan,
        offset: 0
      };

      functions.logger.info("Calling CSG Medigap API", { apiUrl, params });

      const response = await axios.get(apiUrl, {
        params,
        headers: {
          "x-api-token": token,
        },
      });

      functions.logger.info("CSG Medigap API response", { response: response.data });
      return response.data;
    } catch (error) {
      functions.logger.error("Error in getMedigapQuotes", { error });
      throw new functions.https.HttpsError(
        "internal",
        "Error fetching medigap quotes",
        { message: error instanceof Error ? error.message : "Unknown error" }
      );
    }
  }
);

// 2. DENTAL QUOTES FUNCTION
export const getDentalQuotes = functions.https.onCall(
  async (request: functions.https.CallableRequest<{
    zip5: string;
    age: number;
    gender: "M" | "F";
    tobacco: number;
    covered_members?: string;
  }>) => {
    if (!request || typeof request !== "object" || !request.data) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "Request must be made using Firebase Callable Functions and include a data property."
      );
    }

    functions.logger.info("getDentalQuotes called", { data: request.data });

    try {
      const { zip5, age, gender, tobacco, covered_members = "I" } = request.data;

      if (!zip5 || !age || !gender || tobacco === undefined) {
        throw new functions.https.HttpsError(
          "invalid-argument",
          "ZIP code, age, gender, and tobacco status are required"
        );
      }

      const token = await getCurrentToken();
      const apiUrl = "https://csgapi.appspot.com/v1/dental/quotes.json";

      const params = {
        zip5,
        age,
        gender,
        tobacco,
        covered_members,
        offset: 0
      };

      functions.logger.info("Calling CSG Dental API", { apiUrl, params });

      const response = await axios.get(apiUrl, {
        params,
        headers: {
          "x-api-token": token,
        },
      });

      functions.logger.info("CSG Dental API response", { response: response.data });
      return response.data;
    } catch (error) {
      functions.logger.error("Error in getDentalQuotes", { error });
      throw new functions.https.HttpsError(
        "internal",
        "Error fetching dental quotes",
        { message: error instanceof Error ? error.message : "Unknown error" }
      );
    }
  }
);

// 3. HOSPITAL INDEMNITY QUOTES FUNCTION
export const getHospitalIndemnityQuotes = functions.https.onCall(
  async (request: functions.https.CallableRequest<{
    zip5: string;
    age: number;
    gender: "M" | "F";
    tobacco: number;
  }>) => {
    if (!request || typeof request !== "object" || !request.data) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "Request must be made using Firebase Callable Functions and include a data property."
      );
    }

    functions.logger.info("getHospitalIndemnityQuotes called", { data: request.data });

    try {
      const { zip5, age, gender, tobacco } = request.data;

      if (!zip5 || !age || !gender || tobacco === undefined) {
        throw new functions.https.HttpsError(
          "invalid-argument",
          "ZIP code, age, gender, and tobacco status are required"
        );
      }

      const token = await getCurrentToken();
      const apiUrl = "https://csgapi.appspot.com/v1/hospital_indemnity/quotes.json";

      const params = {
        zip5,
        age,
        gender,
        tobacco,
        offset: 0
      };

      functions.logger.info("Calling CSG Hospital Indemnity API", { apiUrl, params });

      const response = await axios.get(apiUrl, {
        params,
        headers: {
          "x-api-token": token,
        },
      });

      functions.logger.info("CSG Hospital Indemnity API response", { response: response.data });
      return response.data;
    } catch (error) {
      functions.logger.error("Error in getHospitalIndemnityQuotes", { error });
      throw new functions.https.HttpsError(
        "internal",
        "Error fetching hospital indemnity quotes",
        { message: error instanceof Error ? error.message : "Unknown error" }
      );
    }
  }
);

// 4. CANCER INSURANCE QUOTES FUNCTION
export const getCancerInsuranceQuote = functions.https.onCall(
  async (request: functions.https.CallableRequest<{
    state: "TX" | "GA";
    age: number;
    familyType: "Applicant Only" | "Applicant and Spouse" | "Applicant and Child(ren)" | "Applicant and Spouse and Child(ren)";
    tobaccoStatus: "Non-Tobacco" | "Tobacco";
    premiumMode: "Monthly Bank Draft" | "Monthly Credit Card" | "Monthly Direct Mail" | "Annual";
    carcinomaInSitu: "25%" | "100%";
    benefitAmount: number;
  }>) => {
    if (!request || typeof request !== "object" || !request.data) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "Request must be made using Firebase Callable Functions and include a data property."
      );
    }

    functions.logger.info("getCancerInsuranceQuote called", { data: request.data });

    try {
      const { state, age, familyType, tobaccoStatus, premiumMode, carcinomaInSitu, benefitAmount } = request.data;

      if (!state || !age || !familyType || !tobaccoStatus || !premiumMode || !carcinomaInSitu || !benefitAmount) {
        throw new functions.https.HttpsError(
          "invalid-argument",
          "All cancer insurance parameters are required"
        );
      }

      // Cancer insurance logic (Bankers Fidelity rate calculation)
      // This would contain your specific rate calculation logic
      const monthlyPremium = calculateCancerPremium(state, age, familyType, tobaccoStatus, benefitAmount);

      const quote = {
        monthly_premium: monthlyPremium,
        carrier: "Bankers Fidelity Life Insurance Company",
        plan_name: "Cancer Protection Plan",
        benefit_amount: benefitAmount,
        state,
        age,
        family_type: familyType,
        tobacco_status: tobaccoStatus,
        premium_mode: premiumMode,
        carcinoma_in_situ: carcinomaInSitu
      };

      functions.logger.info("Cancer insurance quote generated", { quote });
      return quote;
    } catch (error) {
      functions.logger.error("Error in getCancerInsuranceQuote", { error });
      throw new functions.https.HttpsError(
        "internal",
        "Error generating cancer insurance quote",
        { message: error instanceof Error ? error.message : "Unknown error" }
      );
    }
  }
);

// 5. FINAL EXPENSE LIFE QUOTES FUNCTION
export const getFinalExpenseLifeQuotes = functions.https.onCall(
  async (request: functions.https.CallableRequest<{
    zip5?: string;
    state?: string;
    age: number;
    gender: "M" | "F";
    tobacco: number;
    quote_type?: "by_rate" | "by_face_value";
    desired_rate?: number;
    desired_face_value?: number;
    benefit_name?: string;
    underwriting_type?: "Full" | "Simplified" | "Guaranteed";
    offset?: number;
  }>) => {
    if (!request || typeof request !== "object" || !request.data) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "Request must be made using Firebase Callable Functions and include a data property."
      );
    }

    functions.logger.info("getFinalExpenseLifeQuotes called", { data: request.data });

    try {
      const {
        zip5,
        state,
        age,
        gender,
        tobacco,
        quote_type = "by_face_value",
        desired_rate,
        desired_face_value,
        benefit_name,
        underwriting_type,
        offset = 0
      } = request.data;

      if (!zip5 && !state) {
        throw new functions.https.HttpsError(
          "invalid-argument",
          "Either zip5 or state is required"
        );
      }

      if (!age || !gender || tobacco === undefined) {
        throw new functions.https.HttpsError(
          "invalid-argument",
          "Age, gender, and tobacco status are required"
        );
      }

      if (quote_type === "by_rate" && !desired_rate) {
        throw new functions.https.HttpsError(
          "invalid-argument",
          "desired_rate is required when quote_type is 'by_rate'"
        );
      }

      if (quote_type === "by_face_value" && !desired_face_value) {
        throw new functions.https.HttpsError(
          "invalid-argument",
          "desired_face_value is required when quote_type is 'by_face_value'"
        );
      }

      const token = await getCurrentToken();
      const apiUrl = "https://csgapi.appspot.com/v1/final_expense_life/quotes.json";

      const baseParams = {
        age,
        gender,
        tobacco,
        offset,
        ...(zip5 ? { zip5 } : {}),
        ...(state ? { state } : {}),
        ...(benefit_name ? { benefit_name } : {}),
        ...(underwriting_type ? { underwriting_type } : {}),
      };

      const params = quote_type === "by_rate"
        ? { ...baseParams, desired_rate }
        : { ...baseParams, desired_face_value };

      functions.logger.info("Calling CSG Final Expense Life API", { apiUrl, params });

      const response = await axios.get(apiUrl, {
        params,
        headers: {
          "x-api-token": token,
        },
      });

      functions.logger.info("CSG Final Expense Life API response", { response: response.data });
      return response.data;
    } catch (error) {
      functions.logger.error("Error in getFinalExpenseLifeQuotes", { error });
      throw new functions.https.HttpsError(
        "internal",
        "Error fetching final expense life quotes",
        { message: error instanceof Error ? error.message : "Unknown error" }
      );
    }
  }
);

// 6. MEDICARE ADVANTAGE QUOTES FUNCTION
export const getMedicareAdvantageQuotes = functions.https.onCall(
  async (request: functions.https.CallableRequest<{
    zip5?: string;
    state?: string;
    county?: string;
    plan: string;
    sort?: string;
    order?: string;
    effective_date?: string;
    offset?: number;
  }>) => {
    if (!request || typeof request !== "object" || !request.data) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "Request must be made using Firebase Callable Functions and include a data property."
      );
    }

    functions.logger.info("getMedicareAdvantageQuotes called", { data: request.data });

    try {
      const {
        zip5,
        state,
        county,
        plan,
        sort = "price",
        order = "asc",
        effective_date,
        offset = 0
      } = request.data;

      if (!zip5 && !state) {
        throw new functions.https.HttpsError(
          "invalid-argument",
          "Either zip5 or state is required"
        );
      }

      if (!plan) {
        throw new functions.https.HttpsError(
          "invalid-argument",
          "Plan type is required"
        );
      }

      const token = await getCurrentToken();
      const apiUrl = "https://csgapi.appspot.com/v1/medicare_advantage/quotes.json";

      const params = {
        plan,
        sort,
        order,
        offset,
        ...(zip5 ? { zip5 } : {}),
        ...(state ? { state } : {}),
        ...(county ? { county } : {}),
        ...(effective_date ? { effective_date } : {}),
      };

      functions.logger.info("Calling CSG Medicare Advantage API", { apiUrl, params });

      const response = await axios.get(apiUrl, {
        params,
        headers: {
          "x-api-token": token,
        },
      });

      functions.logger.info("CSG Medicare Advantage API response", { response: response.data });
      return response.data;
    } catch (error) {
      functions.logger.error("Error in getMedicareAdvantageQuotes", { error });
      throw new functions.https.HttpsError(
        "internal",
        "Error fetching Medicare Advantage quotes",
        { message: error instanceof Error ? error.message : "Unknown error" }
      );
    }
  }
);

// Helper function for cancer insurance premium calculation
function calculateCancerPremium(
  state: string,
  age: number,
  familyType: string,
  tobaccoStatus: string,
  benefitAmount: number
): number {
  // This is a simplified calculation - you would implement the actual Bankers Fidelity rate logic
  let basePremium = benefitAmount * 0.001; // 0.1% of benefit as base
  
  // Age adjustments
  if (age >= 65) basePremium *= 1.5;
  else if (age >= 50) basePremium *= 1.2;
  
  // Tobacco adjustments
  if (tobaccoStatus === "Tobacco") basePremium *= 1.5;
  
  // Family type adjustments
  if (familyType.includes("Spouse")) basePremium *= 1.8;
  if (familyType.includes("Child")) basePremium *= 1.3;
  
  // State adjustments
  if (state === "TX") basePremium *= 1.1;
  
  return Math.round(basePremium * 100) / 100;
}
